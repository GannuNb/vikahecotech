
import mongoose from "mongoose";

const quotationCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },

    slug: {
      type: String,
      required: [true, "Category slug is required"],
      trim: true,
      lowercase: true,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuotationApplication",
      required: [true, "Quotation application is required"],
      index: true,
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

quotationCategorySchema.index(
  { application: 1, slug: 1 },
  { unique: true }
);

const QuotationCategory = mongoose.model(
  "QuotationCategory",
  quotationCategorySchema
);

export default QuotationCategory;
