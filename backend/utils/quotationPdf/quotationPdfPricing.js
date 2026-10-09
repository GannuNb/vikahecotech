
import {
  drawSectionTitle,
  sectionColors,
} from "./quotationPdfSection.js";


const money = (value) =>
  ` ${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;


const quotationPdfPricing = (doc, quotation, pageState, startY) => {
  const left = pageState.left;
  const width = pageState.right - left;

  const ratios = [0.06, 0.22, 0.13, 0.14, 0.08, 0.17, 0.20];
  const columns = ratios.map((ratio) => ratio * width);
  const headings = [
  "#",
  "Equipment",
  "Model",
  "Power",
  "Qty",
  "Unit Price (Rs.)",
  "Total (Rs.)",
];

  let y = pageState.ensureAt(startY, 100);
  y = drawSectionTitle(doc, "Pricing Details", left, y, width) + 8;

  const drawRow = (values, header = false) => {
    doc.font(header ? "Helvetica-Bold" : "Helvetica").fontSize(7.5);

    const heights = values.map((value, i) =>
      doc.heightOfString(String(value ?? "-"), {
        width: columns[i] - 8,
      })
    );

    const height = Math.max(header ? 23 : 28, ...heights.map((h) => h + 12));

    if (y + height > pageState.bottom) {
      y = pageState.startPage();

      // Repeat column headings on the new page.
      if (!header) drawRow(headings, true);
    }

    let x = left;

    values.forEach((value, i) => {
      doc.rect(x, y, columns[i], height)
        .fill(header ? "#E8F1F3" : "#FFFFFF");

      doc.rect(x, y, columns[i], height)
        .lineWidth(0.4)
        .strokeColor("#D5E0E4")
        .stroke();

      doc
        .font(header ? "Helvetica-Bold" : "Helvetica")
        .fontSize(7.5)
        .fillColor(sectionColors.text)
        .text(String(value ?? "-"), x + 4, y + 6, {
          width: columns[i] - 8,
          align: i === 4 ? "center" : i >= 5 ? "right" : "left",
        });

      x += columns[i];
    });

    y += height;
  };

  for (const table of quotation.pricingTables || []) {
    y = pageState.ensureAt(y, 65);

    doc
      .font("Helvetica-Bold")
      .fontSize(10)
      .fillColor(sectionColors.teal)
      .text(table.sectionName || "Equipment", left, y);

    y += 19;
    drawRow(headings, true);

    for (let i = 0; i < (table.machinery || []).length; i += 1) {
      const item = table.machinery[i];

      drawRow([
        i + 1,
        item.equipmentDescription || "-",
        item.modelNo || "-",
        item.power?.display || (item.power?.hp ? `${item.power.hp} HP` : "-"),
        item.qty ?? 0,
        money(item.unitPrice),
        money(item.totalPrice),
      ]);
    }

    drawRow([
      "",
      "",
      "Section Total",
      "",
      table.totalQty ?? 0,
      `${table.totalHp ?? 0} HP`,
      money(table.totalCost),
    ]);

    y += 14;
  }

  y = pageState.ensureAt(y, 180);
  y = drawSectionTitle(doc, "Quotation Summary", left, y, width) + 8;

  const rows = [
    ["Total Equipment Quantity", quotation.totalEquipmentQty ?? 0],
    ["Total HP", `${quotation.totalHp ?? 0} HP`],
    ["Equipment Subtotal", money(quotation.grandTotal)],
    [
      `${quotation.tax?.name || "Tax"} (${quotation.tax?.percentage ?? 0}%)`,
      money(quotation.taxAmount),
    ],
    ["Final Total (INR)", money(quotation.finalTotal)],
  ];

  for (let i = 0; i < rows.length; i += 1) {
    y = pageState.ensureAt(y, 29);

    const [label, value] = rows[i];
    const finalRow = i === rows.length - 1;
    const height = 29;

    doc.rect(left, y, width, height)
      .fill(finalRow ? "#D8F0DF" : i % 2 ? "#FFFFFF" : "#F1F5F7");

    doc.rect(left, y, width, height)
      .lineWidth(0.4)
      .strokeColor("#D5E0E4")
      .stroke();

    doc
      .font(finalRow ? "Helvetica-Bold" : "Helvetica")
      .fontSize(finalRow ? 10 : 9)
      .fillColor(sectionColors.text)
      .text(String(label), left + 10, y + 8, { width: width * 0.62 });

    doc
      .font("Helvetica-Bold")
      .fontSize(finalRow ? 10 : 9)
      .text(String(value), left + width * 0.62, y + 8, {
        width: width * 0.35 - 10,
        align: "right",
      });

    y += height;
  }

  return y + 15;
};

export default quotationPdfPricing;
