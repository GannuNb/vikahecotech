
import { drawSectionTitle } from "./quotationPdfSection.js";

const quotationPdfSpecifications = (doc, quotation, pageState, startY) => {
  const left = pageState.left;
  const width = pageState.right - left;
  const specs = quotation.specifications || [];

  let y = pageState.ensureAt(startY, 80);

  y = drawSectionTitle(doc, "Plant Specifications", left, y, width) + 8;

  const labelWidth = width * 0.32;
  const valueWidth = width - labelWidth;

  for (const spec of specs) {
    const label = String(spec.label || "-");
    const value = String(spec.value || "-");

    doc.font("Helvetica").fontSize(9);

    const labelHeight = doc.heightOfString(label, {
      width: labelWidth - 20,
    });

    const valueHeight = doc.heightOfString(value, {
      width: valueWidth - 20,
    });

    const rowHeight = Math.max(labelHeight, valueHeight, 16) + 14;

    y = pageState.ensureAt(y, rowHeight);

    doc.rect(left, y, labelWidth, rowHeight).fill("#E8F0F2");
    doc.rect(left + labelWidth, y, valueWidth, rowHeight).fill("#FFFFFF");

    doc
      .rect(left, y, width, rowHeight)
      .lineWidth(0.5)
      .strokeColor("#D5E0E4")
      .stroke();

    doc
      .font("Helvetica-Bold")
      .fontSize(9)
      .fillColor("#172B3A")
      .text(label, left + 10, y + 7, { width: labelWidth - 20 });

    doc
      .font("Helvetica")
      .fontSize(9)
      .text(value, left + labelWidth + 10, y + 7, {
        width: valueWidth - 20,
      });

    y += rowHeight;
  }

  return y + 12;
};

export default quotationPdfSpecifications;
