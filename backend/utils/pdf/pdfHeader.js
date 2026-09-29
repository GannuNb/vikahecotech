import { getLogoPath } from "./pdfHelpers.js";

const drawPdfHeader = (doc) => {
  const pageWidth = doc.page.width;

  const left = 45;
  const right = pageWidth - 45;

  const primaryColor = "#0F4C5C";
  const secondaryColor = "#1F7A5A";
  const darkColor = "#1F2933";
  const mutedColor = "#6B7280";
  const lightColor = "#E8F1F3";

  /*
   * TOP BRAND BAR
   */

  doc
    .rect(
      0,
      0,
      pageWidth,
      6
    )
    .fill(primaryColor);

  /*
   * LOGO
   */

  const logoPath = getLogoPath();

  doc.image(
    logoPath,
    left,
    20,
    {
      fit: [125, 55],
      align: "left",
      valign: "center",
    }
  );

  /*
   * COMPANY NAME
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor(darkColor)
    .text(
      "Vikah Ecotech Pvt Ltd",
      300,
      22,
      {
        width: 250,
        align: "right",
      }
    );

  /*
   * COMPANY DESCRIPTION
   */

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(mutedColor)
    .text(
      "Industrial Recycling & Waste Management Solutions",
      285,
      43,
      {
        width: 265,
        align: "right",
      }
    );

  /*
   * DOCUMENT TYPE
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(secondaryColor)
    .text(
      "PRODUCT TECHNICAL SPECIFICATION",
      285,
      60,
      {
        width: 265,
        align: "right",
      }
    );

  /*
   * HEADER LINE
   */

  doc
    .moveTo(left, 88)
    .lineTo(right, 88)
    .lineWidth(1)
    .strokeColor(lightColor)
    .stroke();

  /*
   * ACCENT LINE
   */

  doc
    .moveTo(left, 88)
    .lineTo(left + 80, 88)
    .lineWidth(2)
    .strokeColor(secondaryColor)
    .stroke();

  doc.fillColor("#111111");
};

export default drawPdfHeader;