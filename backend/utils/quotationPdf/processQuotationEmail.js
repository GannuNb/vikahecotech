
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

import QuotationRequest from "../../models/quotationRequestModel.js";
import generateQuotationPdf from "./generateQuotationPdf.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templatePath = path.join(
  __dirname,
  "../../templates/emails/quotationRequest.ejs"
);

const logoPath = path.join(
  __dirname,
  "../../assets/logo_vk.png"
);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const processQuotationEmail = async (quotationRequestId) => {
  try {
    console.log(
      "Quotation email processing started:",
      quotationRequestId
    );

    const quotationRequest = await QuotationRequest.findById(
      quotationRequestId
    )
      .populate({
        path: "application",
        select: "name slug",
      })
      .populate({
        path: "selectedMachinery.category",
        select: "name slug application",
      })
      .populate({
        path: "selectedMachinery.quotationModel",
        populate: {
          path: "category",
          select: "name slug application",
        },
      });

    if (!quotationRequest) {
      throw new Error("Quotation request was not found.");
    }

    if (
      !quotationRequest.customer ||
      !quotationRequest.customer.email
    ) {
      throw new Error("Customer email address is missing.");
    }

    if (
      !Array.isArray(quotationRequest.selectedMachinery) ||
      quotationRequest.selectedMachinery.length === 0
    ) {
      throw new Error("No machinery was selected for this quotation.");
    }

    await QuotationRequest.findByIdAndUpdate(
      quotationRequestId,
      {
        requestStatus: "processing",
        emailStatus: "pending",
        emailError: "",
      }
    );

    // Generate the quotation PDF.
    console.time(`QUOTATION PDF ${quotationRequestId}`);


    const pdfRequest = {
      ...quotationRequest.toObject(),
      selectedMachinery: quotationRequest.selectedMachinery.map((item) => ({
        ...item.toObject(),
        connectingEquipment: item.connectingEquipment === "with" ? "with" : "without",
      })),
    };

    const { pdfBuffer, fileName } =
      await generateQuotationPdf(pdfRequest);


    console.timeEnd(`QUOTATION PDF ${quotationRequestId}`);

    if (!Buffer.isBuffer(pdfBuffer) || pdfBuffer.length === 0) {
      throw new Error("Quotation PDF generation returned an empty file.");
    }

    await QuotationRequest.findByIdAndUpdate(
      quotationRequestId,
      {
        pdfGeneratedAt: new Date(),
      }
    );

    console.log(
      "Quotation PDF generated:",
      fileName,
      `${(pdfBuffer.length / 1024).toFixed(2)} KB`
    );

    // Prepare machinery names for the email template.
    const machineryNames = quotationRequest.selectedMachinery.map(
      (item) => {
        const model = item.quotationModel;

        const categoryName =
          item.category?.name ||
          model?.category?.name ||
          "Machinery";

        const capacityName =
          item.capacityName || model?.capacityName || "";

        return `${categoryName} - ${capacityName}`.trim();
      }
    );

    // Render the quotation email using EJS.
    console.time(`QUOTATION EJS ${quotationRequestId}`);

    const emailHtml = await ejs.renderFile(templatePath, {
      customerName: quotationRequest.customer.name,
      quotationNumber: quotationRequest.quotationNumber,
      companyName: quotationRequest.customer.company,
      applicationName:
        quotationRequest.application?.name || "Industrial Equipment",
      machineryNames,
    });

    console.timeEnd(`QUOTATION EJS ${quotationRequestId}`);

    // Send the email with the quotation PDF attached.
    console.time(`QUOTATION EMAIL ${quotationRequestId}`);

    const emailResult = await transporter.sendMail({
      from: `"Vikah Ecotech" <${process.env.SMTP_USER}>`,
      to: quotationRequest.customer.email,
      subject: `Quotation ${quotationRequest.quotationNumber} - Vikah Ecotech`,
      html: emailHtml,
      attachments: [
        {
          filename: "logo_vk.png",
          path: logoPath,
          cid: "vikah-logo",
        },
        {
          filename: fileName,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    console.timeEnd(`QUOTATION EMAIL ${quotationRequestId}`);

    console.log(
      "Quotation email accepted by mail server:",
      emailResult.messageId
    );

    // Update status only after Nodemailer accepts the message.
    await QuotationRequest.findByIdAndUpdate(
      quotationRequestId,
      {
        emailStatus: "sent",
        emailSentAt: new Date(),
        emailError: "",
        requestStatus: "completed",
      }
    );

    console.log(
      "Quotation email processing completed:",
      quotationRequestId,
      quotationRequest.customer.email
    );
  } catch (error) {
    console.error(
      "Quotation email processing failed:",
      quotationRequestId,
      error
    );

    // Preserve processing status if PDF generation succeeded but email failed.
    await QuotationRequest.findByIdAndUpdate(
      quotationRequestId,
      {
        emailStatus: "failed",
        emailError: String(error.message || error).slice(0, 2000),
      }
    ).catch((updateError) => {
      console.error(
        "Failed to update quotation email status:",
        updateError
      );
    });
  }
};

export default processQuotationEmail;
