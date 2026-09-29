import mongoose from "mongoose";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

import Product from "../models/productModel.js";
import SpecificationRequest from "../models/specificationRequestModel.js";

import generateProductSpecificationPdf from "../utils/pdf/generateProductSpecificationPdf.js";

// -----------------------------------------
// FILE PATH
// -----------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(
  __dirname,
  "../templates/emails/specificationRequest.ejs"
);

// -----------------------------------------
// EMAIL TRANSPORTER
// -----------------------------------------

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// -----------------------------------------
// BACKGROUND PDF + EMAIL PROCESS
// -----------------------------------------

const processSpecificationRequest = async (
  specificationRequestId,
  product
) => {
  try {
    console.log(
      "Background specification processing started:",
      specificationRequestId
    );

    // -----------------------------------------
    // GENERATE PDF
    // -----------------------------------------

    console.time(
      `PDF GENERATION ${specificationRequestId}`
    );

    const {
      pdfBuffer,
      fileName,
    } = await generateProductSpecificationPdf(
      product
    );

    console.timeEnd(
      `PDF GENERATION ${specificationRequestId}`
    );

    // -----------------------------------------
    // UPDATE PDF STATUS
    // -----------------------------------------

    await SpecificationRequest.findByIdAndUpdate(
      specificationRequestId,
      {
        pdfGenerated: true,
      }
    );

    console.log(
      "PDF generated successfully:",
      fileName
    );

    // -----------------------------------------
    // RENDER EJS EMAIL
    // -----------------------------------------

    console.time(
      `EJS RENDER ${specificationRequestId}`
    );

    const emailHtml = await ejs.renderFile(
      templatePath,
      {
        modelName:
          product.modelName,

        applicationName:
          product.application?.name ||
          "Industrial Equipment",

        categoryName:
          product.application?.category?.name ||
          "Industrial Equipment",
      }
    );

    console.timeEnd(
      `EJS RENDER ${specificationRequestId}`
    );

    // -----------------------------------------
    // SEND EMAIL
    // -----------------------------------------

    console.time(
      `EMAIL SEND ${specificationRequestId}`
    );

    await transporter.sendMail({
      from: `"Vikah Ecotech Pvt Ltd" <${process.env.SMTP_USER}>`,

      to: product.specificationRequestEmail,

      subject:
        `${product.modelName} - Complete Technical Specifications`,

      html: emailHtml,

      attachments: [
        {
          filename: fileName,

          content: pdfBuffer,

          contentType: "application/pdf",
        },
      ],
    });

    console.timeEnd(
      `EMAIL SEND ${specificationRequestId}`
    );

    // -----------------------------------------
    // UPDATE COMPLETED STATUS
    // -----------------------------------------

    await SpecificationRequest.findByIdAndUpdate(
      specificationRequestId,
      {
        emailSent: true,
        status: "completed",
      }
    );

    console.log(
      "Specification PDF emailed successfully:",
      product.specificationRequestEmail
    );

  } catch (error) {
    console.error(
      "Background specification processing error:",
      error
    );

    // -----------------------------------------
    // UPDATE FAILED STATUS
    // -----------------------------------------

    await SpecificationRequest.findByIdAndUpdate(
      specificationRequestId,
      {
        status: "failed",
      }
    );
  }
};

// -----------------------------------------
// CREATE SPECIFICATION REQUEST
// -----------------------------------------

const createSpecificationRequest = async (
  req,
  res
) => {
  try {
    const {
      productId,
      email,
      phone,
    } = req.body;

    // -----------------------------------------
    // VALIDATION
    // -----------------------------------------

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        productId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // -----------------------------------------
    // FIND PRODUCT
    // -----------------------------------------

    const product = await Product.findById(
      productId
    ).populate({
      path: "application",
      populate: {
        path: "category",
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // -----------------------------------------
    // CLEAN CUSTOMER DATA
    // -----------------------------------------

    const customerEmail = email
      .trim()
      .toLowerCase();

    const customerPhone = phone.trim();

    // -----------------------------------------
    // CREATE MONGODB REQUEST
    // -----------------------------------------

    const specificationRequest =
      await SpecificationRequest.create({
        product: product._id,

        modelName:
          product.modelName,

        email:
          customerEmail,

        phone:
          customerPhone,

        status: "processing",

        pdfGenerated: false,

        emailSent: false,
      });

    console.log(
      "Specification request created:",
      specificationRequest._id
    );

    // -----------------------------------------
    // ADD EMAIL TO PRODUCT OBJECT
    // FOR BACKGROUND PROCESSING
    // -----------------------------------------

    product.specificationRequestEmail =
      customerEmail;

    // -----------------------------------------
    // START BACKGROUND PROCESS
    // -----------------------------------------

    processSpecificationRequest(
      specificationRequest._id,
      product
    );

    // -----------------------------------------
    // IMMEDIATE RESPONSE
    // -----------------------------------------

    return res.status(201).json({
      success: true,

      message:
        "Your request has been received. Complete specifications will be sent to your email shortly.",

      request: {
        id:
          specificationRequest._id,

        product:
          specificationRequest.product,

        modelName:
          specificationRequest.modelName,

        email:
          specificationRequest.email,

        phone:
          specificationRequest.phone,

        status:
          specificationRequest.status,

        pdfGenerated:
          specificationRequest.pdfGenerated,

        emailSent:
          specificationRequest.emailSent,

        createdAt:
          specificationRequest.createdAt,
      },
    });

  } catch (error) {
    console.error(
      "Create specification request error:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Failed to process specification request",
    });
  }
};

// -----------------------------------------
// EXPORT
// -----------------------------------------

export {
  createSpecificationRequest,
};