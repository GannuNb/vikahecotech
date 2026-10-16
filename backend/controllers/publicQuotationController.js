
import QuotationApplication from "../models/quotationApplicationModel.js";
import QuotationCategory from "../models/quotationCategoryModel.js";
import QuotationModel from "../models/quotationModel.js";

export const getPublicQuotationApplications = async (req, res) => {
  try {
    const applications = await QuotationApplication.find({
      isActive: true,
    })
      .select("_id name slug")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error("Get public quotation applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation applications.",
    });
  }
};

export const getPublicQuotationCategories = async (req, res) => {
  try {
    const { application } = req.query;

    if (!application) {
      return res.status(400).json({
        success: false,
        message: "Application ID is required.",
      });
    }

    if (!/^[a-f\d]{24}$/i.test(application)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const applicationDoc = await QuotationApplication.findOne({
      _id: application,
      isActive: true,
    }).select("_id");

    if (!applicationDoc) {
      return res.status(404).json({
        success: false,
        message: "Application not found or inactive.",
      });
    }

    const categories = await QuotationCategory.find({
      application: applicationDoc._id,
      isActive: true,
    })
      .select("_id name slug application")
      .sort({ name: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.error("Get public quotation categories error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation categories.",
    });
  }
};


export const getPublicQuotationModels = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required.",
      });
    }

    if (!/^[a-f\d]{24}$/i.test(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID.",
      });
    }

    const categoryDoc = await QuotationCategory.findOne({
      _id: category,
      isActive: true,
    })
      .populate({
        path: "application",
        select: "_id isActive",
      })
      .lean();

    if (!categoryDoc || !categoryDoc.application?.isActive) {
      return res.status(404).json({
        success: false,
        message: "Category not found or inactive.",
      });
    }

    const models = await QuotationModel.find({
      category: categoryDoc._id,
      isActive: true,
    })
      .select("_id category capacityName quantity connectingEquipment")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: models.length,
      data: models,
    });
  } catch (error) {
    console.error("Get public quotation models error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch quotation machinery.",
    });
  }
};

