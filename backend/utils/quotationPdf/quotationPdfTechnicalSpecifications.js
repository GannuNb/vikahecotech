
import {
  drawSectionTitle,
  sectionColors,
} from "./quotationPdfSection.js";

const quotationPdfTechnicalSpecifications = (
  doc,
  quotation,
  pageState,
  startY
) => {
  const left = pageState.left;
  const width = pageState.right - left;
  const labelWidth = width * 0.42;
  const valueWidth = width - labelWidth;

  let y = pageState.ensureAt(startY, 80);
  y = drawSectionTitle(doc, "Technical Specifications", left, y, width) + 8;

  const drawHeader = () => {
    const height = 25;

    doc.rect(left, y, width, height).fill("#E8F1F3");

    doc
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .fillColor(sectionColors.teal)
      .text("Specification", left + 8, y + 8, {
        width: labelWidth - 16,
      });

    doc.text("Value", left + labelWidth + 8, y + 8, {
      width: valueWidth - 16,
    });

    doc.rect(left, y, width, height)
      .lineWidth(0.5)
      .strokeColor("#D5E0E4")
      .stroke();

    y += height;
  };

  for (const section of quotation.technicalSpecifications || []) {
    const fields = section.fields || [];
    if (!fields.length) continue;

    y = pageState.ensureAt(y, 55);

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(sectionColors.teal)
      .text(section.title || "Specifications", left, y);

    y += 19;
    drawHeader();

    for (const field of fields) {
      const label = String(field.label || "-");
      const value = String(field.value || "-");

      doc.font("Helvetica").fontSize(8.5);

      const h1 = doc.heightOfString(label, { width: labelWidth - 16 });
      const h2 = doc.heightOfString(value, { width: valueWidth - 16 });
      const height = Math.max(h1, h2, 15) + 14;

      if (y + height > pageState.bottom) {
        y = pageState.startPage();
        drawSectionTitle(
          doc,
          "Technical Specifications (continued)",
          left,
          y,
          width
        );
        y += 52;
        drawHeader();
      }

      doc.rect(left, y, labelWidth, height).fill("#F1F5F7");
      doc.rect(left + labelWidth, y, valueWidth, height).fill("#FFFFFF");

      doc.rect(left, y, width, height)
        .lineWidth(0.5)
        .strokeColor("#D5E0E4")
        .stroke();

      doc
        .font("Helvetica")
        .fontSize(8.5)
        .fillColor(sectionColors.text)
        .text(label, left + 8, y + 7, {
          width: labelWidth - 16,
        });

      doc.text(value, left + labelWidth + 8, y + 7, {
        width: valueWidth - 16,
      });

      y += height;
    }

    y += 15;
  }

  return y + 8;
};

export default quotationPdfTechnicalSpecifications;
