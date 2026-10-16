
const drawDescription = (doc, selectedMachinery, currentY = 125) => {
  const left = 50;
  const contentWidth = doc.page.width - 100;
  let y = currentY;

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

    // MACHINERY SECTION TITLE
    doc
      .font("Helvetica-Bold")
      .fontSize(13)
      .fillColor("#3F5F9B")
      .text(sectionTitle, left, y, {
        width: contentWidth,
      });

    y = doc.y + 12;

    // MACHINERY DESCRIPTION
    const description = model.description?.trim();

    if (description) {
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#111111")
        .text(description, left, y, {
          width: contentWidth,
          align: "justify",
          lineGap: 4,
        });

      y = doc.y + 20;
    } else {
      doc
        .font("Helvetica")
        .fontSize(10)
        .fillColor("#555555")
        .text("Description not available.", left, y, {
          width: contentWidth,
        });

      y = doc.y + 20;
    }
  });

  doc.fillColor("#111111");

  return y;
};

export default drawDescription;
