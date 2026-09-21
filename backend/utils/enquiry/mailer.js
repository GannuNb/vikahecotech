import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const templatesPath = path.join(
  __dirname,
  "../../templates/emails"
);

// Send enquiry confirmation to customer
export const sendCustomerEmail = async (enquiry) => {
  const html = await ejs.renderFile(
    path.join(templatesPath, "customer-enquiry.ejs"),
    enquiry
  );

  await transporter.sendMail({
    from: `"Vikah Ecotech" <${process.env.SMTP_USER}>`,
    to: enquiry.email,
    subject: "Thank you for your enquiry - Vikah Ecotech",
    html,
  });
};

// Send enquiry notification to admin
export const sendAdminEmail = async (enquiry) => {
  const html = await ejs.renderFile(
    path.join(templatesPath, "admin-enquiry.ejs"),
    enquiry
  );

  await transporter.sendMail({
    from: `"Vikah Ecotech Website" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: enquiry.email,
    subject: `New Enquiry - ${enquiry.machinery} - ${enquiry.application}`,
    html,
  });
};

export default transporter;