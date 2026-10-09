import Quotation from "../models/quotationModel.js";

import uploadToQuotationS3 from "../utils/s3/quotation/uploadToQuotationS3.js";

import deleteFromQuotationS3 from "../utils/s3/quotation/deleteFromQuotationS3.js";
import getCloudFrontUrl from "../utils/aws/cloudFrontUrl.js";

// ==================================================
// Parse Quotation Data
// ==================================================

const parseQuotationData = (quotationData) => {
    if (!quotationData) {
        throw new Error("Quotation data is required");
    }

    if (typeof quotationData === "object") {
        return quotationData;
    }

    return JSON.parse(quotationData);
};

// ==================================================
// Generate Unique File Name
// ==================================================

const generateUniqueFileName = (
    originalName = "image"
) => {
    const extension = originalName.includes(".")
        ? originalName.substring(
            originalName.lastIndexOf(".")
        )
        : "";

    const nameWithoutExtension = originalName
        .replace(extension, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return `quotation-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}-${nameWithoutExtension || "image"
        }${extension}`;
};

// ==================================================
// Calculate Quotation Totals
// ==================================================

const calculateQuotationTotals = (
    pricingTables = [],
    tax = {}
) => {
    let totalEquipmentQty = 0;

    let quotationTotalHp = 0;

    let grandTotal = 0;

    const calculatedTables = pricingTables.map(
        (table) => {
            let totalQty = 0;

            let tableTotalHp = 0;

            let totalCost = 0;

            const machinery = (
                table.machinery || []
            ).map((item) => {
                const qty =
                    Number(item.qty) || 0;

                const unitPrice =
                    Number(item.unitPrice) || 0;

                const hp =
                    Number(item.power?.hp) || 0;

                const totalPrice =
                    qty * unitPrice;

                const itemHp =
                    hp * qty;

                totalQty += qty;

                tableTotalHp += itemHp;

                totalCost += totalPrice;

                return {
                    ...item,

                    qty,

                    unitPrice,

                    totalPrice,

                    power: {
                        display:
                            item.power?.display || "",

                        hp,
                    },
                };
            });

            totalEquipmentQty += totalQty;

            quotationTotalHp += tableTotalHp;

            grandTotal += totalCost;

            return {
                ...table,

                machinery,

                totalQty,

                totalHp: tableTotalHp,

                totalCost,
            };
        }
    );

    // ==================================================
    // Tax Calculation
    // ==================================================

    const taxPercentage =
        Number(tax?.percentage) || 0;

    const isExtra =
        tax?.isExtra !== false;

    let taxAmount = 0;

    if (isExtra && taxPercentage > 0) {
        taxAmount =
            (grandTotal * taxPercentage) / 100;
    }

    const finalTotal =
        grandTotal + taxAmount;

    return {
        pricingTables: calculatedTables,

        totalEquipmentQty,

        totalHp: quotationTotalHp,

        grandTotal,

        taxAmount,

        finalTotal,
    };
};

// ==================================================
// Upload Quotation Images
// ==================================================

const uploadQuotationImages = async (
    files = {}
) => {
    const uploadedImages = [];

    const uploadedReferenceImages = [];

    try {
        // ----------------------------------------------
        // Normal Images
        // ----------------------------------------------

        const images =
            files.images || [];

        for (const file of images) {
            const fileName =
                generateUniqueFileName(
                    file.originalname
                );

            const key =
                await uploadToQuotationS3(
                    file.buffer,
                    fileName,
                    file.mimetype
                );

            uploadedImages.push(key);
        }

        // ----------------------------------------------
        // Reference Images
        // ----------------------------------------------

        const referenceImages =
            files.referenceImages || [];

        for (const file of referenceImages) {
            const fileName =
                generateUniqueFileName(
                    file.originalname
                );

            const key =
                await uploadToQuotationS3(
                    file.buffer,
                    fileName,
                    file.mimetype
                );

            uploadedReferenceImages.push(key);
        }

        return {
            images: uploadedImages,

            referenceImages:
                uploadedReferenceImages,
        };
    } catch (error) {
        // ----------------------------------------------
        // Rollback Uploaded Files
        // ----------------------------------------------

        const uploadedKeys = [
            ...uploadedImages,
            ...uploadedReferenceImages,
        ];

        for (const key of uploadedKeys) {
            try {
                await deleteFromQuotationS3(key);
            } catch (deleteError) {
                console.error(
                    "Failed to rollback quotation image:",
                    deleteError
                );
            }
        }

        throw error;
    }
};

// ==================================================
// CREATE QUOTATION
// ==================================================

export const createQuotation = async (
    req,
    res
) => {
    let uploadedImages = [];

    try {
        // ----------------------------------------------
        // Parse quotationData
        // ----------------------------------------------

        const quotationData =
            parseQuotationData(
                req.body.quotationData
            );

        // ----------------------------------------------
        // Calculate Totals
        // ----------------------------------------------

        const totals =
            calculateQuotationTotals(
                quotationData.pricingTables || [],
                quotationData.tax || {}
            );

        // ----------------------------------------------
        // Upload Images
        // ----------------------------------------------

        const uploadedFiles =
            await uploadQuotationImages(
                req.files || {}
            );

        uploadedImages = [
            ...uploadedFiles.images,
            ...uploadedFiles.referenceImages,
        ];

        // ----------------------------------------------
        // Prepare Tax
        // ----------------------------------------------

        const tax = {
            name:
                quotationData.tax?.name || "",

            percentage:
                Number(
                    quotationData.tax?.percentage
                ) || 0,

            isExtra:
                quotationData.tax?.isExtra !== false,
        };

        // ----------------------------------------------
        // Final Data
        // ----------------------------------------------

        const finalQuotationData = {
            ...quotationData,

            ...totals,

            tax,

            images:
                uploadedFiles.images,

            referenceImages:
                uploadedFiles.referenceImages,
        };

        // ----------------------------------------------
        // Create
        // ----------------------------------------------

        const quotation =
            await Quotation.create(
                finalQuotationData
            );

        res.status(201).json({
            success: true,

            message:
                "Quotation created successfully",

            quotation,
        });
    } catch (error) {
        console.error(
            "Create quotation error:",
            error
        );

        // ----------------------------------------------
        // Rollback
        // ----------------------------------------------

        for (const key of uploadedImages) {
            try {
                await deleteFromQuotationS3(key);
            } catch (deleteError) {
                console.error(
                    "Failed to delete uploaded quotation image:",
                    deleteError
                );
            }
        }

        res.status(500).json({
            success: false,

            message:
                "Failed to create quotation",

            error: error.message,
        });
    }
};

// ==================================================
// GET ALL QUOTATIONS
// ==================================================

export const getQuotations = async (
    req,
    res
) => {
    try {
        const quotations =
            await Quotation.find()
                .sort({
                    createdAt: -1,
                })
                .lean();

        res.status(200).json({
            success: true,

            quotations,
        });
    } catch (error) {
        console.error(
            "Get quotations error:",
            error
        );

        res.status(500).json({
            success: false,

            message:
                "Failed to fetch quotations",

            error: error.message,
        });
    }
};

// ==================================================
// GET QUOTATION BY ID
// ==================================================

export const getQuotationById = async (
    req,
    res
) => {
    try {
        const quotation =
            await Quotation.findById(
                req.params.id
            ).lean();

        if (!quotation) {
            return res.status(404).json({
                success: false,
                message:
                    "Quotation not found",
            });
        }

        const imageKeys =
            Array.isArray(quotation.images)
                ? quotation.images
                : [];

        const referenceImageKeys =
            Array.isArray(
                quotation.referenceImages
            )
                ? quotation.referenceImages
                : [];

        const quotationWithUrls = {
            ...quotation,

            // CloudFront URLs for displaying images
            images: imageKeys.map((key) =>
                getCloudFrontUrl(key)
            ),

            referenceImages:
                referenceImageKeys.map((key) =>
                    getCloudFrontUrl(key)
                ),

            // Original S3 keys for editing
            imageKeys,

            referenceImageKeys,
        };

        res.status(200).json({
            success: true,
            quotation: quotationWithUrls,
        });
    } catch (error) {
        console.error(
            "Get quotation error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch quotation",
            error: error.message,
        });
    }
};

// ==================================================
// UPDATE QUOTATION
// ==================================================

export const updateQuotation = async (
    req,
    res
) => {
    let newlyUploadedImages = [];

    try {
        // ----------------------------------------------
        // Find Existing Quotation
        // ----------------------------------------------

        const existingQuotation =
            await Quotation.findById(
                req.params.id
            );

        if (!existingQuotation) {
            return res.status(404).json({
                success: false,

                message:
                    "Quotation not found",
            });
        }

        // ----------------------------------------------
        // Parse quotationData
        // ----------------------------------------------

        const quotationData =
            parseQuotationData(
                req.body.quotationData
            );

        // ----------------------------------------------
        // Calculate Totals
        // ----------------------------------------------

        const totals =
            calculateQuotationTotals(
                quotationData.pricingTables || [],
                quotationData.tax || {}
            );

        // ----------------------------------------------
        // Upload New Images
        // ----------------------------------------------

        const uploadedFiles =
            await uploadQuotationImages(
                req.files || {}
            );

        newlyUploadedImages = [
            ...uploadedFiles.images,

            ...uploadedFiles.referenceImages,
        ];

        // ----------------------------------------------
        // Existing Images
        // ----------------------------------------------

        const existingImages =
            Array.isArray(
                quotationData.existingImages
            )
                ? quotationData.existingImages
                : existingQuotation.images || [];

        const existingReferenceImages =
            Array.isArray(
                quotationData.existingReferenceImages
            )
                ? quotationData.existingReferenceImages
                : existingQuotation.referenceImages || [];

        // ----------------------------------------------
        // Final Images
        // ----------------------------------------------

        const finalImages = [
            ...existingImages,

            ...uploadedFiles.images,
        ];

        const finalReferenceImages = [
            ...existingReferenceImages,

            ...uploadedFiles.referenceImages,
        ];

        // ----------------------------------------------
        // Tax
        // ----------------------------------------------

        const tax = {
            name:
                quotationData.tax?.name || "",

            percentage:
                Number(
                    quotationData.tax?.percentage
                ) || 0,

            isExtra:
                quotationData.tax?.isExtra !== false,
        };

        // ----------------------------------------------
        // Update Data
        // ----------------------------------------------

        const updateData = {
            ...quotationData,

            ...totals,

            tax,

            images: finalImages,

            referenceImages:
                finalReferenceImages,
        };

        // ----------------------------------------------
        // Remove Frontend-only Fields
        // ----------------------------------------------

        delete updateData.existingImages;

        delete updateData.existingReferenceImages;

        // ----------------------------------------------
        // Update MongoDB
        // ----------------------------------------------

        const quotation =
            await Quotation.findByIdAndUpdate(
                req.params.id,

                updateData,

                {
                    returnDocument: "after",
                    runValidators: true,
                }
            );

        // ----------------------------------------------
        // Find Removed Images
        // ----------------------------------------------

        const oldImages =
            existingQuotation.images || [];

        const oldReferenceImages =
            existingQuotation.referenceImages || [];

        const imagesToDelete = [
            ...oldImages.filter(
                (key) =>
                    !finalImages.includes(key)
            ),

            ...oldReferenceImages.filter(
                (key) =>
                    !finalReferenceImages.includes(
                        key
                    )
            ),
        ];

        // ----------------------------------------------
        // Delete Removed S3 Images
        // ----------------------------------------------

        for (const key of imagesToDelete) {
            try {
                await deleteFromQuotationS3(key);
            } catch (deleteError) {
                console.error(
                    "Failed to delete old quotation image:",
                    deleteError
                );
            }
        }

        res.status(200).json({
            success: true,

            message:
                "Quotation updated successfully",

            quotation,
        });
    } catch (error) {
        console.error(
            "Update quotation error:",
            error
        );

        // ----------------------------------------------
        // Rollback New Images
        // ----------------------------------------------

        for (const key of newlyUploadedImages) {
            try {
                await deleteFromQuotationS3(key);
            } catch (deleteError) {
                console.error(
                    "Failed to rollback quotation image:",
                    deleteError
                );
            }
        }

        res.status(500).json({
            success: false,

            message:
                "Failed to update quotation",

            error: error.message,
        });
    }
};

// ==================================================
// UPDATE QUOTATION STATUS
// ==================================================

export const updateQuotationStatus = async (
    req,
    res
) => {
    try {
        const quotation =
            await Quotation.findById(
                req.params.id
            );

        if (!quotation) {
            return res.status(404).json({
                success: false,

                message:
                    "Quotation not found",
            });
        }

        // ----------------------------------------------
        // Validate isActive
        // ----------------------------------------------

        if (
            typeof req.body.isActive !==
            "boolean"
        ) {
            return res.status(400).json({
                success: false,

                message:
                    "isActive must be a boolean value",
            });
        }

        // ----------------------------------------------
        // Update Status
        // ----------------------------------------------

        quotation.isActive =
            req.body.isActive;

        await quotation.save();

        res.status(200).json({
            success: true,

            message:
                quotation.isActive
                    ? "Quotation activated successfully"
                    : "Quotation deactivated successfully",

            quotation,
        });
    } catch (error) {
        console.error(
            "Update quotation status error:",
            error
        );

        res.status(500).json({
            success: false,

            message:
                "Failed to update quotation status",

            error: error.message,
        });
    }
};

// ==================================================
// DELETE QUOTATION
// ==================================================

export const deleteQuotation = async (
    req,
    res
) => {
    try {
        // ----------------------------------------------
        // Find Quotation
        // ----------------------------------------------

        const quotation =
            await Quotation.findById(
                req.params.id
            );

        if (!quotation) {
            return res.status(404).json({
                success: false,

                message:
                    "Quotation not found",
            });
        }

        // ----------------------------------------------
        // Delete Images From S3
        // ----------------------------------------------

        const quotationImages = [
            ...(quotation.images || []),

            ...(quotation.referenceImages || []),
        ];

        for (const key of quotationImages) {
            try {
                await deleteFromQuotationS3(key);
            } catch (deleteError) {
                console.error(
                    "Failed to delete quotation image:",
                    deleteError
                );
            }
        }

        // ----------------------------------------------
        // Delete MongoDB Document
        // ----------------------------------------------

        await Quotation.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,

            message:
                "Quotation deleted successfully",
        });
    } catch (error) {
        console.error(
            "Delete quotation error:",
            error
        );

        res.status(500).json({
            success: false,

            message:
                "Failed to delete quotation",

            error: error.message,
        });
    }
};



/**
 * PUBLIC: Get active quotations for the customer page
 */
export const getPublicQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find({ isActive: true })
      .select("_id quotationName subject quotationDate")
      .sort({ quotationName: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      quotations,
    });
  } catch (error) {
    console.error("Get public quotations error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch available quotations.",
    });
  }
};
