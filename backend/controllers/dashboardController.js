import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import Application from "../models/applicationModel.js";
import SpecificationRequest from "../models/specificationRequestModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalProducts,
      totalCategories,
      totalApplications,
      totalSpecificationRequests,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Application.countDocuments(),
      SpecificationRequest.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        totalProducts,
        totalCategories,
        totalApplications,
        totalSpecificationRequests,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};