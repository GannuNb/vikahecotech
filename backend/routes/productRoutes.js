import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductsByApplication,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// =========================
// PUBLIC PRODUCT ROUTE
// =========================

// Keep this route public.
// Website product pages will use /:slug.
router.get("/slug/:slug", getProductBySlug);

// =========================
// ADMIN PROTECTED ROUTES
// =========================

router.use(authMiddleware);
router.use(adminMiddleware);

// Get all products
router.get("/", getAllProducts);

// Get products by application
router.get(
  "/application/:applicationId",
  getProductsByApplication
);

// Get product by ID
router.get(
  "/:productId",
  getProductById
);

// Create product
router.post(
  "/",
  createProduct
);

// Update product
router.put(
  "/:productId",
  updateProduct
);

// Delete product
router.delete(
  "/:productId",
  deleteProduct
);

export default router;