
import mongoose from "mongoose";

import Quotation from "../models/quotationModel.js";
import generateQuotationPdf from "../utils/quotationPdf/generateQuotationPdf.js";

export const testQuotationPdf = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation ID.",
      });
    }

    const quotation = await Quotation.findById(id).lean();

    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: "Quotation not found.",
      });
    }

    // Dummy customer details for PDF testing only
    const quotationRequest = {
      quotationNumber: "QTN-2026-TEST01",
      customerName: "Test Customer",
      companyName: "Test Company",
      email: "test@example.com",
      mobile: "9876543210",
      address: "Hyderabad, Telangana",
    };

const pdfBuffer = await generateQuotationPdf(
  quotation,
  quotationRequest
);

res.setHeader("Content-Type", "application/pdf");
res.setHeader(
  "Content-Disposition",
  'inline; filename="test-quotation.pdf"'
);

return res.status(200).send(pdfBuffer);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'inline; filename="test-quotation.pdf"'
    );

    return res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Test quotation PDF error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate test quotation PDF.",
    });
  }
};
