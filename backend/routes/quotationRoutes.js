import express from "express";

import {
  createQuotation,
  getQuotations,
  getQuotationById,
  updateQuotation,
  updateQuotationStatus,
  deleteQuotation,
  getPublicQuotations,
} from "../controllers/quotationController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Public: available quotations for customers
router.get("/public", getPublicQuotations);

// ==================================================
// CREATE QUOTATION
// ==================================================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "referenceImages",
      maxCount: 20,
    },
  ]),
  createQuotation
);

// ==================================================
// GET ALL QUOTATIONS
// ==================================================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getQuotations
);

// ==================================================
// GET QUOTATION BY ID
// ==================================================

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getQuotationById
);

// ==================================================
// UPDATE QUOTATION
// ==================================================

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "referenceImages",
      maxCount: 20,
    },
  ]),
  updateQuotation
);

// ==================================================
// UPDATE QUOTATION STATUS
// ==================================================

router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateQuotationStatus
);

// ==================================================
// DELETE QUOTATION
// ==================================================

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteQuotation
);

export default router;