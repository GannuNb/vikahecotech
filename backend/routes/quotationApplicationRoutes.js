
import express from "express";

import {
  createQuotationApplication,
  getQuotationApplications,
  getQuotationApplicationById,
  updateQuotationApplication,
  deleteQuotationApplication,
} from "../controllers/quotationApplicationController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin authentication for all routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Get all quotation applications
router.get("/", getQuotationApplications);

// Get one quotation application
router.get("/:id", getQuotationApplicationById);

// Create a quotation application
router.post("/", createQuotationApplication);

// Update a quotation application
router.put("/:id", updateQuotationApplication);

// Delete a quotation application
router.delete("/:id", deleteQuotationApplication);

export default router;
