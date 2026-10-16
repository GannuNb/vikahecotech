
import mongoose from "mongoose";

import QuotationModel from "../models/quotationModel.js";
import QuotationCategory from "../models/quotationCategoryModel.js";
import uploadToQuotationS3 from "../utils/quotation/uploadToQuotationS3.js";
import getCloudFrontUrl from "../utils/aws/cloudFrontUrl.js";

// --------------------------------------------------
// Helper: Validate category
// --------------------------------------------------
const validateCategory = async (categoryId) => {
  if (!mongoose.isValidObjectId(categoryId)) {
    return false;
  }

  const category = await QuotationCategory.findById(categoryId);
  return Boolean(category);
};

// --------------------------------------------------
// Helper: Parse JSON fields sent through FormData
// --------------------------------------------------
const parseJsonField = (value, defaultValue = []) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    throw new Error("Invalid JSON data received from the form.");
  }
};

// --------------------------------------------------
// Helper: Convert FormData boolean values
// --------------------------------------------------
const parseBoolean = (value, defaultValue = true) => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  if (typeof value === "boolean") {
    return value;
  }

  return value === "true";
};

// --------------------------------------------------
// Helper: Validate quantity
// --------------------------------------------------
const parseQuantity = (value, defaultValue = 1) => {
  const quantity =
    value === undefined || value === null || value === ""
      ? defaultValue
      : Number(value);

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantity must be a positive integer.");
  }

  return quantity;
};

// --------------------------------------------------
// Helper: Normalize an image URL/key to an S3 key
// --------------------------------------------------
const normalizeImageKey = (image) => {
  if (!image) {
    return "";
  }

  const value = image.key || image.url || "";

  if (!value) {
    return "";
  }

  const cloudFrontBase = process.env.CLOUDFRONT_URL?.replace(/\/+$/, "");

  if (cloudFrontBase && value.startsWith(`${cloudFrontBase}/`)) {
    return value.slice(cloudFrontBase.length + 1);
  }

  return value;
};

// --------------------------------------------------
// Helper: Prepare image data for MongoDB
// --------------------------------------------------
const normalizeImages = (images = []) => {
  if (!Array.isArray(images)) {
    throw new Error("Images must be an array.");
  }

  return images.map((image) => ({
    url: normalizeImageKey(image),
    description: image.description || "",
  }));
};

// --------------------------------------------------
// Helper: Upload new images to S3
// --------------------------------------------------
const uploadImages = async (files = [], descriptions = []) => {
  if (!Array.isArray(files) || files.length === 0) {
    return [];
  }

  return Promise.all(
    files.map(async (file, index) => {
      const key = await uploadToQuotationS3(file);

      return {
        url: key,
        description: descriptions[index] || "",
      };
    })
  );
};

// --------------------------------------------------
// Helper: Format response with CloudFront image URLs
// Keeps the S3 key available for future edits.
// --------------------------------------------------
const formatQuotationModel = (quotationModel) => {
  const data =
    typeof quotationModel.toObject === "function"
      ? quotationModel.toObject()
      : { ...quotationModel };

  data.images = (data.images || []).map((image) => ({
    ...image,
    key: image.url,
    url: getCloudFrontUrl(image.url),
  }));

  data.referencePhotos = (data.referencePhotos || []).map((image) => ({
    ...image,
    key: image.url,
    url: getCloudFrontUrl(image.url),
  }));

  return data;
};

// --------------------------------------------------
// CREATE CAPACITY
// --------------------------------------------------
export const createQuotationModel = async (req, res) => {
  try {
    const {
      category,
      capacityName,
      quantity,
      connectingEquipment,
      description,
      isActive,
    } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    if (!(await validateCategory(category))) {
      return res.status(400).json({
        success: false,
        message: "Invalid category.",
      });
    }

    if (!capacityName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Capacity name is required.",
      });
    }

    const parsedQuantity = parseQuantity(quantity);

    const pricingTable = parseJsonField(req.body.pricingTable);

    const technicalSpecifications = parseJsonField(
      req.body.technicalSpecifications
    );

    const existingImages = normalizeImages(
      parseJsonField(req.body.images)
    );

    const existingReferencePhotos = normalizeImages(
      parseJsonField(req.body.referencePhotos)
    );

    const imageDescriptions = parseJsonField(
      req.body.imageDescriptions
    );

    const referencePhotoDescriptions = parseJsonField(
      req.body.referencePhotoDescriptions
    );

    const uploadedImages = await uploadImages(
      req.files?.images || [],
      imageDescriptions
    );

    const uploadedReferencePhotos = await uploadImages(
      req.files?.referencePhotos || [],
      referencePhotoDescriptions
    );

    const quotationModel = await QuotationModel.create({
      category,
      capacityName: capacityName.trim(),
      quantity: parsedQuantity,
      connectingEquipment: connectingEquipment || "without",
      description: description || "",
      pricingTable,
      technicalSpecifications,
      images: [...existingImages, ...uploadedImages],
      referencePhotos: [
        ...existingReferencePhotos,
        ...uploadedReferencePhotos,
      ],
      isActive: parseBoolean(isActive, true),
    });

    return res.status(201).json({
      success: true,
      message: "Capacity created successfully.",
      data: formatQuotationModel(quotationModel),
    });
  } catch (error) {
    console.error("Create quotation capacity error:", error);

    const statusCode =
      error.name === "ValidationError" ||
      error.message === "Quantity must be a positive integer." ||
      error.message === "Invalid JSON data received from the form." ||
      error.message === "Images must be an array."
        ? 400
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to create capacity.",
    });
  }
};

// --------------------------------------------------
// GET ALL CAPACITIES
// Optional filter: ?category=CATEGORY_ID
// --------------------------------------------------
export const getQuotationModels = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      if (!mongoose.isValidObjectId(req.query.category)) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID.",
        });
      }

      filter.category = req.query.category;
    }

    const quotationModels = await QuotationModel.find(filter)
      .populate("category", "name slug application")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: quotationModels.length,
      data: quotationModels.map(formatQuotationModel),
    });
  } catch (error) {
    console.error("Get quotation capacities error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch capacities.",
    });
  }
};

// --------------------------------------------------
// GET ONE CAPACITY
// --------------------------------------------------
export const getQuotationModelById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid capacity ID.",
      });
    }

    const quotationModel = await QuotationModel.findById(id).populate(
      "category",
      "name slug application"
    );

    if (!quotationModel) {
      return res.status(404).json({
        success: false,
        message: "Capacity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: formatQuotationModel(quotationModel),
    });
  } catch (error) {
    console.error("Get quotation capacity error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch capacity.",
    });
  }
};

// --------------------------------------------------
// UPDATE CAPACITY
// Existing images are preserved unless their arrays
// are explicitly sent. Newly uploaded files are added.
// --------------------------------------------------
export const updateQuotationModel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid capacity ID.",
      });
    }

    const quotationModel = await QuotationModel.findById(id);

    if (!quotationModel) {
      return res.status(404).json({
        success: false,
        message: "Capacity not found.",
      });
    }

    if (req.body.category !== undefined) {
      if (!(await validateCategory(req.body.category))) {
        return res.status(400).json({
          success: false,
          message: "Invalid category.",
        });
      }

      quotationModel.category = req.body.category;
    }

    if (req.body.capacityName !== undefined) {
      if (!req.body.capacityName?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Capacity name is required.",
        });
      }

      quotationModel.capacityName = req.body.capacityName.trim();
    }

    // Update quantity only when supplied.
    if (req.body.quantity !== undefined) {
      quotationModel.quantity = parseQuantity(req.body.quantity);
    }

    if (req.body.connectingEquipment !== undefined) {
      quotationModel.connectingEquipment =
        req.body.connectingEquipment;
    }

    if (req.body.description !== undefined) {
      quotationModel.description = req.body.description;
    }

    if (req.body.pricingTable !== undefined) {
      quotationModel.pricingTable = parseJsonField(
        req.body.pricingTable
      );
    }

    if (req.body.technicalSpecifications !== undefined) {
      quotationModel.technicalSpecifications = parseJsonField(
        req.body.technicalSpecifications
      );
    }

    if (req.body.isActive !== undefined) {
      quotationModel.isActive = parseBoolean(req.body.isActive);
    }

    // Preserve existing images unless arrays are supplied.
    if (req.body.images !== undefined) {
      quotationModel.images = normalizeImages(
        parseJsonField(req.body.images)
      );
    }

    if (req.body.referencePhotos !== undefined) {
      quotationModel.referencePhotos = normalizeImages(
        parseJsonField(req.body.referencePhotos)
      );
    }

    const imageDescriptions = parseJsonField(
      req.body.imageDescriptions
    );

    const referencePhotoDescriptions = parseJsonField(
      req.body.referencePhotoDescriptions
    );

    const uploadedImages = await uploadImages(
      req.files?.images || [],
      imageDescriptions
    );

    const uploadedReferencePhotos = await uploadImages(
      req.files?.referencePhotos || [],
      referencePhotoDescriptions
    );

    // Append newly uploaded images.
    quotationModel.images.push(...uploadedImages);
    quotationModel.referencePhotos.push(...uploadedReferencePhotos);

    await quotationModel.save();

    return res.status(200).json({
      success: true,
      message: "Capacity updated successfully.",
      data: formatQuotationModel(quotationModel),
    });
  } catch (error) {
    console.error("Update quotation capacity error:", error);

    const statusCode =
      error.name === "ValidationError" ||
      error.message === "Quantity must be a positive integer." ||
      error.message === "Invalid JSON data received from the form." ||
      error.message === "Images must be an array."
        ? 400
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to update capacity.",
    });
  }
};

// --------------------------------------------------
// DELETE CAPACITY
// --------------------------------------------------
export const deleteQuotationModel = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid capacity ID.",
      });
    }

    const quotationModel = await QuotationModel.findByIdAndDelete(id);

    if (!quotationModel) {
      return res.status(404).json({
        success: false,
        message: "Capacity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Capacity deleted successfully.",
    });
  } catch (error) {
    console.error("Delete quotation capacity error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete capacity.",
    });
  }
};
