import { hasEnoughSpace } from "./pdfHelpers.js";

const drawDescription = (doc, product, startY, pageState) => {
  let currentY = startY;

  const left = 45;
  const width = doc.page.width - 90;

  const primaryColor = "#2F7188";
  const textColor = "#111111";
  const lightGreen = "#EAF4EF";

  const description =
    product.description?.trim() ||
    "No product description available.";

  const boxPaddingTop = 18;
  const boxPaddingBottom = 18;
  const boxPaddingLeft = 20;
  const boxPaddingRight = 18;

  const textWidth =
    width -
    boxPaddingLeft -
    boxPaddingRight;

  const descriptionFontSize = 11;

  doc
    .font("Helvetica")
    .fontSize(descriptionFontSize);

  const textHeight = doc.heightOfString(
    description,
    {
      width: textWidth,
      lineGap: 3,
    }
  );

  const boxHeight =
    textHeight +
    boxPaddingTop +
    boxPaddingBottom;

  const ribbonHeight = 30;
  const ribbonWidth = 260;
  const ribbonX = left + 5;
  const ribbonY = currentY;
  const slant = 28;

  const headingFontSize = 14;
  const headingGap = 25;

  const requiredHeight =
    ribbonHeight +
    headingGap +
    boxHeight +
    20;

  if (
    !hasEnoughSpace(
      currentY,
      requiredHeight,
      doc
    )
  ) {
    pageState.startNewPage();
    currentY = pageState.getContentStartY();
  }

  doc
    .moveTo(
      ribbonX + slant,
      ribbonY
    )
    .lineTo(
      ribbonX + ribbonWidth,
      ribbonY
    )
    .lineTo(
      ribbonX + ribbonWidth - slant,
      ribbonY + ribbonHeight
    )
    .lineTo(
      ribbonX,
      ribbonY + ribbonHeight
    )
    .closePath()
    .fill(primaryColor);

  doc
    .font("Helvetica")
    .fontSize(headingFontSize)
    .fillColor("#FFFFFF")
    .text(
      "Description",
      ribbonX,
      ribbonY + 8,
      {
        width: ribbonWidth,
        align: "center",
        lineBreak: false,
      }
    );

  const boxY =
    ribbonY +
    ribbonHeight +
    headingGap;

  doc
    .roundedRect(
      left,
      boxY,
      width,
      boxHeight,
      8
    )
    .fill(lightGreen);

  doc
    .rect(
      left,
      boxY,
      6,
      boxHeight
    )
    .fill(primaryColor);

  doc
    .font("Helvetica")
    .fontSize(descriptionFontSize)
    .fillColor(textColor)
    .text(
      description,
      left + boxPaddingLeft,
      boxY + boxPaddingTop,
      {
        width: textWidth,
        lineGap: 3,
        align: "left",
      }
    );

  doc.fillColor("#111111");

  currentY =
    boxY +
    boxHeight +
    30;

  return currentY;
};

export default drawDescription;
