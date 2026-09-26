import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductsByApplication,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  deleteProductImage,
  replaceProductImage,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/slug/:slug", getProductBySlug);

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", getAllProducts);

router.get(
  "/application/:applicationId",
  getProductsByApplication
);

router.get(
  "/:productId",
  getProductById
);

router.post(
  "/",
  upload.array("images", 5),
  createProduct
);


router.put(
  "/:productId/image",
  upload.single("image"),
  replaceProductImage
);

router.put(
  "/:productId",
  upload.array("images", 5),
  updateProduct
);

// Delete individual product image
router.delete(
  "/:productId/image",
  deleteProductImage
);

// Delete entire product
router.delete(
  "/:productId",
  deleteProduct
);

export default router;

