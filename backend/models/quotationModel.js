
import mongoose from "mongoose";

const quotationModelSchema = new mongoose.Schema(
    {
        // Category to which this capacity belongs
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuotationCategory",
            required: [true, "Category is required"],
        },

        // Capacity name, for example: 4 TPH, 8 TPH, 10 TPH
        capacityName: {
            type: String,
            required: [true, "Capacity name is required"],
            trim: true,
            maxlength: 150,
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },
        // Connecting equipment selection
        connectingEquipment: {
            type: String,
            enum: ["with", "without"],
            default: "without",
        },

        // Description of this capacity
        description: {
            type: String,
            default: "",
            trim: true,
        },

        // Pricing table
        pricingTable: [
            {
                equipmentDescription: {
                    type: String,
                    required: [true, "Equipment description is required"],
                    trim: true,
                },

                modelNo: {
                    type: String,
                    default: "",
                    trim: true,
                },

                // Text such as "7.5 HP x 2 (NBE Make)"
                power: {
                    type: String,
                    default: "",
                    trim: true,
                },

                // Numeric HP value for calculations and display
                hp: {
                    type: Number,
                    default: 0,
                    min: [0, "HP cannot be negative"],
                },

                qty: {
                    type: Number,
                    required: [true, "Quantity is required"],
                    default: 1,
                    min: [1, "Quantity must be at least 1"],
                    validate: {
                        validator: Number.isInteger,
                        message: "Quantity must be a whole number",
                    },
                },

                unitPrice: {
                    type: Number,
                    required: [true, "Unit price is required"],
                    default: 0,
                    min: [0, "Unit price cannot be negative"],
                },

                totalPrice: {
                    type: Number,
                    default: 0,
                    min: 0,
                },
            },
        ],

        // Technical specifications
        technicalSpecifications: [
            {
                label: {
                    type: String,
                    required: [true, "Specification name is required"],
                    trim: true,
                },
                value: {
                    type: String,
                    required: [true, "Specification value is required"],
                    trim: true,
                },
            },
        ],

        // Machinery images
        images: [
            {
                url: {
                    type: String,
                    required: [true, "Machinery image URL is required"],
                    trim: true,
                },
                description: {
                    type: String,
                    default: "",
                    trim: true,
                },
            },
        ],

        // Reference/output photos with descriptions
        referencePhotos: [
            {
                url: {
                    type: String,
                    required: [true, "Reference photo URL is required"],
                    trim: true,
                },
                description: {
                    type: String,
                    default: "",
                    trim: true,
                },
            },
        ],

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

// Calculate pricing row totals before validation and saving
quotationModelSchema.pre("validate", function () {
    this.pricingTable.forEach((item) => {
        item.totalPrice =
            (Number(item.qty) || 0) * (Number(item.unitPrice) || 0);
    });
});

const QuotationModel = mongoose.model(
    "QuotationModel",
    quotationModelSchema
);

export default QuotationModel;
