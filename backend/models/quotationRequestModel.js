import mongoose from "mongoose";

const quotationRequestSchema = new mongoose.Schema(
  {
    quotationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      required: true,
    },

    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    emailStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },

    emailSentAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const QuotationRequest = mongoose.model(
  "QuotationRequest",
  quotationRequestSchema
);

export default QuotationRequest;