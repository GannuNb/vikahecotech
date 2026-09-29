import express from "express";

import {
  testProductSpecificationPdf,
} from "../controllers/testPdfController.js";

const router = express.Router();

router.get(
  "/:slug",
  testProductSpecificationPdf
);

export default router;