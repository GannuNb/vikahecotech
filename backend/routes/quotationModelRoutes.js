
import express from "express";

import {
  createQuotationModel,
  getQuotationModels,
  getQuotationModelById,
  updateQuotationModel,
  deleteQuotationModel,
} from "../controllers/quotationModelController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Protect all quotation model routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Read routes
router.get("/", getQuotationModels);
router.get("/:id", getQuotationModelById);

// Create capacity with multiple machinery and reference images
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "referencePhotos", maxCount: 10 },
  ]),
  createQuotationModel
);

// Update capacity with optional image uploads
router.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "referencePhotos", maxCount: 10 },
  ]),
  updateQuotationModel
);

// Delete capacity
router.delete("/:id", deleteQuotationModel);

export default router;
