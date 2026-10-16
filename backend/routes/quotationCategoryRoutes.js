
import express from "express";

import {
  createQuotationCategory,
  getQuotationCategories,
  getQuotationCategoryById,
  updateQuotationCategory,
  deleteQuotationCategory,
} from "../controllers/quotationCategoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Protect all quotation category routes
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/admin/quotation-categories
router.get("/", getQuotationCategories);

// GET /api/admin/quotation-categories/:id
router.get("/:id", getQuotationCategoryById);

// POST /api/admin/quotation-categories
router.post("/", createQuotationCategory);

// PUT /api/admin/quotation-categories/:id
router.put("/:id", updateQuotationCategory);

// DELETE /api/admin/quotation-categories/:id
router.delete("/:id", deleteQuotationCategory);

export default router;
