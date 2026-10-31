
import express from "express";
import {
  createEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} from "../controllers/enquiryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public API - Submit enquiry
router.post("/", createEnquiry);

// Admin API - Fetch enquiries with pagination
router.get("/", authMiddleware, adminMiddleware, getAllEnquiries);

// Admin API - Update enquiry status
router.patch("/:id/status", authMiddleware, adminMiddleware, updateEnquiryStatus);

export default router;
