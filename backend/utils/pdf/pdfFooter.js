import { formatDate } from "./pdfHelpers.js";

const drawPdfFooter = (
  doc,
  pageNumber
) => {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  const left = 45;

  const lineY =
    pageHeight - 58;

  const textY =
    pageHeight - 48;

  const primaryColor = "#0F4C5C";
  const mutedColor = "#6B7280";

  /*
   * FOOTER LINE
   */

  doc
    .moveTo(
      left,
      lineY
    )
    .lineTo(
      pageWidth - left,
      lineY
    )
    .lineWidth(0.7)
    .strokeColor("#D9E2E6")
    .stroke();

  /*
   * COMPANY
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(7)
    .fillColor(primaryColor)
    .text(
      "Vikah Ecotech Pvt Ltd",
      left,
      textY,
      {
        width: 180,
        align: "left",
      }
    );

  /*
   * DATE
   */

  doc
    .font("Helvetica")
    .fontSize(7)
    .fillColor(mutedColor)
    .text(
      formatDate(),
      pageWidth / 2 - 50,
      textY,
      {
        width: 100,
        align: "center",
      }
    );

  /*
   * PAGE
   */

  doc
    .text(
      `Page ${pageNumber}`,
      pageWidth - 145,
      textY,
      {
        width: 100,
        align: "right",
      }
    );

  doc.fillColor("#111111");
};

export default drawPdfFooter;