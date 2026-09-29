import mongoose from "mongoose";

import SpecificationRequest from "../models/specificationRequestModel.js";

// =========================================
// GET ALL SPECIFICATION REQUESTS
// =========================================

const getAllSpecificationRequests = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search,
    } = req.query;

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 10, 1);

    const skip = (pageNumber - 1) * limitNumber;

    // -----------------------------------------
    // BUILD FILTER
    // -----------------------------------------

    const filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    if (search?.trim()) {
      const searchValue = search.trim();

      filter.$or = [
        {
          modelName: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          email: {
            $regex: searchValue,
            $options: "i",
          },
        },
        {
          phone: {
            $regex: searchValue,
            $options: "i",
          },
        },
      ];
    }

    // -----------------------------------------
    // FETCH DATA + COUNT
    // -----------------------------------------

    const [
      requests,
      totalRequests,
      requestedCount,
      processingCount,
      completedCount,
      failedCount,
    ] = await Promise.all([
      SpecificationRequest.find(filter)
        .populate({
          path: "product",
          select: "modelName slug",
          populate: {
            path: "application",
            select: "name",
            populate: {
              path: "category",
              select: "name",
            },
          },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),

      SpecificationRequest.countDocuments(filter),

      SpecificationRequest.countDocuments({
        status: "requested",
      }),

      SpecificationRequest.countDocuments({
        status: "processing",
      }),

      SpecificationRequest.countDocuments({
        status: "completed",
      }),

      SpecificationRequest.countDocuments({
        status: "failed",
      }),
    ]);

    // -----------------------------------------
    // RESPONSE
    // -----------------------------------------

    return res.status(200).json({
      success: true,

      requests,

      pagination: {
        currentPage: pageNumber,

        limit: limitNumber,

        totalRequests,

        totalPages:
          Math.ceil(totalRequests / limitNumber) || 1,
      },

      counts: {
        all:
          requestedCount +
          processingCount +
          completedCount +
          failedCount,

        requested: requestedCount,

        processing: processingCount,

        completed: completedCount,

        failed: failedCount,
      },
    });
  } catch (error) {
    console.error(
      "Get all specification requests error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch specification requests",
    });
  }
};

// =========================================
// GET SINGLE SPECIFICATION REQUEST
// =========================================

const getSpecificationRequestById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    // -----------------------------------------
    // VALIDATE ID
    // -----------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid specification request ID",
      });
    }

    // -----------------------------------------
    // FIND REQUEST
    // -----------------------------------------

    const request =
      await SpecificationRequest.findById(id)
        .populate({
          path: "product",
          populate: {
            path: "application",
            populate: {
              path: "category",
            },
          },
        });

    if (!request) {
      return res.status(404).json({
        success: false,
        message:
          "Specification request not found",
      });
    }

    // -----------------------------------------
    // RESPONSE
    // -----------------------------------------

    return res.status(200).json({
      success: true,
      request,
    });
  } catch (error) {
    console.error(
      "Get specification request by ID error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch specification request",
    });
  }
};

// =========================================
// UPDATE SPECIFICATION REQUEST STATUS
// =========================================

const updateSpecificationRequestStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const { status } = req.body;

    // -----------------------------------------
    // VALIDATE ID
    // -----------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid specification request ID",
      });
    }

    // -----------------------------------------
    // VALIDATE STATUS
    // -----------------------------------------

    const allowedStatuses = [
      "requested",
      "processing",
      "completed",
      "failed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid specification request status",
      });
    }

    // -----------------------------------------
    // UPDATE
    // -----------------------------------------

    const request =
      await SpecificationRequest.findByIdAndUpdate(
        id,
        {
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate({
        path: "product",
        populate: {
          path: "application",
          populate: {
            path: "category",
          },
        },
      });

    if (!request) {
      return res.status(404).json({
        success: false,
        message:
          "Specification request not found",
      });
    }

    // -----------------------------------------
    // RESPONSE
    // -----------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "Specification request status updated successfully",

      request,
    });
  } catch (error) {
    console.error(
      "Update specification request status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update specification request status",
    });
  }
};

// =========================================
// EXPORT
// =========================================

export {
  getAllSpecificationRequests,
  getSpecificationRequestById,
  updateSpecificationRequestStatus,
};