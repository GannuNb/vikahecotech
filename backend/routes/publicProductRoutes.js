import express from "express";

import {
  getPublicProductsByApplicationName,
  getPublicProductBySlug,
} from "../controllers/publicProductController.js";

const router = express.Router();

// ======================================
// PUBLIC PRODUCT ROUTES
// ======================================

router.get(
  "/application/:applicationName",
  getPublicProductsByApplicationName
);

router.get(
  "/slug/:slug",
  getPublicProductBySlug
);

export default router;