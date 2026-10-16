
const drawPricingTable = (doc, selectedMachinery, currentY = 125, pageState = null) => {
  const left = 50;
  const contentWidth = doc.page.width - 100;
  const columns = [
    { label: "S.No.", width: 32 },
    { label: "Equipment Description", width: 125 },
    { label: "Model No.", width: 58 },
    { label: "Power", width: 48 },
    { label: "HP", width: 35 },
    { label: "Qty", width: 35 },
    { label: "Unit Price", width: 65 },
    { label: "Total Price", width: 65 },
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
    const { header = false, fill = false, bold = false } = options;
    const padding = 5;
    doc.font(header || bold ? "Helvetica-Bold" : "Helvetica").fontSize(7.5);
    const textHeight = Math.max(
      ...values.map((value, index) =>
        doc.heightOfString(String(value ?? "-"), {
          width: columns[index].width - padding * 2,
          lineGap: 1,
        })
      )
    );
    const rowHeight = Math.max(header ? 30 : 25, textHeight + padding * 2);
    ensureSpace(rowHeight);
    if (fill) {
      doc.save();
      doc.fillColor("#EAF0F8").rect(left, currentY, contentWidth, rowHeight).fill();
      doc.restore();
    }
    let x = left;
    columns.forEach((column, index) => {
      doc.save();
      doc.lineWidth(0.5).strokeColor("#B8C2CC");
      doc.rect(x, currentY, column.width, rowHeight).stroke();
      doc.fillColor("#111111");
      doc.font(header || bold ? "Helvetica-Bold" : "Helvetica").fontSize(7.5);
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
  selectedMachinery.forEach((item) => {
    const model = item.quotationModel || {};
    const category = item.category || {};
    const capacityName = item.capacityName || model.capacityName || "";
    const title = capacityName
      ? `${category.name || "Machinery"} - ${capacityName}`
      : category.name || "Machinery";
    ensureSpace(65);
    doc.font("Helvetica-Bold").fontSize(12).fillColor("#3F5F9B");
    doc.text(title, left, currentY, { width: contentWidth });
    currentY = doc.y + 8;
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111");
    doc.text("Pricing Table", left, currentY);
    currentY = doc.y + 8;
    drawRow(columns.map((column) => column.label), {
      header: true,
      fill: true,
    });
    const pricingRows = Array.isArray(model.pricingTable)
      ? model.pricingTable
      : [];
    let totalQty = 0;
    let totalHp = 0;
    let totalPrice = 0;
    if (pricingRows.length === 0) {
      drawRow(["-", "No pricing details available", "-", "-", "-", "-", "-", "-"]);
    } else {
      pricingRows.forEach((row, index) => {
        const qty = Number(row.qty) || 0;
        const hp = Number(row.hp) || 0;
        const unitPrice = Number(row.unitPrice) || 0;
        const rowTotal =
          row.totalPrice != null && Number.isFinite(Number(row.totalPrice))
            ? Number(row.totalPrice)
            : qty * unitPrice;
        const power =
          row.power && typeof row.power === "object"
            ? [row.power.value, row.power.unit].filter(Boolean).join(" ")
            : row.power;
        totalQty += qty;
        totalHp += hp * qty;
        totalPrice += rowTotal;
        drawRow([
          index + 1,
          row.equipmentDescription || "-",
          row.modelNo || "-",
          power || "-",
          row.hp ?? "-",
          row.qty ?? "-",
          row.unitPrice != null ? formatPrice(unitPrice) : "-",
          formatPrice(rowTotal),
        ]);
      });
    }
    drawRow([
      "",
      "MACHINERY SUBTOTAL",
      "",
      "",
      `${totalHp} HP`,
      totalQty,
      "",
      formatPrice(totalPrice),
    ], { bold: true, fill: true });
    currentY += 20;
  });
  doc.fillColor("#111111");
  return currentY;
};
export default drawPricingTable;
