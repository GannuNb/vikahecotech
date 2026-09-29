import mongoose from "mongoose";

const specificationRequestSchema = new mongoose.Schema(
  {
    // Product requested by the customer
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    // Store model name for easy admin display
    modelName: {
      type: String,
      required: true,
      trim: true,
    },

    // Customer details
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Request status
    status: {
      type: String,
      enum: [
        "requested",
        "processing",
        "completed",
        "failed",
      ],
      default: "requested",
    },

    // PDF generation status
    pdfGenerated: {
      type: Boolean,
      default: false,
    },

    // Email sending status
    emailSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const SpecificationRequest = mongoose.model(
  "SpecificationRequest",
  specificationRequestSchema
);

export default SpecificationRequest;