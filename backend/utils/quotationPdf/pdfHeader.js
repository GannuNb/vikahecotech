
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.resolve(
  __dirname,
  "../../assets/logo_vk.png"
);

const drawQuotationPdfHeader = (doc, quotationRequest, pageNumber = 1) => {
  const pageWidth = doc.page.width;
  const left = 45;
  const right = pageWidth - 45;
  const quotationNumber = quotationRequest?.quotationNumber || "Pending";

  doc.rect(0, 0, pageWidth, 3).fill("#E5E7EB");

  doc.image(logoPath, left, 20, {
    fit: [180, 60],
    align: "left",
    valign: "center",
  });

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor("#111827")
    .text("QUOTATION", 340, 35, {
      width: right - 340,
      align: "right",
    });

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#374151")
    .text(quotationNumber, 300, 55, {
      width: right - 300,
      align: "right",
    });

  doc
    .moveTo(left, 100)
    .lineTo(right, 100)
    .lineWidth(0.8)
    .strokeColor("#D1D5DB")
    .stroke();

  doc
    .moveTo(left, 100)
    .lineTo(left + 150, 100)
    .lineWidth(2.5)
    .strokeColor("#3F8F5A")
    .stroke();

  doc.fillColor("#111111");

  return pageNumber;
};

export default drawQuotationPdfHeader;
