import Enquiry from "../models/enquiryModel.js";

import {
  sendCustomerEmail,
  sendAdminEmail,
} from "../utils/enquiry/mailer.js";

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

    // Basic validation
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

    // Save enquiry to MongoDB
    const enquiry = await Enquiry.create({
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
    });

    // Convert Mongoose document to normal object
    const enquiryData = enquiry.toObject();

    // Send email to customer
    await sendCustomerEmail(enquiryData);

    // Send email to admin/support
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