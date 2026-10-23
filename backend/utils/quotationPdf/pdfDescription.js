
const drawDescription = (doc, selectedMachinery, currentY = 125, pageState = null) => {
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
  if (!Array.isArray(selectedMachinery) || selectedMachinery.length === 0) {
    return y;
  }
  selectedMachinery.forEach((item) => {
    const model = item.quotationModel || {};
    const category = item.category || {};
    const categoryName = category.name || "Machinery";
    const capacityName = item.capacityName || model.capacityName || "";
    const sectionTitle = capacityName
      ? `${categoryName} - ${capacityName}`
      : categoryName;
    const description = model.description?.trim() || "Description not available.";
    doc.font("Helvetica-Bold").fontSize(13);
    const titleHeight = doc.heightOfString(sectionTitle, { width: contentWidth });
    doc.font("Helvetica").fontSize(10);
    const descriptionHeight = doc.heightOfString(description, {
      width: contentWidth,
      lineGap: 4,
      align: "justify",
    });
    const sectionHeight = titleHeight + 12 + descriptionHeight + 20;
    ensureSpace(sectionHeight);
    doc.font("Helvetica-Bold").fontSize(13).fillColor("#3F5F9B");
    doc.text(sectionTitle, left, y, { width: contentWidth });
    y = doc.y + 12;
    doc.font("Helvetica").fontSize(10).fillColor(description === "Description not available." ? "#555555" : "#111111");
    doc.text(description, left, y, {
      width: contentWidth,
      align: "justify",
      lineGap: 4,
    });
    y = doc.y + 20;
  });
  doc.fillColor("#111111");
  return y;
};
export default drawDescription;
