import { getLogoPath } from "./pdfHelpers.js";

const drawPdfHeader = (doc) => {
  const pageWidth = doc.page.width;

  const left = 45;
  const right = pageWidth - 45;

  const primaryColor = "#111111";
  const secondaryColor = "#3F8F5A";
  const mutedColor = "#444444";
  const lightColor = "#D9E2E6";

  /*
   * ------------------------------------------------
   * TOP LINE
   * ------------------------------------------------
   */

  doc
    .rect(
      0,
      0,
      pageWidth,
      2
    )
    .fill("#E5E7EB");

  /*
   * ------------------------------------------------
   * LOGO
   * ------------------------------------------------
   */

  const logoPath = getLogoPath();

  doc.image(
    logoPath,
    left,
    20,
    {
      fit: [190, 58],
      align: "left",
      valign: "center",
    }
  );

  /*
   * ------------------------------------------------
   * TAGLINE
   * ------------------------------------------------
   */

  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor(mutedColor)
    .text(
      "Sustainable Recycling Solutions",
      left + 5,
      85,
      {
        width: 250,
      }
    );

  /*
   * ------------------------------------------------
   * RIGHT SIDE TITLE
   * ------------------------------------------------
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(primaryColor)
    .text(
      "Technical Specification",
      350,
      68,
      {
        width: 200,
        align: "right",
      }
    );

  /*
   * ------------------------------------------------
   * HORIZONTAL LINE
   * ------------------------------------------------
   */

  doc
    .moveTo(
      left,
      105
    )
    .lineTo(
      right,
      105
    )
    .lineWidth(0.8)
    .strokeColor(lightColor)
    .stroke();

  /*
   * ------------------------------------------------
   * GREEN ACCENT LINE
   * ------------------------------------------------
   */

  doc
    .lineCap("round")
    .moveTo(
      left,
      105
    )
    .lineTo(
      left + 190,
      105
    )
    .lineWidth(2.5)
    .strokeColor(secondaryColor)
    .stroke();

  /*
   * Reset line cap so it doesn't affect
   * other PDF drawing operations.
   */

  doc.lineCap("butt");

  doc.fillColor("#111111");
};

export default drawPdfHeader;