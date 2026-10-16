
const drawTechnicalSpecifications = (
  doc,
  selectedMachinery,
  currentY = 125,
  pageState = null
) => {
  const left = 50;
  const contentWidth = doc.page.width - 100;
  const ensureSpace = (requiredHeight) => {
    if (currentY + requiredHeight > doc.page.height - 55) {
      if (pageState?.startNewPage) {
        pageState.startNewPage();
        currentY = pageState.getContentStartY
          ? pageState.getContentStartY()
          : 125;
      } else {
        doc.addPage();
        currentY = 125;
      }
    }
  };
  const drawRow = (label, value, header = false) => {
    const padding = 7;
    const labelWidth = contentWidth * 0.35;
    const valueWidth = contentWidth - labelWidth;
    doc.font(header ? "Helvetica-Bold" : "Helvetica").fontSize(9);
    const labelHeight = doc.heightOfString(String(label), {
      width: labelWidth - padding * 2,
    });
    const valueHeight = doc.heightOfString(String(value), {
      width: valueWidth - padding * 2,
    });
    const rowHeight = Math.max(
      header ? 30 : 28,
      Math.max(labelHeight, valueHeight) + padding * 2
    );
    ensureSpace(rowHeight);
    if (header) {
      doc.save();
      doc.fillColor("#EAF0F8")
        .rect(left, currentY, contentWidth, rowHeight)
        .fill();
      doc.restore();
    }
    doc.save();
    doc.lineWidth(0.5).strokeColor("#B8C2CC");
    doc.rect(left, currentY, labelWidth, rowHeight).stroke();
    doc.rect(left + labelWidth, currentY, valueWidth, rowHeight).stroke();
    doc.fillColor("#111111");
    doc.font(header ? "Helvetica-Bold" : "Helvetica").fontSize(9);
    doc.text(String(label), left + padding, currentY + padding, {
      width: labelWidth - padding * 2,
      height: rowHeight - padding * 2,
    });
    doc.text(String(value), left + labelWidth + padding, currentY + padding, {
      width: valueWidth - padding * 2,
      height: rowHeight - padding * 2,
    });
    doc.restore();
    currentY += rowHeight;
  };
  if (!Array.isArray(selectedMachinery) || selectedMachinery.length === 0) {
    return currentY;
  }
  let hasSpecifications = false;
  selectedMachinery.forEach((item) => {
    const model = item.quotationModel || {};
    const category = item.category || {};
    const specifications = Array.isArray(model.technicalSpecifications)
      ? model.technicalSpecifications
      : [];
    if (specifications.length === 0) {
      return;
    }
    hasSpecifications = true;
    ensureSpace(70);
    const capacityName = item.capacityName || model.capacityName || "";
    const title = capacityName
      ? `${category.name || "Machinery"} - ${capacityName}`
      : category.name || "Machinery";
    doc.font("Helvetica-Bold").fontSize(12).fillColor("#3F5F9B");
    doc.text(title, left, currentY, { width: contentWidth });
    currentY = doc.y + 8;
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111");
    doc.text("Technical Specifications", left, currentY);
    currentY = doc.y + 8;
    drawRow("Specification", "Details", true);
    specifications.forEach((specification) => {
      drawRow(
        specification.label || "-",
        specification.value || "-"
      );
    });
    currentY += 18;
  });
  if (!hasSpecifications) {
    return currentY;
  }
  doc.fillColor("#111111");
  return currentY;
};

export default drawTechnicalSpecifications;
