
import mongoose from "mongoose";

const quotationApplicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Application name is required"],
      trim: true,
      unique: true,
      maxlength: [100, "Application name cannot exceed 100 characters"],
    },

    slug: {
      type: String,
      required: [true, "Application slug is required"],
      trim: true,
      lowercase: true,
      unique: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuotationApplication = mongoose.model(
  "QuotationApplication",
  quotationApplicationSchema
);

export default QuotationApplication;
