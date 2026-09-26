import mongoose from "mongoose";

import Product from "../models/productModel.js";
import Application from "../models/applicationModel.js";
import uploadToS3 from "../utils/aws/s3Upload.js";
import deleteFromS3 from "../utils/aws/s3Delete.js";
import getCloudFrontUrl from "../utils/aws/cloudFrontUrl.js";
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
      seo,
      sections,
    } = req.body;

    // =========================
    // BASIC VALIDATION
    // =========================

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

    // =========================
    // CHECK APPLICATION ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(application)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    // =========================
    // CHECK APPLICATION
    // =========================

    const existingApplication =
      await Application.findById(application);

    if (!existingApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // =========================
    // CHECK DUPLICATE MODEL NAME
    // =========================

    const existingModel = await Product.findOne({
      modelName: modelName.trim(),
    });

    if (existingModel) {
      return res.status(409).json({
        success: false,
        message: "Product model already exists",
      });
    }

    // =========================
    // CHECK DUPLICATE SLUG
    // =========================

    const normalizedSlug = slug.trim().toLowerCase();

    const existingSlug = await Product.findOne({
      slug: normalizedSlug,
    });

    if (existingSlug) {
      return res.status(409).json({
        success: false,
        message: "Product slug already exists",
      });
    }

    // =========================
    // PARSE SEO
    // =========================

    let parsedSeo = {};

    if (seo) {
      try {
        parsedSeo =
          typeof seo === "string"
            ? JSON.parse(seo)
            : seo;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid SEO data",
        });
      }
    }

    // =========================
    // PARSE SECTIONS
    // =========================

    let parsedSections = [];

    if (sections) {
      try {
        parsedSections =
          typeof sections === "string"
            ? JSON.parse(sections)
            : sections;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid sections data",
        });
      }
    }

    // Make sure sections is an array
    if (!Array.isArray(parsedSections)) {
      parsedSections = [];
    }

    // =========================
    // UPLOAD IMAGES TO S3
    // =========================

    const imageKeys = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const safeOriginalName =
          file.originalname
            .replace(/\s+/g, "-")
            .replace(/[^a-zA-Z0-9._-]/g, "");

        const fileName = `${normalizedSlug}-${Date.now()}-${safeOriginalName}`;

        const key = await uploadToS3(
          file.buffer,
          fileName,
          file.mimetype
        );

        imageKeys.push(key);
      }
    }

    // =========================
    // CREATE PRODUCT
    // =========================

    const product = await Product.create({
      modelName: modelName.trim(),

      slug: normalizedSlug,

      application,

      description: description.trim(),

      images: imageKeys,

      seo: parsedSeo,

      sections: parsedSections,
    });

    // =========================
    // RESPONSE
    // =========================

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
export const getAllProducts = async (req, res) => {
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
export const getProductsByApplication = async (
  req,
  res
) => {
  try {
    const { applicationId } = req.params;

    // =========================
    // VALIDATE APPLICATION ID
    // =========================

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

    // =========================
    // CHECK APPLICATION
    // =========================

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

    // =========================
    // GET PRODUCTS
    // =========================

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
      message: "Failed to get products",
      error: error.message,
    });
  }
};

// =========================
// GET PRODUCT BY ID
// =========================
export const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;

    // =========================
    // VALIDATE PRODUCT ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // =========================
    // FIND PRODUCT
    // =========================

    const product = await Product.findById(productId).populate({
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

    // =========================
    // CONVERT PRODUCT TO OBJECT
    // =========================

    const productData = product.toObject();

    // =========================
    // CONVERT S3 KEYS
    // TO CLOUDFRONT URLS
    // =========================

    if (Array.isArray(productData.images)) {
      productData.images = productData.images.map((image) =>
        getCloudFrontUrl(image)
      );
    }

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({
      success: true,
      product: productData,
    });
  } catch (error) {
    console.error("Get product by ID error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get product",
      error: error.message,
    });
  }
};
// =========================
// GET PRODUCT BY SLUG
// =========================
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    // =========================
    // VALIDATE SLUG
    // =========================

    if (!slug || !slug.trim()) {
      return res.status(400).json({
        success: false,
        message: "Product slug is required",
      });
    }

    // =========================
    // FIND PRODUCT
    // =========================

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

    // =========================
    // CONVERT PRODUCT TO OBJECT
    // =========================

    const productData = product.toObject();

    // =========================
    // CONVERT S3 KEYS
    // TO CLOUDFRONT URLS
    // =========================

    if (Array.isArray(productData.images)) {
      productData.images = productData.images.map((image) =>
        getCloudFrontUrl(image)
      );
    }

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({
      success: true,
      product: productData,
    });
  } catch (error) {
    console.error("Get product by slug error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get product",
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
    const { productId } = req.params;

    const {
      modelName,
      slug,
      application,
      description,
      seo,
      sections,
    } = req.body;

    // =========================
    // VALIDATE PRODUCT ID
    // =========================

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

    // =========================
    // BASIC VALIDATION
    // =========================

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

    // =========================
    // FIND PRODUCT
    // =========================

    const product =
      await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =========================
    // VALIDATE APPLICATION
    // =========================

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

    // =========================
    // NORMALIZE VALUES
    // =========================

    const normalizedModelName =
      modelName.trim();

    const normalizedSlug =
      slug.trim().toLowerCase();

    // =========================
    // DUPLICATE MODEL NAME
    // =========================

    const duplicateModel =
      await Product.findOne({
        modelName: normalizedModelName,
        _id: { $ne: productId },
      });

    if (duplicateModel) {
      return res.status(409).json({
        success: false,
        message:
          "Product model already exists",
      });
    }

    // =========================
    // DUPLICATE SLUG
    // =========================

    const duplicateSlug =
      await Product.findOne({
        slug: normalizedSlug,
        _id: { $ne: productId },
      });

    if (duplicateSlug) {
      return res.status(409).json({
        success: false,
        message:
          "Product slug already exists",
      });
    }

    // =========================
    // PARSE SEO
    // =========================

    let parsedSeo = {};

    if (seo) {
      try {
        parsedSeo =
          typeof seo === "string"
            ? JSON.parse(seo)
            : seo;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid SEO data",
        });
      }
    }

    // =========================
    // PARSE SECTIONS
    // =========================

    let parsedSections = [];

    if (sections) {
      try {
        parsedSections =
          typeof sections === "string"
            ? JSON.parse(sections)
            : sections;
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Invalid sections data",
        });
      }
    }

    if (!Array.isArray(parsedSections)) {
      parsedSections = [];
    }

    // =========================
    // EXISTING IMAGES
    // =========================

    let imageKeys = Array.isArray(
      product.images
    )
      ? [...product.images]
      : [];

    // =========================
    // UPLOAD NEW IMAGES TO S3
    // =========================

    if (
      req.files &&
      req.files.length > 0
    ) {
      for (const file of req.files) {
        const safeOriginalName =
          file.originalname
            .replace(/\s+/g, "-")
            .replace(
              /[^a-zA-Z0-9._-]/g,
              ""
            );

        const fileName = `${normalizedSlug}-${Date.now()}-${safeOriginalName}`;

        const key = await uploadToS3(
          file.buffer,
          fileName,
          file.mimetype
        );

        imageKeys.push(key);
      }
    }

    // =========================
    // UPDATE PRODUCT
    // =========================

    product.modelName =
      normalizedModelName;

    product.slug =
      normalizedSlug;

    product.application =
      application;

    product.description =
      description.trim();

    product.images =
      imageKeys;

    product.seo =
      parsedSeo;

    product.sections =
      parsedSections;

    // =========================
    // SAVE
    // =========================

    const updatedProduct =
      await product.save();

    // =========================
    // RESPONSE
    // =========================

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
// DELETE PRODUCT IMAGE
// =========================
export const deleteProductImage = async (req, res) => {
  try {
    const { productId } = req.params;
    const { imageUrl } = req.body;

    // =========================
    // VALIDATE PRODUCT ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // =========================
    // VALIDATE IMAGE URL
    // =========================

    if (!imageUrl || typeof imageUrl !== "string") {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    // =========================
    // FIND PRODUCT
    // =========================

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =========================
    // CONVERT CLOUDFRONT URL
    // TO S3 KEY
    // =========================

    let imageKey;

    try {
      const url = new URL(imageUrl);

      imageKey = decodeURIComponent(
        url.pathname.replace(/^\/+/, "")
      );
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid image URL",
      });
    }

    // =========================
    // CHECK IMAGE EXISTS
    // =========================

    if (!product.images.includes(imageKey)) {
      return res.status(404).json({
        success: false,
        message: "Image not found in this product",
      });
    }

    // =========================
    // DELETE IMAGE FROM S3
    // =========================

    await deleteFromS3(imageKey);

    // =========================
    // REMOVE IMAGE FROM MONGODB
    // =========================

    product.images = product.images.filter(
      (image) => image !== imageKey
    );

    // =========================
    // SAVE PRODUCT
    // =========================

    const updatedProduct = await product.save();

    // =========================
    // RESPONSE
    // =========================

    const productData = updatedProduct.toObject();

    if (Array.isArray(productData.images)) {
      productData.images = productData.images.map(
        (image) => getCloudFrontUrl(image)
      );
    }

    res.status(200).json({
      success: true,
      message: "Product image deleted successfully",
      product: productData,
    });
  } catch (error) {
    console.error(
      "Delete product image error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete product image",
      error: error.message,
    });
  }
};

// =========================
// REPLACE PRODUCT IMAGE
// =========================

export const replaceProductImage = async (req, res) => {
  try {
    const { productId } = req.params;
    const { imageUrl } = req.body;

    // =========================
    // VALIDATE PRODUCT ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // =========================
    // VALIDATE OLD IMAGE URL
    // =========================

    if (!imageUrl || typeof imageUrl !== "string") {
      return res.status(400).json({
        success: false,
        message: "Existing image URL is required",
      });
    }

    // =========================
    // VALIDATE NEW IMAGE
    // =========================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "New image is required",
      });
    }

    // =========================
    // FIND PRODUCT
    // =========================

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =========================
    // CONVERT CLOUDFRONT URL
    // TO S3 KEY
    // =========================

    let oldImageKey;

    try {
      const url = new URL(imageUrl);

      oldImageKey = decodeURIComponent(
        url.pathname.replace(/^\/+/, "")
      );
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid image URL",
      });
    }

    // =========================
    // CHECK OLD IMAGE EXISTS
    // =========================

    if (!product.images.includes(oldImageKey)) {
      return res.status(404).json({
        success: false,
        message: "Image not found in this product",
      });
    }

    // =========================
    // CREATE SAFE FILE NAME
    // =========================

    const safeOriginalName = req.file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");

    const fileName = `${product.slug}-${Date.now()}-${safeOriginalName}`;

    // =========================
    // UPLOAD NEW IMAGE TO S3
    // =========================

    const newImageKey = await uploadToS3(
      req.file.buffer,
      fileName,
      req.file.mimetype
    );

    // =========================
    // DELETE OLD IMAGE FROM S3
    // =========================

    await deleteFromS3(oldImageKey);

    // =========================
    // REPLACE IMAGE KEY
    // =========================

    product.images = product.images.map((image) =>
      image === oldImageKey
        ? newImageKey
        : image
    );

    // =========================
    // SAVE PRODUCT
    // =========================

    const updatedProduct = await product.save();

    // =========================
    // CONVERT IMAGES
    // TO CLOUDFRONT URLS
    // =========================

    const productData = updatedProduct.toObject();

    if (Array.isArray(productData.images)) {
      productData.images = productData.images.map(
        (image) => getCloudFrontUrl(image)
      );
    }

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({
      success: true,
      message: "Product image replaced successfully",
      product: productData,
    });
  } catch (error) {
    console.error(
      "Replace product image error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to replace product image",
      error: error.message,
    });
  }
};
// =========================
// DELETE PRODUCT
// =========================

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // =========================
    // VALIDATE PRODUCT ID
    // =========================

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // =========================
    // FIND PRODUCT
    // =========================

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // =========================
    // DELETE IMAGES FROM S3
    // =========================

    if (Array.isArray(product.images) && product.images.length > 0) {
      for (const imageKey of product.images) {
        await deleteFromS3(imageKey);
      }
    }

    // =========================
    // DELETE PRODUCT FROM MONGODB
    // =========================

    await Product.findByIdAndDelete(productId);

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({
      success: true,
      message: "Product and all images deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};