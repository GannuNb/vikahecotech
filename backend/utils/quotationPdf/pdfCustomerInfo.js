
const drawCustomerInfo = (doc, quotationRequest, currentY = 125) => {
  const left = 50;
  const right = doc.page.width - 50;
  const contentWidth = right - left;
  const customer = quotationRequest?.customer || {};
  const rightColumnWidth = 250;
  const rightColumnX = right - rightColumnWidth + 60;

  const quotationDate = quotationRequest?.createdAt
    ? new Date(quotationRequest.createdAt)
    : new Date();

  const formattedDate = quotationDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // DATE - RIGHT SIDE
  doc.font("Helvetica").fontSize(11).fillColor("#111111");
  doc.text("Date:", rightColumnX, currentY, {
    continued: true,
  });
  doc.font("Helvetica-Bold").text(` ${formattedDate}`, {
    width: rightColumnWidth,
    align: "left",
  });

  // QUOTATION NUMBER - RIGHT SIDE
  doc.font("Helvetica").fontSize(11);
  doc.text("Quotation No:", rightColumnX, currentY + 30, {
    continued: true,
  });
  doc.font("Helvetica-Bold").text(
    ` ${quotationRequest?.quotationNumber || "-"}`,
    {
      width: rightColumnWidth,
      align: "left",
    }
  );

  // CUSTOMER DETAILS
  let y = currentY + 65;

  doc.font("Helvetica-Bold").fontSize(12);
  doc.text("To,", left, y, { width: contentWidth });
  y = doc.y + 35;

  doc.font("Helvetica-Bold").fontSize(11);
  doc.text(customer.name || "-", left, y, {
    width: contentWidth,
  });
  y = doc.y + 4;

  doc.font("Helvetica-Bold").fontSize(11);
  doc.text(customer.company || "-", left, y, {
    width: contentWidth,
  });
  y = doc.y + 4;

  const drawField = (label, value) => {
    doc.font("Helvetica-Bold").fontSize(11);
    doc.text(`${label}:`, left, y, { continued: true });
    doc.font("Helvetica").text(` ${value || "-"}`, {
      width: contentWidth,
    });
    y = doc.y + 4;
  };

  drawField("Mobile", customer.phone);
  drawField("Email", customer.email);
  drawField("Address", customer.address);

  y += 12;

  doc.font("Helvetica-Bold").fontSize(11);
  doc.text("Sub:", left, y, { continued: true });
  doc.font("Helvetica").text(
    ` ${quotationRequest?.subject || "Quotation for Selected Machinery"}`,
    { width: contentWidth }
  );
  y = doc.y + 22;

  // FIXED COMPANY PERSONNEL
  doc.font("Helvetica-Bold").fontSize(11);
  doc.text("Quotation Prepared by:", left, y, {
    continued: true,
  });
  doc.font("Helvetica").text(" Ganesh", {
    width: contentWidth,
  });
  y = doc.y + 22;

  doc.font("Helvetica-Bold").fontSize(11);
  doc.text("Verified By:", left, y, {
    continued: true,
  });
  doc.font("Helvetica").text(" Linga Swamy", {
    width: contentWidth,
  });

  doc.fillColor("#111111");

  return doc.y + 25;
};

export default drawCustomerInfo;
