import mongoose from "mongoose";

import Product from "../models/productModel.js";
import Application from "../models/applicationModel.js";

// =========================
// CREATE PRODUCT
// =========================
export const createProduct = async (req, res) => {
  try {
    const {
      modelName,
      slug,
      application,
      description,
      images,
      seo,
      sections,
    } = req.body;

    // Basic validation
    if (
      !modelName ||
      !slug ||
      !application ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Model name, slug, application and description are required",
      });
    }

    // Check application
    if (!mongoose.Types.ObjectId.isValid(application)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const existingApplication =
      await Application.findById(application);

    if (!existingApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Check duplicate model name
    const existingModel = await Product.findOne({
      modelName: modelName.trim(),
    });

    if (existingModel) {
      return res.status(409).json({
        success: false,
        message: "Product model already exists",
      });
    }

    // Check duplicate slug
    const existingSlug = await Product.findOne({
      slug: slug.trim().toLowerCase(),
    });

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message: "Product slug already exists",
      });
    }

    const product = await Product.create({
      modelName: modelName.trim(),

      slug: slug.trim().toLowerCase(),

      application,

      description: description.trim(),

      images: Array.isArray(images)
        ? images
        : [],

      seo: seo || {},

      sections: Array.isArray(sections)
        ? sections
        : [],
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(
      "Create product error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// =========================
// GET ALL PRODUCTS
// =========================
export const getAllProducts = async (
  req,
  res
) => {
  try {
    const products = await Product.find()
      .populate({
        path: "application",
        select: "name category",
        populate: {
          path: "category",
          select: "name",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(
      "Get products error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to get products",
      error: error.message,
    });
  }
};

// =========================
// GET PRODUCTS BY APPLICATION
// =========================
export const getProductsByApplication =
  async (req, res) => {
    try {
      const { applicationId } =
        req.params;

      if (
        !mongoose.Types.ObjectId.isValid(
          applicationId
        )
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid application ID",
        });
      }

      const application =
        await Application.findById(
          applicationId
        ).populate("category", "name");

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      const products = await Product.find({
        application: applicationId,
      }).sort({
        modelName: 1,
      });

      res.status(200).json({
        success: true,
        application,
        count: products.length,
        products,
      });
    } catch (error) {
      console.error(
        "Get products by application error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to get products",
        error: error.message,
      });
    }
  };

// =========================
// GET PRODUCT BY ID
// =========================
export const getProductById = async (
  req,
  res
) => {
  try {
    const { productId } =
      req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        productId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(
      productId
    ).populate({
      path: "application",
      select: "name category",
      populate: {
        path: "category",
        select: "name",
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "Get product by ID error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to get product",
      error: error.message,
    });
  }
};

// =========================
// GET PRODUCT BY SLUG
// =========================
export const getProductBySlug = async (
  req,
  res
) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      slug: slug.trim().toLowerCase(),
    }).populate({
      path: "application",
      select: "name category",
      populate: {
        path: "category",
        select: "name",
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(
      "Get product by slug error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to get product",
      error: error.message,
    });
  }
};

// =========================
// UPDATE PRODUCT
// =========================
export const updateProduct = async (
  req,
  res
) => {
  try {
    const { productId } =
      req.params;

    const {
      modelName,
      slug,
      application,
      description,
      images,
      seo,
      sections,
    } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(
        productId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (
      !modelName ||
      !slug ||
      !application ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Model name, slug, application and description are required",
      });
    }

    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        application
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    const existingApplication =
      await Application.findById(
        application
      );

    if (!existingApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Duplicate model name
    const duplicateModel =
      await Product.findOne({
        modelName: modelName.trim(),
        _id: { $ne: productId },
      });

    if (duplicateModel) {
      return res.status(409).json({
        success: false,
        message:
          "Product model already exists",
      });
    }

    // Duplicate slug
    const duplicateSlug =
      await Product.findOne({
        slug: slug.trim().toLowerCase(),
        _id: { $ne: productId },
      });

    if (duplicateSlug) {
      return res.status(409).json({
        success: false,
        message:
          "Product slug already exists",
      });
    }

    product.modelName =
      modelName.trim();

    product.slug =
      slug.trim().toLowerCase();

    product.application =
      application;

    product.description =
      description.trim();

    product.images =
      Array.isArray(images)
        ? images
        : [];

    product.seo = seo || {};

    product.sections =
      Array.isArray(sections)
        ? sections
        : [];

    const updatedProduct =
      await product.save();

    res.status(200).json({
      success: true,
      message:
        "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(
      "Update product error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to update product",
      error: error.message,
    });
  }
};

// =========================
// DELETE PRODUCT
// =========================
export const deleteProduct = async (
  req,
  res
) => {
  try {
    const { productId } =
      req.params;

    if (
      !mongoose.Types.ObjectId.isValid(
        productId
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product =
      await Product.findById(
        productId
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(
      productId
    );

    res.status(200).json({
      success: true,
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete product error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to delete product",
      error: error.message,
    });
  }
};