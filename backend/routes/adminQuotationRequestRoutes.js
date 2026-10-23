
import express from "express";
import { getQuotationRequests } from "../controllers/quotationRequestController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", getQuotationRequests);

export default router;
