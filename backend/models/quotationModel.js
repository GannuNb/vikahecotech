import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema(
  {
    // --------------------------------------------------
    // BASIC INFORMATION
    // --------------------------------------------------

    quotationName: {
      type: String,
      required: true,
      trim: true,
    },

    quotationDate: {
      type: Date,
      default: Date.now,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    preparedBy: {
      type: String,
      trim: true,
    },

    verifiedBy: {
      type: String,
      trim: true,
    },

    approvedBy: {
      type: String,
      trim: true,
    },

    // --------------------------------------------------
    // INFORMATION
    // --------------------------------------------------

    information: {
      description: {
        type: String,
        trim: true,
      },
    },

    // --------------------------------------------------
    // SPECIFICATIONS
    // --------------------------------------------------

    specifications: [
      {
        label: {
          type: String,
          trim: true,
        },

        value: {
          type: String,
          trim: true,
        },
      },
    ],

    // --------------------------------------------------
    // PRICING TABLES
    // --------------------------------------------------

    pricingTables: [
      {
        sectionName: {
          type: String,
          required: true,
          trim: true,
        },

        machinery: [
          {
            equipmentDescription: {
              type: String,
              required: true,
              trim: true,
            },

            modelNo: {
              type: String,
              trim: true,
            },

            power: {
              display: {
                type: String,
                trim: true,
              },

              hp: {
                type: Number,
                min: 0,
                default: 0,
              },
            },

            qty: {
              type: Number,
              required: true,
              min: 1,
            },

            unitPrice: {
              type: Number,
              required: true,
              min: 0,
            },

            totalPrice: {
              type: Number,
              required: true,
              min: 0,
            },
          },
        ],

        totalQty: {
          type: Number,
          min: 0,
          default: 0,
        },

        totalHp: {
          type: Number,
          min: 0,
          default: 0,
        },

        totalCost: {
          type: Number,
          min: 0,
          default: 0,
        },
      },
    ],

    // --------------------------------------------------
    // QUOTATION TOTALS
    // --------------------------------------------------

    totalEquipmentQty: {
      type: Number,
      min: 0,
      default: 0,
    },

    totalHp: {
      type: Number,
      min: 0,
      default: 0,
    },

    // Equipment subtotal BEFORE tax
    grandTotal: {
      type: Number,
      min: 0,
      default: 0,
    },

    // --------------------------------------------------
    // TAX
    // --------------------------------------------------

    tax: {
      name: {
        type: String,
        trim: true,
      },

      percentage: {
        type: Number,
        min: 0,
        default: 0,
      },

      isExtra: {
        type: Boolean,
        default: true,
      },
    },

    // Actual calculated tax amount
    taxAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    // grandTotal + taxAmount
    finalTotal: {
      type: Number,
      min: 0,
      default: 0,
    },

    // --------------------------------------------------
    // TECHNICAL SPECIFICATIONS
    // --------------------------------------------------

    technicalSpecifications: [
      {
        title: {
          type: String,
          trim: true,
        },

        fields: [
          {
            label: {
              type: String,
              trim: true,
            },

            value: {
              type: String,
              trim: true,
            },
          },
        ],
      },
    ],

    // --------------------------------------------------
    // QUOTATION IMAGES
    // --------------------------------------------------

    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // --------------------------------------------------
    // REFERENCE IMAGES
    // --------------------------------------------------

    referenceImages: [
      {
        type: String,
        trim: true,
      },
    ],

    // --------------------------------------------------
    // BUYER SCOPE
    // --------------------------------------------------

    buyerScope: [
      {
        label: {
          type: String,
          trim: true,
        },

        value: {
          type: String,
          trim: true,
        },
      },
    ],

    // --------------------------------------------------
    // COMMERCIAL TERMS
    // --------------------------------------------------

    commercialTerms: [
      {
        label: {
          type: String,
          trim: true,
        },

        value: {
          type: String,
          trim: true,
        },
      },
    ],

    // --------------------------------------------------
    // STATUS
    // --------------------------------------------------

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quotation = mongoose.model(
  "Quotation",
  quotationSchema
);

export default Quotation;