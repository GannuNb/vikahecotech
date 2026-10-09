
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import transporter from "../enquiry/mailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to email template and company logo
const templatesPath = path.join(
  __dirname,
  "../../templates/emails"
);

const logoPath = path.join(
  __dirname,
  "../../assets/logo_vk.png"
);

const sendQuotationEmail = async ({
  quotation,
  quotationRequest,
  pdfBuffer,
}) => {
  if (!quotation || !quotationRequest || !pdfBuffer) {
    throw new Error(
      "Quotation, quotation request, and PDF buffer are required."
    );
  }

  const quotationDate = quotation.quotationDate
    ? new Date(quotation.quotationDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  const html = await ejs.renderFile(
    path.join(templatesPath, "quotationRequest.ejs"),
    {
      customerName: quotationRequest.customerName,
      quotationNumber: quotationRequest.quotationNumber,
      quotationName: quotation.quotationName || "-",
      subject: quotation.subject || "-",
      quotationDate,
    }
  );

  const safeQuotationNumber = String(
    quotationRequest.quotationNumber
  ).replace(/[^a-zA-Z0-9_-]/g, "_");

  await transporter.sendMail({
    from: `"Vikah Ecotech" <${process.env.SMTP_USER}>`,
    to: quotationRequest.email,
    subject: `Your Quotation ${quotationRequest.quotationNumber} - Vikah Ecotech`,
    html,

    attachments: [
      {
        filename: "vikah-logo.png",
        path: logoPath,
        cid: "vikah-logo",
      },
      {
        filename: `${safeQuotationNumber}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
};

export default sendQuotationEmail;
