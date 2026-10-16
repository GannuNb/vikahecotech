
import mongoose from "mongoose";
import QuotationApplication from "../models/quotationApplicationModel.js";

// Generate a URL-friendly slug from the application name
const generateSlug = (name) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

// Add a new quotation application
export const createQuotationApplication = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Application name is required",
      });
    }

    const trimmedName = name.trim();
    const slug = generateSlug(trimmedName);

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid application name",
      });
    }

    const existingApplication = await QuotationApplication.findOne({
      $or: [
        { name: { $regex: `^${trimmedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } },
        { slug },
      ],
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "This quotation application already exists",
      });
    }

    const application = await QuotationApplication.create({
      name: trimmedName,
      slug,
    });

    return res.status(201).json({
      success: true,
      message: "Quotation application created successfully",
      data: application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Application name or slug already exists",
      });
    }

    console.error("Create quotation application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create quotation application",
    });
  }
};

// Get all quotation applications
export const getQuotationApplications = async (req, res) => {
  try {
    const applications = await QuotationApplication.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Get quotation applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation applications",
    });
  }
};

// Get one quotation application by ID
export const getQuotationApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation application ID",
      });
    }

    const application = await QuotationApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Quotation application not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error("Get quotation application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation application",
    });
  }
};

// Update a quotation application
export const updateQuotationApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation application ID",
      });
    }

    const application = await QuotationApplication.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Quotation application not found",
      });
    }

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Application name cannot be empty",
        });
      }

      const trimmedName = name.trim();
      const slug = generateSlug(trimmedName);

      if (!slug) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid application name",
        });
      }

      const duplicate = await QuotationApplication.findOne({
        _id: { $ne: id },
        $or: [
          {
            name: {
              $regex: `^${trimmedName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
              $options: "i",
            },
          },
          { slug },
        ],
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Another quotation application already uses this name",
        });
      }

      application.name = trimmedName;
      application.slug = slug;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "isActive must be true or false",
        });
      }

      application.isActive = isActive;
    }

    await application.save();

    return res.status(200).json({
      success: true,
      message: "Quotation application updated successfully",
      data: application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Application name or slug already exists",
      });
    }

    console.error("Update quotation application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update quotation application",
    });
  }
};

// Delete a quotation application
export const deleteQuotationApplication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation application ID",
      });
    }

    const application = await QuotationApplication.findByIdAndDelete(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Quotation application not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quotation application deleted successfully",
    });
  } catch (error) {
    console.error("Delete quotation application error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete quotation application",
    });
  }
};
