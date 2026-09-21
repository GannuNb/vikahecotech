import Application from "../models/applicationModel.js";
import Category from "../models/categoryModel.js";

// CREATE APPLICATION
export const createApplication = async (req, res) => {
  try {
    const { category, name } = req.body;

    if (!category || !name) {
      return res.status(400).json({
        success: false,
        message: "Category and application name are required",
      });
    }

    // Check category exists
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check duplicate application inside same category
    const existingApplication = await Application.findOne({
      category,
      name: name.trim(),
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "Application already exists in this category",
      });
    }

    const application = await Application.create({
      category,
      name: name.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Application created successfully",
      application,
    });
  } catch (error) {
    console.error("Create application error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create application",
      error: error.message,
    });
  }
};

// GET ALL APPLICATIONS
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("category", "name")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get applications",
      error: error.message,
    });
  }
};

// GET APPLICATIONS BY CATEGORY
export const getApplicationsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check category exists
    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const applications = await Application.find({
      category: categoryId,
    }).sort({ name: 1 });

    res.status(200).json({
      success: true,
      category,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get applications by category error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get applications",
      error: error.message,
    });
  }
};

// GET APPLICATION BY ID
export const getApplicationById = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId).populate(
      "category",
      "name"
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error("Get application error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get application",
      error: error.message,
    });
  }
};

// UPDATE APPLICATION
export const updateApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Application name is required",
      });
    }

    const application = await Application.findById(
      applicationId
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    const duplicateApplication =
      await Application.findOne({
        category: application.category,
        name: name.trim(),
        _id: { $ne: applicationId },
      });

    if (duplicateApplication) {
      return res.status(409).json({
        success: false,
        message: "Application already exists in this category",
      });
    }

    application.name = name.trim();

    const updatedApplication =
      await application.save();

    res.status(200).json({
      success: true,
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error(
      "Update application error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update application",
      error: error.message,
    });
  }
};

// DELETE APPLICATION
export const deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(
      applicationId
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    await Application.findByIdAndDelete(
      applicationId
    );

    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete application error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete application",
      error: error.message,
    });
  }
};