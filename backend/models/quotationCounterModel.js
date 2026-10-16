
import mongoose from "mongoose";

const quotationCounterSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
    },
    sequence: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const QuotationCounter = mongoose.model(
  "QuotationCounter",
  quotationCounterSchema
);

export default QuotationCounter;
