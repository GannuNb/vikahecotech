
import Enquiry from "../models/enquiryModel.js";
import {
  sendCustomerEmail,
  sendAdminEmail,
} from "../utils/enquiry/mailer.js";

const machineryLabelMap = {
  baler: "Baler",
  shredder: "Primary Shredder",
  "secondary-shredder": "Secondary Shredder",
  "other-equipment": "Other Equipment",
};

export const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      company,
      machinery,
      application,
      email,
      website,
      phone,
      address,
      city,
      country,
      message,
    } = req.body;

    if (
      !name ||
      !machinery ||
      !application ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const machineryName =
      machineryLabelMap[machinery.toLowerCase()] || machinery;

    const enquiry = await Enquiry.create({
      name,
      company,
      machinery: machineryName,
      application,
      email,
      website,
      phone,
      address,
      city,
      country,
      message,
    });

    const enquiryData = enquiry.toObject();

    await sendCustomerEmail(enquiryData);
    await sendAdminEmail(enquiryData);

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiry: enquiryData,
    });
  } catch (error) {
    console.error("Create enquiry error:", error);

    return res.status(500).json({
      success: false,
      message: "Enquiry was saved, but email sending failed.",
    });
  }
};




export const getAllEnquiries = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const [enquiries, totalEnquiries] = await Promise.all([
      Enquiry.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      enquiries,
      pagination: {
        totalEnquiries,
        totalPages: Math.ceil(totalEnquiries / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Get all enquiries error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries.",
    });
  }
};

export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["new", "contacted", "closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status.",
      });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully.",
      enquiry,
    });
  } catch (error) {
    console.error("Update enquiry status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update enquiry status.",
    });
  }
};

