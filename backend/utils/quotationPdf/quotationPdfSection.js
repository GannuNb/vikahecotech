
const COLORS = {
  teal: "#0F4C5C",
  green: "#238451",
  text: "#172B3A",
  label: "#52636B",
  border: "#D5E0E4",
  panel: "#F1F7F6",
  white: "#FFFFFF",
};

export const drawSectionTitle = (doc, title, x, y, width) => {
  const lowerTitle = title.toLowerCase();
  const bannerWidth = Math.min(300, width * 0.65);

  doc.roundedRect(x, y, width, 34, 6).fill(COLORS.panel);
  doc.roundedRect(x, y, 34, 34, 6).fill(COLORS.green);
  doc.rect(x + 25, y, 9, 34).fill(COLORS.green);

  doc
    .moveTo(x + 34, y)
    .lineTo(x + bannerWidth, y)
    .lineTo(x + bannerWidth - 16, y + 34)
    .lineTo(x + 34, y + 34)
    .closePath()
    .fill(COLORS.teal);

  // Draw a simple white icon based on the section title.
  const cx = x + 17;
  const cy = y + 17;

  doc.save();
  doc.strokeColor(COLORS.white).fillColor(COLORS.white).lineWidth(1.4);

  if (lowerTitle.includes("customer")) {
    doc.circle(cx, cy - 4, 4).fill();
    doc.roundedRect(cx - 7, cy + 2, 14, 8, 3).fill();
  } else if (lowerTitle.includes("pricing")) {
    doc.font("Helvetica-Bold").fontSize(15)
      .text("$", x + 10, y + 7, { width: 14, align: "center" });
  } else if (
    lowerTitle.includes("technical") ||
    lowerTitle.includes("specification")
  ) {
    doc.roundedRect(cx - 7, cy - 8, 14, 16, 2).stroke();
    doc.moveTo(cx - 4, cy - 3).lineTo(cx + 4, cy - 3).stroke();
    doc.moveTo(cx - 4, cy + 2).lineTo(cx + 4, cy + 2).stroke();
  } else if (lowerTitle.includes("image")) {
    doc.rect(cx - 8, cy - 6, 16, 12).stroke();
    doc.circle(cx + 3, cy - 2, 2).fill();
    doc.moveTo(cx - 6, cy + 4).lineTo(cx - 1, cy - 1)
      .lineTo(cx + 2, cy + 2).lineTo(cx + 6, cy - 3).stroke();
  } else if (lowerTitle.includes("summary")) {
    doc.rect(cx - 7, cy - 7, 4, 14).fill();
    doc.rect(cx - 1, cy - 3, 4, 10).fill();
    doc.rect(cx + 5, cy - 9, 3, 16).fill();
  } else {
    doc.roundedRect(cx - 7, cy - 8, 14, 16, 2).stroke();
    doc.moveTo(cx - 4, cy - 2).lineTo(cx + 4, cy - 2).stroke();
    doc.moveTo(cx - 4, cy + 3).lineTo(cx + 4, cy + 3).stroke();
  }

  doc.restore();

  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .fillColor(COLORS.white)
    .text(title, x + 45, y + 11, {
      width: bannerWidth - 55,
      lineBreak: false,
    });

  doc.fillColor(COLORS.text);

  return y + 44;
};

export const drawKeyValue = (
  doc, label, value, x, y, labelWidth, valueWidth
) => {
  const safeValue =
    value === undefined || value === null || value === ""
      ? "-"
      : String(value);

  doc.font("Helvetica").fontSize(9);
  const labelHeight = doc.heightOfString(String(label || ""), {
    width: labelWidth,
  });

  doc.font("Helvetica-Bold").fontSize(9);
  const valueHeight = doc.heightOfString(safeValue, {
    width: valueWidth,
  });

  doc.font("Helvetica").fontSize(9).fillColor(COLORS.label)
    .text(String(label || ""), x, y, { width: labelWidth });

  doc.font("Helvetica-Bold").fontSize(9).fillColor(COLORS.text)
    .text(safeValue, x + labelWidth, y, { width: valueWidth });

  return Math.max(labelHeight, valueHeight, 12);
};

export const drawDivider = (doc, x1, y, x2) => {
  doc.moveTo(x1, y).lineTo(x2, y)
    .lineWidth(0.5).strokeColor(COLORS.border).stroke();
};

export const sectionColors = COLORS;
