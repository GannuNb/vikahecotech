
import express from "express";

import {
  testQuotationPdf,
} from "../controllers/testQuotationPdfController.js";

const router = express.Router();

// Temporary development-only PDF testing route
router.get("/:id", (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    return res.status(404).json({
      success: false,
      message: "Route not found.",
    });
  }

  next();
}, testQuotationPdf);

export default router;
