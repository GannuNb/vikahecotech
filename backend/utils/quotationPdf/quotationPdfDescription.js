
import { drawSectionTitle } from "./quotationPdfSection.js";

const quotationPdfDescription = (doc, quotation, pageState, startY) => {
  const left = pageState.left;
  const width = pageState.right - left;
  const description = quotation.information?.description || "-";

  doc.font("Helvetica").fontSize(9);

  const textHeight = doc.heightOfString(description, {
    width: width - 24,
    lineGap: 2,
  });

  let y = pageState.ensureAt(startY, 48 + textHeight + 12);

  y = drawSectionTitle(doc, "Description", left, y, width) + 8;

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor("#172B3A")
    .text(description, left + 12, y, {
      width: width - 24,
      lineGap: 2,
    });

  return y + textHeight + 14;
};

export default quotationPdfDescription;
