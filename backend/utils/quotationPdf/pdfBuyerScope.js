
const drawBuyerScope = (doc, currentY = 125, pageState) => {
  const left = 40;
  const pageWidth = doc.page.width;
  const rightMargin = 40;
  const tableWidth = pageWidth - left - rightMargin;
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

  const ensureSpace = (height) => {
    const pageBottom = doc.page.height - bottomMargin;
    if (currentY + height > pageBottom) {
      if (pageState) {
        pageState.startNewPage();
        currentY = pageState.getContentStartY();
      } else {
        doc.addPage();
        currentY = 125;
      }
    }
  };

  const drawCellText = (text, x, y, width, height, bold = false) => {
    doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(9.5);
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

  ensureSpace(titleHeight + 35);

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

  rows.forEach((row) => {
    doc.font("Helvetica").fontSize(9.5);

    const textWidth = firstColumnWidth - padding * 2;
    const responsibilityWidth = secondColumnWidth - padding * 2;

    const itemHeight = doc.heightOfString(row.item, {
      width: textWidth,
      lineGap: 2,
    });

    const responsibilityHeight = doc.heightOfString(row.responsibility, {
      width: responsibilityWidth,
      lineGap: 2,
    });

    const rowHeight = Math.max(itemHeight, responsibilityHeight, 18) + padding * 2;

    ensureSpace(rowHeight);

    doc.rect(left, currentY, firstColumnWidth, rowHeight).stroke("#000000");
    doc.rect(
      left + firstColumnWidth,
      currentY,
      secondColumnWidth,
      rowHeight
    ).stroke("#000000");

    drawCellText(row.item, left, currentY, firstColumnWidth, rowHeight);
    drawCellText(
      row.responsibility,
      left + firstColumnWidth,
      currentY,
      secondColumnWidth,
      rowHeight
    );

    currentY += rowHeight;
  });

  return currentY + 25;
};

export default drawBuyerScope;
