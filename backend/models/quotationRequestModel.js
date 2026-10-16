import mongoose from "mongoose";

const selectedMachinerySchema = new mongoose.Schema(
  {
    quotationModel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuotationModel",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuotationCategory",
      required: true,
    },
    capacityName: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number.",
      },
    },
    connectingEquipment: {
      type: String,
      enum: ["with", "without"],
      default: "without",
    },
  },
  { _id: false }
);

const quotationRequestSchema = new mongoose.Schema(
  {
    quotationNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    customer: {
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 254,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
      },
      company: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
      },
      address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000,
      },
    },
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuotationApplication",
      required: true,
    },
    selectedMachinery: {
      type: [selectedMachinerySchema],
      default: [],
    },
    optionalEquipment: {
      type: [String],
      default: [],
    },
    requestStatus: {
      type: String,
      enum: ["pending", "processing", "completed"],
      default: "pending",
    },
    emailStatus: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    emailSentAt: {
      type: Date,
      default: null,
    },
    emailError: {
      type: String,
      default: "",
    },
    pdfGeneratedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

quotationRequestSchema.index({ createdAt: -1 });
quotationRequestSchema.index({ application: 1, requestStatus: 1 });

const QuotationRequest = mongoose.model(
  "QuotationRequest",
  quotationRequestSchema
);

export default QuotationRequest;