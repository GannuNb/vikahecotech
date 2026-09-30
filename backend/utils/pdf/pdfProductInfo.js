import sharp from "sharp";

import { hasEnoughSpace } from "./pdfHelpers.js";
import getObjectFromS3 from "../aws/s3GetObject.js";

const drawProductInfo = async (
  doc,
  product,
  startY,
  pageState
) => {
  let currentY = startY;

  const left = 45;
  const width = doc.page.width - 90;

  // Colors
  const primaryColor = "#0F4C5C";
  const greenColor = "#3F8F5A";
  const darkColor = "#111111";
  const mutedColor = "#666666";
  const lightGreen = "#A8DCC0";
  const lightGray = "#D9E2E6";

  const productAreaHeight = 320;

  /*
   * PAGE SPACE
   */

  if (
    !hasEnoughSpace(
      currentY,
      productAreaHeight + 20,
      doc
    )
  ) {
    pageState.startNewPage();

    currentY =
      pageState.getContentStartY();
  }

  /*
   * IMAGE
   */

  const imageWidth = 200;
  const imageX = left;
  const imageY = currentY -22;

  /*
   * RIGHT CONTENT POSITION
   *
   * Fixed position so reducing the image
   * does not move the right content left.
   */

  const dividerX = left + 280;
  const contentX = dividerX + 20;
  const contentWidth =
    width - (contentX - left);

  /*
   * GET PRODUCT IMAGE
   */

  if (
    Array.isArray(product.images) &&
    product.images.length
  ) {
    try {
      const imageBuffer =
        await getObjectFromS3(
          product.images[0]
        );

      const pngBuffer =
        await sharp(imageBuffer)
          .png()
          .toBuffer();

      doc.image(
        pngBuffer,
        imageX,
        imageY,
        {
          fit: [
            imageWidth,
            productAreaHeight - 10,
          ],
          align: "center",
          valign: "center",
        }
      );
    } catch (error) {
      console.error(
        "Product overview image error:",
        error.message
      );

      doc
        .font("Helvetica")
        .fontSize(9)
        .fillColor(mutedColor)
        .text(
          "Image unavailable",
          imageX,
          imageY + 180,
          {
            width: imageWidth,
            align: "center",
          }
        );
    }
  }

  /*
   * VERTICAL LINE
   */

  doc
    .moveTo(
      dividerX,
      currentY + 5
    )
    .lineTo(
      dividerX,
      currentY + 275
    )
    .lineWidth(4)
    .strokeColor(primaryColor)
    .stroke();

  /*
   * MODEL NAME
   */

  const modelName =
    String(
      product.modelName ||
        "Product Model"
    )
      .trim()
      .toUpperCase();

  doc
    .font("Helvetica-Bold")
    .fontSize(24)
    .fillColor(darkColor)
    .text(
      modelName,
      contentX,
      currentY + 20,
      {
        width: contentWidth,
      }
    );

  /*
   * APPLICATION NAME
   */

  const applicationName =
    product.application?.name ||
    "Industrial Equipment";

  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(mutedColor)
    .text(
      applicationName.toUpperCase(),
      contentX,
      currentY + 56,
      {
        width: contentWidth,
      }
    );

  /*
   * GREEN + GRAY LINE
   */

  const lineY = currentY + 88;
  const lineWidth = Math.min(
    contentWidth,
    205
  );

  doc
    .lineCap("round")
    .moveTo(
      contentX,
      lineY
    )
    .lineTo(
      contentX + lineWidth,
      lineY
    )
    .lineWidth(1.5)
    .strokeColor(lightGray)
    .stroke();

  doc
    .moveTo(
      contentX,
      lineY
    )
    .lineTo(
      contentX + 75,
      lineY
    )
    .lineWidth(2.5)
    .strokeColor(greenColor)
    .stroke();

  doc.lineCap("butt");

  /*
   * CATEGORY
   */

  const categoryName =
    product.application?.category?.name ||
    "Industrial Equipment";

  const categoryY =
    currentY + 130;

  // Circle
  doc
    .circle(
      contentX + 18,
      categoryY,
      17
    )
    .fill("#F1FAF5")
    .strokeColor(lightGreen)
    .lineWidth(1)
    .stroke();

  // Four-square icon
  const iconSize = 7;
  const iconGap = 2.5;
  const iconX = contentX + 10;
  const iconY = categoryY - 8;

  [
    [0, 0],
    [iconSize + iconGap, 0],
    [0, iconSize + iconGap],
    [iconSize + iconGap, iconSize + iconGap],
  ].forEach(([x, y]) => {
    doc
      .roundedRect(
        iconX + x,
        iconY + y,
        iconSize,
        iconSize,
        1.5
      )
      .fill(lightGreen);
  });

  // Label
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(primaryColor)
    .text(
      "CATEGORY",
      contentX + 48,
      currentY + 119
    );

  // Value
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(darkColor)
    .text(
      categoryName,
      contentX + 48,
      currentY + 140
    );

  /*
   * APPLICATION
   */

  const applicationY =
    currentY + 212;

  // Circle
  doc
    .circle(
      contentX + 18,
      applicationY,
      17
    )
    .fill("#F1FAF5")
    .strokeColor(lightGreen)
    .lineWidth(1)
    .stroke();

  // Simple gear
  doc
    .circle(
      contentX + 18,
      applicationY - 2,
      6
    )
    .lineWidth(1.2)
    .strokeColor(lightGreen)
    .stroke();

  doc
    .circle(
      contentX + 18,
      applicationY - 2,
      2
    )
    .lineWidth(1)
    .strokeColor(lightGreen)
    .stroke();

  // Simple base
  doc
    .moveTo(
      contentX + 9,
      applicationY + 7
    )
    .lineTo(
      contentX + 26,
      applicationY + 7
    )
    .lineWidth(1.2)
    .strokeColor(lightGreen)
    .stroke();

  doc
    .moveTo(
      contentX + 26,
      applicationY + 7
    )
    .lineTo(
      contentX + 30,
      applicationY + 3
    )
    .lineWidth(1.2)
    .strokeColor(lightGreen)
    .stroke();

  // Label
  doc
    .font("Helvetica")
    .fontSize(11)
    .fillColor(primaryColor)
    .text(
      "APPLICATION",
      contentX + 48,
      currentY + 201
    );

  // Value
  doc
    .font("Helvetica-Bold")
    .fontSize(12)
    .fillColor(darkColor)
    .text(
      applicationName,
      contentX + 48,
      currentY + 222
    );

  doc.fillColor("#111111");

  /*
   * MOVE BELOW PRODUCT SECTION
   */

  currentY +=
    productAreaHeight + 25;

  return currentY;
};

export default drawProductInfo;