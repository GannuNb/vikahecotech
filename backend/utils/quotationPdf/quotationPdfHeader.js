
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.resolve(
  __dirname,
  "../../assets/logo_vk.png"
);

const quotationPdfHeader = (doc, quotation, quotationRequest) => {
  const left = 45;
  const right = doc.page.width - 45;
  const width = right - left;

  doc.rect(0, 0, doc.page.width, 102).fill("#FFFFFF");

  doc.image(logoPath, left, 17, {
    fit: [220, 62],
    align: "left",
    valign: "center",
  });

  const metaWidth = 125;
const metaX = right - metaWidth;

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#52636B")
    .text("Quotation No.", metaX, 28, {
      width: metaWidth,
    });

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#0F4C5C")
    .text(quotationRequest.quotationNumber || "-", metaX, 43, {
      width: metaWidth,
    });

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#52636B")
    .text("Quotation Date", metaX, 62, {
      width: metaWidth,
    });

  const date = quotation.quotationDate
    ? new Date(quotation.quotationDate).toLocaleDateString("en-IN")
    : new Date().toLocaleDateString("en-IN");

  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor("#0F4C5C")
    .text(date, metaX, 76, {
      width: metaWidth,
    });

  doc
    .moveTo(left, 100)
    .lineTo(right, 100)
    .lineWidth(1)
    .strokeColor("#D5E0E4")
    .stroke();

  doc
    .moveTo(left, 100)
    .lineTo(left + 130, 100)
    .lineWidth(2)
    .strokeColor("#3F8F5A")
    .stroke();

  doc.fillColor("#111111");

  return doc;
};

export default quotationPdfHeader;
