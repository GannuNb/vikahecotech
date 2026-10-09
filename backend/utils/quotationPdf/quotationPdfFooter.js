
const quotationPdfFooter = (doc, pageNumber) => {
  const left = 45;
  const right = doc.page.width - 45;
  const lineY = doc.page.height - 48;

  doc
    .moveTo(left, lineY)
    .lineTo(right, lineY)
    .lineWidth(0.7)
    .strokeColor("#D5E0E4")
    .stroke();

  doc
    .moveTo(left, lineY)
    .lineTo(left + 120, lineY)
    .lineWidth(2)
    .strokeColor("#3F8F5A")
    .stroke();

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor("#52636B")
    .text(
      "Vikah Ecotech | Sustainable Recycling Solutions",
      left,
      lineY + 10,
      { width: right - left - 70 }
    );

  doc.text(
    `Page ${pageNumber}`,
    right - 65,
    lineY + 10,
    {
      width: 65,
      align: "right",
    }
  );

  doc.fillColor("#111111");

  return doc;
};

export default quotationPdfFooter;
