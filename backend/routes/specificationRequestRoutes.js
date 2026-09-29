import express from "express";

import {
  createSpecificationRequest,
} from "../controllers/specificationRequestController.js";

const router = express.Router();

// Create specification request
router.post(
  "/",
  createSpecificationRequest
);

export default router;