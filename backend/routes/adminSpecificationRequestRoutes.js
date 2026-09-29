import express from "express";

import {
  getAllSpecificationRequests,
  getSpecificationRequestById,
  updateSpecificationRequestStatus,
} from "../controllers/adminSpecificationRequestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// =========================================
// GET ALL SPECIFICATION REQUESTS
// =========================================

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllSpecificationRequests
);

// =========================================
// GET SINGLE SPECIFICATION REQUEST
// =========================================

router.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  getSpecificationRequestById
);

// =========================================
// UPDATE REQUEST STATUS
// =========================================

router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateSpecificationRequestStatus
);

export default router;