import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import transporter from "./utils/enquiry/mailer.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(
    `Vikah Ecotech Backend running on http://localhost:${PORT}`
  );
});