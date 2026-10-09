
import {
  drawSectionTitle,
  drawKeyValue,
  drawDivider,
} from "./quotationPdfSection.js";

const quotationPdfCustomer = (doc, customer, pageState, startY) => {
  const left = pageState.left;
  const width = pageState.right - left;
  const gap = 24;
  const colWidth = (width - gap) / 2;

  let y = pageState.ensureAt(startY, 130);

  y = drawSectionTitle(doc, "Customer Details", left, y, width) + 8;

  const rows = [
    [
      ["Name", customer.customerName],
      ["Mobile", customer.mobile],
    ],
    [
      ["Company", customer.companyName],
      ["Address", customer.address],
    ],
    [
      ["Email", customer.email],
      ["", ""],
    ],
  ];

  const leftX = left + 15;
  const rightX = left + colWidth + gap + 10;

  for (let i = 0; i < rows.length; i += 1) {
    const [first, second] = rows[i];

    const leftHeight = drawKeyValue(
      doc, first[0], first[1], leftX, y, 55, colWidth - 85
    );

    const rightHeight = second[0]
      ? drawKeyValue(
          doc, second[0], second[1], rightX, y, 55, colWidth - 80
        )
      : 0;

    const rowHeight = Math.max(leftHeight, rightHeight, 16);
    y += rowHeight + 10;

    if (i < rows.length - 1) {
      drawDivider(doc, leftX, y - 4, pageState.right - 10);
    }
  }

  return y + 8;
};

export default quotationPdfCustomer;
