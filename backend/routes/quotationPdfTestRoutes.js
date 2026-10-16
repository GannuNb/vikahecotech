
import express from "express";
import { testQuotationPdfHeader } from "../controllers/quotationPdfTestController.js";

const router = express.Router();

router.get("/header", testQuotationPdfHeader);

export default router;
