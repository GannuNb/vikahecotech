import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import transporter from "./utils/enquiry/mailer.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import publicProductRoutes from "./routes/publicProductRoutes.js";
import specificationRequestRoutes from "./routes/specificationRequestRoutes.js";
import testPdfRoutes from "./routes/testPdfRoutes.js";
import adminSpecificationRequestRoutes from "./routes/adminSpecificationRequestRoutes.js";
import quotationApplicationRoutes from "./routes/quotationApplicationRoutes.js";
import quotationCategoryRoutes from "./routes/quotationCategoryRoutes.js";
import quotationModelRoutes from "./routes/quotationModelRoutes.js";
import quotationRequestRoutes from "./routes/quotationRequestRoutes.js";
import quotationPdfTestRoutes from "./routes/quotationPdfTestRoutes.js";
import publicQuotationRoutes from "./routes/publicQuotationRoutes.js";
import adminQuotationRequestRoutes from "./routes/adminQuotationRequestRoutes.js";


const app = express();

app.disable("x-powered-by");

app.use(helmet());

const PORT = process.env.PORT || 5000;

connectDB();

transporter.verify((error) => {
  if (error) {
    console.error("SMTP connection failed:", error.message);
  } else {
    console.log("SMTP server is ready");
  }
});

// Middleware
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://vikahecotech.com",
        "https://www.vikahecotech.com",
      ]
    : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vikah Ecotech Backend is running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/products", productRoutes);
app.use("/api/public/products", publicProductRoutes);
app.use("/api/public/specification-requests", specificationRequestRoutes);
app.use("/api/test/pdf", testPdfRoutes);
app.use("/api/admin/specification-requests", adminSpecificationRequestRoutes);
app.use("/api/admin/quotation-applications", quotationApplicationRoutes);
app.use("/api/admin/quotation-categories", quotationCategoryRoutes);
app.use("/api/admin/quotation-models", quotationModelRoutes);
app.use("/api/quotation-requests", quotationRequestRoutes);
app.use("/api/test-quotation-pdf", quotationPdfTestRoutes);
app.use("/api/public/quotation", publicQuotationRoutes);
app.use("/api/admin/quotation-requests", adminQuotationRequestRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Vikah Ecotech Backend running on port ${PORT}`);
  
});