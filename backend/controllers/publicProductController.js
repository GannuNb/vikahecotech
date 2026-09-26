import Application from "../models/applicationModel.js";
import Product from "../models/productModel.js";
import getCloudFrontUrl from "../utils/aws/cloudFrontUrl.js";

// ======================================
// GET PRODUCTS BY APPLICATION NAME
// PUBLIC
// ======================================

export const getPublicProductsByApplicationName = async (
  req,
  res
) => {
  try {
    const { applicationName } = req.params;

    if (!applicationName) {
      return res.status(400).json({
        success: false,
        message: "Application name is required",
      });
    }

    // Normalize application name
    // - Remove leading/trailing spaces
    // - Convert multiple spaces into one
    // - Ignore uppercase/lowercase differences
    const normalizedApplicationName = applicationName
      .trim()
      .replace(/\s+/g, " ");

    // Find application
    const application = await Application.findOne({
      name: {
        $regex: `^${normalizedApplicationName}$`,
        $options: "i",
      },
    }).populate("category", "name");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Find products belonging to this application
    const products = await Product.find({
      application: application._id,
    })
      .sort({ modelName: 1 })
      .lean();

    // Convert S3 keys to CloudFront URLs
    const formattedProducts = products.map((product) => ({
      ...product,

      images: Array.isArray(product.images)
        ? product.images.map((image) =>
            getCloudFrontUrl(image)
          )
        : [],
    }));

    res.status(200).json({
      success: true,

      application: {
        _id: application._id,
        name: application.name,
        category: application.category,
      },

      products: formattedProducts,
    });
  } catch (error) {
    console.error(
      "Get public products by application name error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

// ======================================
// GET PUBLIC PRODUCT BY SLUG
// PUBLIC
// ======================================

export const getPublicProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Product slug is required",
      });
    }

    const normalizedSlug = slug.trim().toLowerCase();

    const product = await Product.findOne({
      slug: normalizedSlug,
    })
      .populate({
        path: "application",
        select: "name category",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .lean();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const formattedProduct = {
      ...product,

      images: Array.isArray(product.images)
        ? product.images.map((image) =>
            getCloudFrontUrl(image)
          )
        : [],
    };

    res.status(200).json({
      success: true,
      product: formattedProduct,
    });
  } catch (error) {
    console.error(
      "Get public product by slug error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch public product",
      error: error.message,
    });
  }
};