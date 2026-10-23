
const drawTechnicalSpecifications = (doc, selectedMachinery, currentY = 125, pageState = null) => {
  const left = 50;
  const contentWidth = doc.page.width - 100;
  const bottomMargin = 55;
  const defaultContentStartY = 125;
  let y = currentY;
  const startNewPage = () => {
    if (pageState?.startNewPage) {
      pageState.startNewPage();
      y = pageState.getContentStartY
        ? pageState.getContentStartY()
        : defaultContentStartY;
    } else {
      doc.addPage();
      y = defaultContentStartY;
    }
  };
  const ensureSpace = (requiredHeight) => {
    const availableHeight = doc.page.height - bottomMargin - (pageState?.getContentStartY ? pageState.getContentStartY() : defaultContentStartY);
    if (requiredHeight <= availableHeight && y + requiredHeight > doc.page.height - bottomMargin) {
      startNewPage();
    }
  };
  const getRowHeight = (label, value, header = false) => {
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
    return Math.max(header ? 30 : 28, Math.max(labelHeight, valueHeight) + padding * 2);
  };
  const drawRow = (label, value, header = false) => {
    const padding = 7;
    const labelWidth = contentWidth * 0.35;
    const valueWidth = contentWidth - labelWidth;
    const rowHeight = getRowHeight(label, value, header);
    ensureSpace(rowHeight);
    if (header) {
      doc.save();
      doc.fillColor("#EAF0F8").rect(left, y, contentWidth, rowHeight).fill();
      doc.restore();
    }
    doc.save();
    doc.lineWidth(0.5).strokeColor("#B8C2CC");
    doc.rect(left, y, labelWidth, rowHeight).stroke();
    doc.rect(left + labelWidth, y, valueWidth, rowHeight).stroke();
    doc.fillColor("#111111");
    doc.font(header ? "Helvetica-Bold" : "Helvetica").fontSize(9);
    doc.text(String(label), left + padding, y + padding, {
      width: labelWidth - padding * 2,
      height: rowHeight - padding * 2,
    });
    doc.text(String(value), left + labelWidth + padding, y + padding, {
      width: valueWidth - padding * 2,
      height: rowHeight - padding * 2,
    });
    doc.restore();
    y += rowHeight;
  };
  if (!Array.isArray(selectedMachinery) || selectedMachinery.length === 0) {
    return y;
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
    const capacityName = item.capacityName || model.capacityName || "";
    const title = capacityName
      ? `${category.name || "Machinery"} - ${capacityName}`
      : category.name || "Machinery";
    doc.font("Helvetica-Bold").fontSize(12);
    const titleHeight = doc.heightOfString(title, { width: contentWidth });
    const headerHeight = getRowHeight("Specification", "Details", true);
    const firstSpec = specifications[0];
    const firstRowHeight = getRowHeight(
      firstSpec.label || "-",
      firstSpec.value || "-"
    );
    ensureSpace(titleHeight + 8 + 8 + headerHeight + firstRowHeight + 18);
    doc.font("Helvetica-Bold").fontSize(12).fillColor("#3F5F9B");
    doc.text(title, left, y, { width: contentWidth });
    y = doc.y + 8;
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111");
    doc.text("Technical Specifications", left, y);
    y = doc.y + 8;
    drawRow("Specification", "Details", true);
    specifications.forEach((specification) => {
      drawRow(specification.label || "-", specification.value || "-");
    });
    y += 18;
  });
  if (!hasSpecifications) {
    return y;
  }
  doc.fillColor("#111111");
  return y;
};
export default drawTechnicalSpecifications;
