import express from "express";

import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/*
  All category routes require:
  1. Valid JWT
  2. Admin role
*/

router.use(authMiddleware);
router.use(adminMiddleware);

// CREATE CATEGORY
router.post("/", createCategory);

// GET ALL CATEGORIES
router.get("/", getAllCategories);

// GET CATEGORY BY ID
router.get("/:categoryId", getCategoryById);
router.put("/:categoryId", updateCategory);

router.delete("/:categoryId", deleteCategory);

export default router;