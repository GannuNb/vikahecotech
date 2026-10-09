
import {
  drawSectionTitle,
  drawKeyValue,
  drawDivider,
} from "./quotationPdfSection.js";

const quotationPdfBasicInfo = (doc, quotation, pageState, startY) => {
  const left = pageState.left;
  const width = pageState.right - left;
  const half = width / 2;

  let y = pageState.ensureAt(startY, 100);

  y = drawSectionTitle(doc, "Quotation Information", left, y, width) + 10;

  const rows = [
    [
      ["Subject", quotation.subject],
      ["Verified By", quotation.verifiedBy],
    ],
    [
      ["Prepared By", quotation.preparedBy],
      ["Approved By", quotation.approvedBy],
    ],
  ];

  for (let i = 0; i < rows.length; i += 1) {
    const first = rows[i][0];
    const second = rows[i][1];

    const h1 = drawKeyValue(
      doc, first[0], first[1], left + 15, y, 65, half - 90
    );

    const h2 = drawKeyValue(
      doc, second[0], second[1], left + half + 10, y, 65, half - 90
    );

    y += Math.max(h1, h2, 15) + 12;

    if (i === 0) drawDivider(doc, left + 15, y - 5, pageState.right - 15);
  }

  return y + 8;
};

export default quotationPdfBasicInfo;
