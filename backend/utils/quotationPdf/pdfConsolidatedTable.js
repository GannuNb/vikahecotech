
const drawConsolidatedTable = (doc, selectedMachinery, currentY = 125, pageState = null) => {
  const left = 50;
  const contentWidth = doc.page.width - 100;
  const columns = [
    { label: "Section", width: 35 },
    { label: "Description", width: 170 },
    { label: "HP / Model", width: 85 },
    { label: "Qty", width: 55 },
    { label: "Total Price", width: 105 },
  ];
  const tableWidth = columns.reduce((total, column) => total + column.width, 0);
  const scale = contentWidth / tableWidth;
  columns.forEach((column) => {
    column.width *= scale;
  });
  const formatPrice = (value) =>
    Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
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
  const drawRow = (values, options = {}) => {
    const { header = false, bold = false, fill = false } = options;
    const padding = 6;
    doc.font(header || bold ? "Helvetica-Bold" : "Helvetica").fontSize(9);
    const textHeight = Math.max(
      ...values.map((value, index) =>
        doc.heightOfString(String(value ?? "-"), {
          width: columns[index].width - padding * 2,
        })
      )
    );
    const rowHeight = Math.max(header ? 30 : 35, textHeight + padding * 2);
    ensureSpace(rowHeight);
    if (fill) {
      doc.save();
      doc.fillColor("#EAF0F8").rect(left, currentY, contentWidth, rowHeight).fill();
      doc.restore();
    }
    let x = left;
    columns.forEach((column, index) => {
      doc.save();
      doc.lineWidth(0.6).strokeColor("#808080");
      doc.rect(x, currentY, column.width, rowHeight).stroke();
      doc.fillColor("#111111");
      doc.font(header || bold ? "Helvetica-Bold" : "Helvetica").fontSize(9);
      doc.text(String(values[index] ?? "-"), x + padding, currentY + padding, {
        width: column.width - padding * 2,
        height: rowHeight - padding * 2,
        lineGap: 1,
      });
      doc.restore();
      x += column.width;
    });
    currentY += rowHeight;
  };
  if (!Array.isArray(selectedMachinery) || selectedMachinery.length === 0) {
    return currentY;
  }
  doc.font("Helvetica-Bold").fontSize(13).fillColor("#3F5F9B");
  doc.text("CONSOLIDATED PRICING SUMMARY", left, currentY, {
    width: contentWidth,
  });
  currentY = doc.y + 12;
  drawRow(columns.map((column) => column.label), {
    header: true,
    fill: true,
  });
  let grandTotalHp = 0;
  let grandTotalQty = 0;
  let grandTotalPrice = 0;
  selectedMachinery.forEach((item, index) => {
    const model = item.quotationModel || {};
    const category = item.category || {};
    const pricingRows = Array.isArray(model.pricingTable)
      ? model.pricingTable
      : [];
    let sectionHp = 0;
    let sectionQty = 0;
    let sectionPrice = 0;
    pricingRows.forEach((row) => {
      const qty = Number(row.qty) || 0;
      const hp = Number(row.hp) || 0;
      const unitPrice = Number(row.unitPrice) || 0;
      const rowTotal =
        row.totalPrice != null && Number.isFinite(Number(row.totalPrice))
          ? Number(row.totalPrice)
          : qty * unitPrice;
      sectionHp += hp * qty;
      sectionQty += qty;
      sectionPrice += rowTotal;
    });
    grandTotalHp += sectionHp;
    grandTotalQty += sectionQty;
    grandTotalPrice += sectionPrice;
    const sectionName = category.name || `Machinery ${index + 1}`;
    const capacityName = item.capacityName || model.capacityName || "";
    const description = capacityName
      ? `${sectionName} - ${capacityName}`
      : sectionName;
    drawRow([
      String.fromCharCode(65 + index),
      description,
      `${sectionHp} HP`,
      sectionQty,
      formatPrice(sectionPrice),
    ]);
  });
  drawRow([
    "",
    "GRAND TOTAL",
    `${grandTotalHp} HP`,
    grandTotalQty,
    formatPrice(grandTotalPrice),
  ], { bold: true, fill: true });
  currentY += 15;
  doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111");
  const summaryColumns = [
    { label: "Total Equipment's Qty", value: grandTotalQty },
    { label: "Total HP", value: `${grandTotalHp} HP` },
    { label: "Total Cost", value: formatPrice(grandTotalPrice) },
  ];
  const summaryWidth = contentWidth / summaryColumns.length;
  const summaryHeight = 28;
  ensureSpace(summaryHeight * 2);
  summaryColumns.forEach((column, index) => {
    const x = left + index * summaryWidth;
    doc.rect(x, currentY, summaryWidth, summaryHeight).stroke();
    doc.text(column.label, x + 4, currentY + 7, {
      width: summaryWidth - 8,
      align: "center",
    });
  });
  currentY += summaryHeight;
  summaryColumns.forEach((column, index) => {
    const x = left + index * summaryWidth;
    doc.rect(x, currentY, summaryWidth, summaryHeight).stroke();
    doc.text(String(column.value), x + 4, currentY + 7, {
      width: summaryWidth - 8,
      align: "center",
    });
  });
  currentY += summaryHeight + 20;
  doc.fillColor("#111111");
  return currentY;
};
export default drawConsolidatedTable;
