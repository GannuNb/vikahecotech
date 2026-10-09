
import {
  drawSectionTitle,
  sectionColors,
} from "./quotationPdfSection.js";

const quotationPdfBuyerScope = (doc, quotation, pageState, startY) => {
  const left = pageState.left;
  const width = pageState.right - left;
  const items = quotation.buyerScope || [];
  let y = startY;

  if (!items.length) return y;

  y = pageState.ensureAt(y, 65);
  y = drawSectionTitle(doc, "Buyer's Scope", left, y, width) + 10;

  for (const item of items) {
    const heading = String(item.label || "Scope Item");
    const description = String(item.value || "-");

    doc.font("Helvetica-Bold").fontSize(9.5);
    const h1 = doc.heightOfString(heading, { width: width - 20 });

    doc.font("Helvetica").fontSize(9);
    const h2 = doc.heightOfString(description, {
      width: width - 20,
      lineGap: 2,
    });

    if (y + h1 + h2 + 20 > pageState.bottom) {
      y = pageState.startPage();
      y = drawSectionTitle(
        doc,
        "Buyer's Scope (continued)",
        left,
        y,
        width
      ) + 10;
    }

    doc
      .font("Helvetica-Bold")
      .fontSize(9.5)
      .fillColor(sectionColors.teal)
      .text(heading, left + 10, y, { width: width - 20 });

    y += h1 + 4;

    doc
      .font("Helvetica")
      .fontSize(9)
      .fillColor(sectionColors.text)
      .text(description, left + 10, y, {
        width: width - 20,
        lineGap: 2,
      });

    y += h2 + 15;
  }

  return y + 8;
};

export default quotationPdfBuyerScope;
