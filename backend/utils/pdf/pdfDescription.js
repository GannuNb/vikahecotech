import {
  hasEnoughSpace,
} from "./pdfHelpers.js";

const drawDescription = (
  doc,
  product,
  startY,
  pageState
) => {
  let currentY = startY;

  const left = 45;
  const width = doc.page.width - 90;

  const primaryColor = "#0F4C5C";
  const mutedColor = "#6B7280";
  const borderColor = "#D9E2E6";
  const textColor = "#27323A";
  const accentColor = "#1F7A5A";

  const description =
    product.description?.trim() ||
    "No product description available.";

  const padding = 16;
  const textWidth = width - padding * 2;

  /*
   * ------------------------------------------------
   * IMPORTANT:
   * SET FONT FIRST
   * ------------------------------------------------
   */

  doc
    .font("Helvetica")
    .fontSize(9);

  /*
   * ------------------------------------------------
   * CALCULATE ACTUAL TEXT HEIGHT
   * ------------------------------------------------
   */

  const textHeight =
    doc.heightOfString(
      description,
      {
        width: textWidth,
        lineGap: 3,
      }
    );

  /*
   * Extra safety space so the text
   * never touches the bottom of card.
   */

  const boxHeight =
    textHeight +
    padding * 2 +
    8;

  const requiredHeight =
    55 +
    boxHeight +
    28;

  /*
   * ------------------------------------------------
   * PAGE BREAK
   * ------------------------------------------------
   */

  if (
    !hasEnoughSpace(
      currentY,
      requiredHeight,
      doc
    )
  ) {
    pageState.startNewPage();

    currentY =
      pageState.getContentStartY();
  }

  /*
   * ------------------------------------------------
   * SECTION TITLE
   * ------------------------------------------------
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor(primaryColor)
    .text(
      "Product Description",
      left,
      currentY,
      {
        width,
      }
    );

  currentY += 18;

  /*
   * ------------------------------------------------
   * SUBTITLE
   * ------------------------------------------------
   */

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(mutedColor)
    .text(
      "Overview and application details",
      left,
      currentY,
      {
        width,
      }
    );

  currentY += 22;

  /*
   * ------------------------------------------------
   * DESCRIPTION CARD
   * ------------------------------------------------
   */

  doc
    .roundedRect(
      left,
      currentY,
      width,
      boxHeight,
      7
    )
    .fillAndStroke(
      "#F7FAFA",
      borderColor
    );

  /*
   * ------------------------------------------------
   * LEFT GREEN ACCENT
   * ------------------------------------------------
   */

  doc
    .roundedRect(
      left,
      currentY,
      4,
      boxHeight,
      3
    )
    .fill(accentColor);

  /*
   * ------------------------------------------------
   * DESCRIPTION TEXT
   * ------------------------------------------------
   */

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(textColor)
    .text(
      description,
      left + padding,
      currentY + padding,
      {
        width: textWidth,
        lineGap: 3,
      }
    );

  /*
   * ------------------------------------------------
   * RESET COLOR
   * ------------------------------------------------
   */

  doc.fillColor("#111111");

  /*
   * ------------------------------------------------
   * NEXT SECTION POSITION
   * ------------------------------------------------
   */

  currentY +=
    boxHeight + 28;

  return currentY;
};

export default drawDescription;