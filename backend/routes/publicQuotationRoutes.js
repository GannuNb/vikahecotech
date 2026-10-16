
import express from "express";
import {
  getPublicQuotationApplications,
  getPublicQuotationCategories,
  getPublicQuotationModels,
} from "../controllers/publicQuotationController.js";

const router = express.Router();

router.get("/applications", getPublicQuotationApplications);
router.get("/categories", getPublicQuotationCategories);
router.get("/models", getPublicQuotationModels);

export default router;
