import sharp from "sharp";

import {
  hasEnoughSpace,
} from "./pdfHelpers.js";

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

  const primaryColor = "#0F4C5C";
  const secondaryColor = "#1F7A5A";
  const darkColor = "#1F2933";
  const mutedColor = "#6B7280";
  const borderColor = "#D9E2E6";

  /*
   * ------------------------------------------------
   * OVERVIEW HEIGHT
   *
   * Keep this fixed so the following
   * Product Gallery layout is not disturbed.
   * ------------------------------------------------
   */

  const overviewHeight = 180;

  /*
   * ------------------------------------------------
   * PAGE CHECK
   * ------------------------------------------------
   */

  if (
    !hasEnoughSpace(
      currentY,
      overviewHeight + 20,
      doc
    )
  ) {
    pageState.startNewPage();

    currentY =
      pageState.getContentStartY();
  }

  /*
   * ------------------------------------------------
   * MAIN BACKGROUND
   * ------------------------------------------------
   */

  doc
    .roundedRect(
      left,
      currentY,
      width,
      overviewHeight,
      7
    )
    .fillAndStroke(
      "#F1F5F6",
      borderColor
    );

  /*
   * ------------------------------------------------
   * IMAGE AREA
   * ------------------------------------------------
   */

  const imageAreaWidth =
    width * 0.56;

  const imageX = left;
  const imageY = currentY;

  doc
    .rect(
      imageX,
      imageY,
      imageAreaWidth,
      overviewHeight
    )
    .fill("#E8EDEE");

  /*
   * ------------------------------------------------
   * PRODUCT IMAGE
   * ------------------------------------------------
   */

  if (
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    try {
      const imageKey =
        product.images[0];

      const imageBuffer =
        await getObjectFromS3(
          imageKey
        );

      const pngBuffer =
        await sharp(imageBuffer)
          .png()
          .toBuffer();

      const imagePadding = 10;

      doc.image(
        pngBuffer,
        imageX + imagePadding,
        imageY + imagePadding,
        {
          fit: [
            imageAreaWidth -
              imagePadding * 2,
            overviewHeight -
              imagePadding * 2,
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
    }
  }

  /*
   * ------------------------------------------------
   * RIGHT SIDE
   * ------------------------------------------------
   */

  const rightX =
    left + imageAreaWidth;

  const rightWidth =
    width - imageAreaWidth;

  /*
   * White right-side panel
   */

  doc
    .rect(
      rightX,
      currentY,
      rightWidth,
      overviewHeight
    )
    .fill("#FFFFFF");

  /*
   * Green top accent
   */

  doc
    .rect(
      rightX,
      currentY,
      rightWidth,
      5
    )
    .fill(secondaryColor);

  const contentX =
    rightX + 18;

  const contentWidth =
    rightWidth - 36;

  /*
   * ------------------------------------------------
   * PRODUCT OVERVIEW LABEL
   * ------------------------------------------------
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(secondaryColor)
    .text(
      "PRODUCT OVERVIEW",
      contentX,
      currentY + 20,
      {
        width: contentWidth,
      }
    );

  /*
   * ------------------------------------------------
   * MODEL NAME
   * ------------------------------------------------
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .fillColor(primaryColor)
    .text(
      product.modelName ||
        "Product Model",
      contentX,
      currentY + 38,
      {
        width: contentWidth,
      }
    );

  /*
   * ------------------------------------------------
   * APPLICATION
   * ------------------------------------------------
   */

  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(darkColor)
    .text(
      product.application?.name ||
        "Industrial Equipment",
      contentX,
      currentY + 63,
      {
        width: contentWidth,
      }
    );

  /*
   * ------------------------------------------------
   * DIVIDER
   * ------------------------------------------------
   */

  doc
    .moveTo(
      contentX,
      currentY + 82
    )
    .lineTo(
      contentX + contentWidth,
      currentY + 82
    )
    .lineWidth(0.7)
    .strokeColor(borderColor)
    .stroke();

  /*
   * ------------------------------------------------
   * CATEGORY
   * ------------------------------------------------
   */

  doc
    .font("Helvetica")
    .fontSize(7)
    .fillColor(mutedColor)
    .text(
      "CATEGORY",
      contentX,
      currentY + 96,
      {
        width: contentWidth,
      }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor(darkColor)
    .text(
      product.application?.category?.name ||
        "Industrial Equipment",
      contentX,
      currentY + 108,
      {
        width: contentWidth,
      }
    );

  /*
   * ------------------------------------------------
   * APPLICATION
   * ------------------------------------------------
   */

  doc
    .font("Helvetica")
    .fontSize(7)
    .fillColor(mutedColor)
    .text(
      "APPLICATION",
      contentX,
      currentY + 127,
      {
        width: contentWidth,
      }
    );

  doc
    .font("Helvetica-Bold")
    .fontSize(8.5)
    .fillColor(darkColor)
    .text(
      product.application?.name ||
        "Industrial Equipment",
      contentX,
      currentY + 139,
      {
        width: contentWidth,
      }
    );

  /*
   * ------------------------------------------------
   * BOTTOM BRANDING
   * ------------------------------------------------
   */

  doc
    .font("Helvetica-Bold")
    .fontSize(7)
    .fillColor(secondaryColor)
    .text(
      "Industrial Recycling Solutions",
      contentX,
      currentY + 162,
      {
        width: contentWidth,
      }
    );

  /*
   * ------------------------------------------------
   * RESET
   * ------------------------------------------------
   */

  doc.fillColor("#111111");

  /*
   * ------------------------------------------------
   * IMPORTANT:
   * RETURN EXACTLY THE SPACE USED BY THIS SECTION
   * ------------------------------------------------
   */

  currentY +=
    overviewHeight + 28;

  return currentY;
};

export default drawProductInfo;