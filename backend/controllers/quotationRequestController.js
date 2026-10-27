
import mongoose from "mongoose";
import QuotationRequest from "../models/quotationRequestModel.js";
import QuotationApplication from "../models/quotationApplicationModel.js";
import QuotationCategory from "../models/quotationCategoryModel.js";
import QuotationModel from "../models/quotationModel.js";
import QuotationCounter from "../models/quotationCounterModel.js";
import processQuotationEmail from "../utils/quotationPdf/processQuotationEmail.js";

export const createQuotationRequest = async (req, res) => {
  try {
    const {
      customer,
      application,
      selectedMachinery,
      optionalEquipment,
    } = req.body;

    if (
      !customer?.name?.trim() ||
      !customer?.email?.trim() ||
      !customer?.phone?.trim() ||
      !customer?.company?.trim() ||
      !customer?.address?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all customer details.",
      });
    }

    if (!application) {
      return res.status(400).json({
        success: false,
        message: "Please select an application.",
      });
    }

    if (
      !Array.isArray(selectedMachinery) ||
      selectedMachinery.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one machinery item.",
      });
    }

    const applicationFilter = mongoose.Types.ObjectId.isValid(application)
      ? { _id: application, isActive: true }
      : { slug: application, isActive: true };

    const applicationDoc = await QuotationApplication.findOne(
      applicationFilter
    );

    if (!applicationDoc) {
      return res.status(400).json({
        success: false,
        message: "Selected application was not found or is inactive.",
      });
    }

    const preparedMachinery = [];
    const seenModels = new Set();

    for (const item of selectedMachinery) {
      if (
        !item.quotationModel ||
        !mongoose.Types.ObjectId.isValid(item.quotationModel)
      ) {
        return res.status(400).json({
          success: false,
          message: "Every machinery item must have a valid model ID.",
        });
      }

      if (
        !item.category ||
        !mongoose.Types.ObjectId.isValid(item.category)
      ) {
        return res.status(400).json({
          success: false,
          message: "Every machinery item must have a valid category ID.",
        });
      }

      if (
        !Number.isInteger(Number(item.quantity)) ||
        Number(item.quantity) < 1
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Machinery quantity must be a whole number greater than zero.",
        });
      }

      if (seenModels.has(String(item.quotationModel))) {
        return res.status(400).json({
          success: false,
          message: "Duplicate machinery model selections are not allowed.",
        });
      }

      seenModels.add(String(item.quotationModel));

      const quotationModel = await QuotationModel.findOne({
        _id: item.quotationModel,
        category: item.category,
        isActive: true,
      }).populate({
        path: "category",
        populate: {
          path: "application",
        },
      });

      if (!quotationModel || !quotationModel.category) {
        return res.status(400).json({
          success: false,
          message:
            "A selected machinery model or category is unavailable.",
        });
      }

      const category = quotationModel.category;
      const categoryApplication = category.application;

      if (
        !categoryApplication ||
        String(categoryApplication._id) !== String(applicationDoc._id)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Selected machinery does not belong to the chosen application.",
        });
      }

      if (!category.isActive || !categoryApplication.isActive) {
        return res.status(400).json({
          success: false,
          message:
            "A selected machinery category or application is inactive.",
        });
      }

      if (
        item.connectingEquipment &&
        !["with", "without"].includes(item.connectingEquipment)
      ) {
        return res.status(400).json({
          success: false,
          message: "Connecting equipment selection is invalid.",
        });
      }

      preparedMachinery.push({
        quotationModel: quotationModel._id,
        category: category._id,
        capacityName: quotationModel.capacityName,
        quantity: quotationModel.quantity,
        connectingEquipment: quotationModel.connectingEquipment || "without",
      });
    }

    const year = new Date().getFullYear();

    const counter = await QuotationCounter.findOneAndUpdate(
      { year },
      { $inc: { sequence: 1 } },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    const quotationNumber = `VEPL/QTN/${year}/${String(
      counter.sequence
    ).padStart(4, "0")}`;

    const request = await QuotationRequest.create({
      quotationNumber,
      customer: {
        name: customer.name.trim(),
        email: customer.email.trim().toLowerCase(),
        phone: customer.phone.trim(),
        company: customer.company.trim(),
        address: customer.address.trim(),
      },
      application: applicationDoc._id,
      selectedMachinery: preparedMachinery,
      optionalEquipment: Array.isArray(optionalEquipment)
        ? [
          ...new Set(
            optionalEquipment
              .filter((item) => typeof item === "string")
              .map((item) => item.trim())
              .filter(Boolean)
          ),
        ]
        : [],
    });

    // Start PDF generation and email delivery in the background.
    // Do not await this call; the customer receives an immediate response.
    processQuotationEmail(request._id).catch((error) => {
      console.error(
        "Quotation background processing error:",
        request._id,
        error
      );
    });

    return res.status(201).json({
      success: true,
      message:
        "Your quotation request has been received. The quotation PDF will be sent to your email shortly.",
      data: request,
    });
  } catch (error) {
    console.error("Create quotation request error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to save quotation request.",
    });
  }
};



export const getQuotationRequests = async (req, res) => {
  try {
    const requests = await QuotationRequest.find()
      .select(
        "quotationNumber customer application selectedMachinery requestStatus emailStatus emailSentAt pdfGeneratedAt createdAt"
      )
      .populate("application", "name slug")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    console.error("Get quotation requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation requests.",
    });
  }
};
