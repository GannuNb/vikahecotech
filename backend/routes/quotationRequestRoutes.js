
import express from "express";

import {
  createQuotationRequest,
  getQuotationRequests,
} from "../controllers/quotationRequestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public: customer submits a quotation request
router.post("/", createQuotationRequest);

// Protected: admin views customer quotation requests
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getQuotationRequests
);

export default router;
