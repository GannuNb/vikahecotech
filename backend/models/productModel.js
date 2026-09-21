import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // Product / Model name
    modelName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Used for frontend URL
    // Example: /blt150
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Application this model belongs to
    // Example: BLT-150 -> Tyre Scrap Baler
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // AWS S3 image URLs
    images: [
      {
        type: String,
        trim: true,
      },
    ],

    // SEO information
    seo: {
      title: {
        type: String,
        trim: true,
      },

      description: {
        type: String,
        trim: true,
      },

      keywords: {
        type: String,
        trim: true,
      },
    },

    // Technical specifications
    sections: [
      {
        heading: {
          type: String,
          required: true,
          trim: true,
        },

        fields: [
          {
            name: {
              type: String,
              required: true,
              trim: true,
            },

            value: {
              type: String,
              required: true,
              trim: true,
            },

            // Show this specification on public product page
            // All specifications can still go into PDF
            isPublic: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;