
import Quotation from "../models/quotationModel.js";
import QuotationRequest from "../models/quotationRequestModel.js";

import generateQuotationNumber from "../utils/quotation/generateQuotationNumber.js";
import generateQuotationPdf from "../utils/quotationPdf/generateQuotationPdf.js";
import sendQuotationEmail from "../utils/quotation/sendQuotationEmail.js";

// ==================================================
// CREATE CUSTOMER QUOTATION REQUEST
// ==================================================

export const createQuotationRequest = async (req, res) => {
  try {
    const {
      quotationId,
      customerName,
      companyName,
      email,
      mobile,
      address,
    } = req.body;

    if (!quotationId) {
      return res.status(400).json({
        success: false,
        message: "Quotation ID is required.",
      });
    }

    if (!customerName?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Customer name is required.",
      });
    }

    if (!email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!mobile?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Mobile number is required.",
      });
    }

    if (!address?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Address is required.",
      });
    }

    const quotation = await Quotation.findById(quotationId);

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found.",
      });
    }

    if (!quotation.isActive) {
      return res.status(400).json({
        success: false,
        message: "This quotation is currently unavailable.",
      });
    }

    const quotationNumber = await generateQuotationNumber();

    const quotationRequest = await QuotationRequest.create({
      quotationNumber,
      quotationId: quotation._id,
      customerName: customerName.trim(),
      companyName: companyName?.trim() || "",
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      address: address.trim(),
      emailStatus: "pending",
    });

    try {
      const pdfBuffer = await generateQuotationPdf(
        quotation,
        quotationRequest
      );

      await sendQuotationEmail({
        quotation,
        quotationRequest,
        pdfBuffer,
      });

      quotationRequest.emailStatus = "sent";
      quotationRequest.emailSentAt = new Date();

      await quotationRequest.save();

      return res.status(201).json({
        success: true,
        message:
          "Quotation request submitted successfully. The quotation PDF has been sent to your email.",
        quotationRequest,
      });
    } catch (emailError) {
      console.error("Quotation PDF/email error:", emailError);

      quotationRequest.emailStatus = "failed";
      await quotationRequest.save();

      return res.status(201).json({
        success: true,
        message:
          "Your quotation request was received, but we could not send the email right now. Please contact our team.",
        emailSent: false,
        quotationRequest,
      });
    }
  } catch (error) {
    console.error("Create quotation request error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create quotation request.",
    });
  }
};

// ==================================================
// GET ALL QUOTATION REQUESTS - ADMIN ONLY
// Supports pagination and searching
// ==================================================

export const getQuotationRequests = async (req, res) => {
  try {
    const page = Math.max(
      1,
      parseInt(req.query.page, 10) || 1
    );

    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit, 10) || 10)
    );

    const search = req.query.search?.trim() || "";

    const filter = {};

    if (search) {
      filter.$or = [
        { quotationNumber: { $regex: search, $options: "i" } },
        { customerName: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }

    const [requests, totalRequests] = await Promise.all([
      QuotationRequest.find(filter)
        .populate("quotationId", "quotationName subject")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),

      QuotationRequest.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      requests,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalRequests / limit),
        totalRequests,
        limit,
      },
    });
  } catch (error) {
    console.error("Get quotation requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation requests.",
    });
  }
};
