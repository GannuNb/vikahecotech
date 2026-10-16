import express from "express";
import { createQuotationRequest } from "../controllers/quotationRequestController.js";

const router = express.Router();

router.post("/", createQuotationRequest);

export default router;