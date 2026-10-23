
const drawBuyerScope = (doc, currentY = 125, pageState) => {
  const left = 40;
  const rightMargin = 40;
  const tableWidth = doc.page.width - left - rightMargin;
  const firstColumnWidth = tableWidth * 0.68;
  const secondColumnWidth = tableWidth - firstColumnWidth;
  const padding = 8;
  const bottomMargin = 40;
  const titleHeight = 38;
  const rows = [
    {
      item: "Cooling System, Pipeline Fitting, Pressure Pump & Fitting",
      responsibility: "-",
    },
    {
      item: "Full Plant Wiring & Wiring Tray, Panel Room AC",
      responsibility: "-",
    },
    {
      item: "Dusting Pipe Holder & Pipeline, Pipeline Tray for Dust Collection System",
      responsibility: "-",
    },
    {
      item: "Civil Work for Machinery",
      responsibility: "Vikah Eco Tech Private Limited will provide Layouts",
    },
    {
      item: "Tools, Welding Machine, Air Compressor (For Installation)",
      responsibility: "-",
    },
    {
      item: "Wiring Men for Electricity, Welder, Fitter, Labors (For Installation)",
      responsibility: "1+2 +2 +5",
    },
  ];
  const getContentStartY = () =>
    pageState?.getContentStartY ? pageState.getContentStartY() : 125;
  const startNewPage = () => {
    if (pageState?.startNewPage) {
      pageState.startNewPage();
      currentY = getContentStartY();
    } else {
      doc.addPage();
      currentY = 125;
    }
  };
  const getRowHeight = (row) => {
    doc.font("Helvetica").fontSize(9.5);
    const itemHeight = doc.heightOfString(row.item, {
      width: firstColumnWidth - padding * 2,
      lineGap: 2,
    });
    const responsibilityHeight = doc.heightOfString(row.responsibility, {
      width: secondColumnWidth - padding * 2,
      lineGap: 2,
    });
    return Math.max(itemHeight, responsibilityHeight, 18) + padding * 2;
  };
  const drawCellText = (text, x, y, width, height) => {
    doc.font("Helvetica").fontSize(9.5);
    const textHeight = doc.heightOfString(text, {
      width: width - padding * 2,
      lineGap: 2,
    });
    const textY = y + Math.max(padding, (height - textHeight) / 2);
    doc.fillColor("#000000").text(text, x + padding, textY, {
      width: width - padding * 2,
      lineGap: 2,
    });
  };
  const drawRow = (row, rowHeight) => {
    doc.save();
    doc.lineWidth(1).strokeColor("#000000");
    doc.rect(left, currentY, firstColumnWidth, rowHeight).stroke();
    doc.rect(left + firstColumnWidth, currentY, secondColumnWidth, rowHeight).stroke();
    doc.restore();
    drawCellText(row.item, left, currentY, firstColumnWidth, rowHeight);
    drawCellText(
      row.responsibility,
      left + firstColumnWidth,
      currentY,
      secondColumnWidth,
      rowHeight
    );
    currentY += rowHeight;
  };
  const rowHeights = rows.map(getRowHeight);
  const totalTableHeight = titleHeight + rowHeights.reduce((sum, height) => sum + height, 0);
  const availablePageHeight = doc.page.height - bottomMargin - getContentStartY();
  if (totalTableHeight <= availablePageHeight && currentY + totalTableHeight > doc.page.height - bottomMargin) {
    startNewPage();
  }
  if (currentY + titleHeight + rowHeights[0] > doc.page.height - bottomMargin) {
    startNewPage();
  }
  doc.font("Helvetica-Bold").fontSize(10.5);
  doc.rect(left, currentY, tableWidth, titleHeight)
    .fillAndStroke("#C6D9AC", "#000000");
  doc.fillColor("#000000").text(
    "Buyer’s Scope of Equipment and Works (Not Included in Total Price)",
    left + padding,
    currentY + 12,
    { width: tableWidth - padding * 2 }
  );
  currentY += titleHeight;
  rows.forEach((row, index) => {
    const rowHeight = rowHeights[index];
    if (currentY + rowHeight > doc.page.height - bottomMargin) {
      startNewPage();
    }
    drawRow(row, rowHeight);
  });
  doc.fillColor("#111111");
  return currentY + 25;
};
export default drawBuyerScope;
