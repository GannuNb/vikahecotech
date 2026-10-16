
import mongoose from "mongoose";
import QuotationApplication from "../models/quotationApplicationModel.js";
import QuotationCategory from "../models/quotationCategoryModel.js";

const generateSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Create quotation category
export const createQuotationCategory = async (req, res) => {
  try {
    const { name, application } = req.body;

    if (!name?.trim() || !application) {
      return res.status(400).json({
        success: false,
        message: "Category name and application are required",
      });
    }

    if (!mongoose.isValidObjectId(application)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation application ID",
      });
    }

    const quotationApplication =
      await QuotationApplication.findById(application);

    if (!quotationApplication) {
      return res.status(404).json({
        success: false,
        message: "Quotation application not found",
      });
    }

    const slug = generateSlug(name);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid category name",
      });
    }

    const duplicate = await QuotationCategory.findOne({
      application,
      slug,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "This category already exists for this application",
      });
    }

    const category = await QuotationCategory.create({
      name: name.trim(),
      slug,
      application,
    });

    return res.status(201).json({
      success: true,
      message: "Quotation category created successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This category already exists for this application",
      });
    }

    console.error("Create quotation category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create quotation category",
    });
  }
};

// Get categories, optionally filtered by application
export const getQuotationCategories = async (req, res) => {
  try {
    const { application } = req.query;

    const filter = {};

    if (application) {
      if (!mongoose.isValidObjectId(application)) {
        return res.status(400).json({
          success: false,
          message: "Invalid quotation application ID",
        });
      }

      filter.application = application;
    }

    const categories = await QuotationCategory.find(filter)
      .populate("application", "name slug")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get quotation categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation categories",
    });
  }
};

// Get one category
export const getQuotationCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation category ID",
      });
    }

    const category = await QuotationCategory.findById(id)
      .populate("application", "name slug");

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Quotation category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get quotation category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation category",
    });
  }
};

// Update category
export const updateQuotationCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, application, isActive } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation category ID",
      });
    }

    const category = await QuotationCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Quotation category not found",
      });
    }

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Category name cannot be empty",
        });
      }

      const trimmedName = name.trim();
      const slug = generateSlug(trimmedName);

      if (!slug) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid category name",
        });
      }

      category.name = trimmedName;
      category.slug = slug;
    }

    if (application !== undefined) {
      if (!mongoose.isValidObjectId(application)) {
        return res.status(400).json({
          success: false,
          message: "Invalid quotation application ID",
        });
      }

      const quotationApplication =
        await QuotationApplication.findById(application);

      if (!quotationApplication) {
        return res.status(404).json({
          success: false,
          message: "Quotation application not found",
        });
      }

      category.application = application;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be a boolean",
        });
      }

      category.isActive = isActive;
    }

    const duplicate = await QuotationCategory.findOne({
      _id: { $ne: id },
      application: category.application,
      slug: category.slug,
    });

    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "This category already exists for this application",
      });
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Quotation category updated successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This category already exists for this application",
      });
    }

    console.error("Update quotation category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update quotation category",
    });
  }
};

// Delete category
export const deleteQuotationCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation category ID",
      });
    }

    const category = await QuotationCategory.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Quotation category not found",
      });
    }

    await category.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Quotation category deleted successfully",
    });
  } catch (error) {
    console.error("Delete quotation category error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete quotation category",
    });
  }
};
