import express from "express";

import {
  createApplication,
  getAllApplications,
  getApplicationsByCategory,
  getApplicationById,
  updateApplication,
  deleteApplication,
} from "../controllers/applicationController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Protect all application routes
router.use(authMiddleware);
router.use(adminMiddleware);

router.post("/", createApplication);

router.get("/", getAllApplications);

router.get(
  "/category/:categoryId",
  getApplicationsByCategory
);

router.get(
  "/:applicationId",
  getApplicationById
);
router.put(
  "/:applicationId",
  updateApplication
);

router.delete(
  "/:applicationId",
  deleteApplication
);
export default router;