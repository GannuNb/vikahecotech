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

// Start server
app.listen(PORT, () => {
  console.log(`Vikah Ecotech Backend running on port ${PORT}`);
});