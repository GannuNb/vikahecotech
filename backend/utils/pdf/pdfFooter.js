import path from "path";
import { fileURLToPath } from "url";

import { formatDate } from "./pdfHelpers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const drawPdfFooter = (doc, pageNumber) => {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  const left = 45;
  const right = pageWidth - 45;

  const lineY = pageHeight - 58;
  const textY = pageHeight - 47;

  const leafPath = path.join(
    __dirname,
    "../../assets/leaf.png"
  );

  const mutedColor = "#111111";

  // Horizontal line
  doc
    .moveTo(left, lineY)
    .lineTo(right, lineY)
    .lineWidth(0.7)
    .strokeColor("#D9E2E6")
    .stroke();

  // Green accent line
  doc
    .moveTo(left, lineY)
    .lineTo(left + 160, lineY)
    .lineWidth(2)
    .strokeColor("#3F8F5A")
    .stroke();

  // Leaf logo
  doc.image(
    leafPath,
    left + 45,
    pageHeight - 53,
    {
      fit: [55, 42],
      align: "center",
      valign: "center",
    }
  );

  // Date
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(mutedColor)
    .text(
      formatDate(),
      pageWidth / 2 - 50,
      textY,
      {
        width: 100,
        align: "center",
      }
    );

  // Page number
  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(mutedColor)
    .text(
      `Page ${pageNumber}`,
      pageWidth - 145,
      textY,
      {
        width: 100,
        align: "right",
      }
    );

  doc.fillColor("#111111");
};

export default drawPdfFooter;