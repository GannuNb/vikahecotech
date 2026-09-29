import sharp from "sharp";

import getObjectFromS3 from "../aws/s3GetObject.js";

import {
  hasEnoughSpace,
} from "./pdfHelpers.js";

const drawProductImages = async (
  doc,
  product,
  startY,
  pageState
) => {
  let currentY = startY;

  const images =
    Array.isArray(product.images)
      ? product.images.filter(Boolean)
      : [];

  if (!images.length) {
    return currentY;
  }

  const left = 45;

  const pageWidth =
    doc.page.width;

  const contentWidth =
    pageWidth - 90;

  const primaryColor = "#0F4C5C";
  const secondaryColor = "#1F7A5A";
  const mutedColor = "#6B7280";
  const borderColor = "#D9E2E6";

  const imageWidth = 235;
  const imageHeight = 150;
  const gap = 15;

  /*
   * SECTION HEADER
   */

  if (
    !hasEnoughSpace(
      currentY,
      210,
      doc
    )
  ) {
    pageState.startNewPage();

    currentY =
      pageState.getContentStartY();
  }

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor(primaryColor)
    .text(
      "Product Gallery",
      left,
      currentY,
      {
        width: contentWidth,
      }
    );

  currentY += 17;

  doc
    .font("Helvetica")
    .fontSize(8)
    .fillColor(mutedColor)
    .text(
      "Product images and visual reference",
      left,
      currentY,
      {
        width: contentWidth,
      }
    );

  currentY += 22;

  /*
   * IMAGE ROWS
   */

  for (
    let index = 0;
    index < images.length;
    index++
  ) {
    const requiredHeight =
      imageHeight + 35;

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

      doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .fillColor(primaryColor)
        .text(
          "Product Gallery",
          left,
          currentY,
          {
            width: contentWidth,
          }
        );

      currentY += 28;
    }

    const rowY =
      currentY;

    const firstX =
      left;

    const secondX =
      left +
      imageWidth +
      gap;

    const hasSecondImage =
      index + 1 <
      images.length;

    /*
     * DRAW IMAGE
     */

    const drawImage = async (
      imageKey,
      x,
      imageNumber
    ) => {
      try {
        const imageBuffer =
          await getObjectFromS3(
            imageKey
          );

        const pngBuffer =
          await sharp(
            imageBuffer
          )
            .png()
            .toBuffer();

        /*
         * IMAGE CARD
         */

        doc
          .roundedRect(
            x,
            rowY,
            imageWidth,
            imageHeight,
            6
          )
          .fillAndStroke(
            "#FFFFFF",
            borderColor
          );

        /*
         * IMAGE
         */

        doc.image(
          pngBuffer,
          x + 6,
          rowY + 6,
          {
            fit: [
              imageWidth - 12,
              imageHeight - 12,
            ],
            align: "center",
            valign: "center",
          }
        );

        /*
         * IMAGE NUMBER
         */

        doc
          .circle(
            x + 18,
            rowY + 18,
            9
          )
          .fill(secondaryColor);

        doc
          .font("Helvetica-Bold")
          .fontSize(7)
          .fillColor("#FFFFFF")
          .text(
            String(imageNumber),
            x + 13,
            rowY + 14,
            {
              width: 10,
              align: "center",
            }
          );
      } catch (error) {
        console.error(
          "PDF image error:",
          error
        );

        doc
          .roundedRect(
            x,
            rowY,
            imageWidth,
            imageHeight,
            6
          )
          .fillAndStroke(
            "#F8FAFA",
            borderColor
          );

        doc
          .font("Helvetica")
          .fontSize(9)
          .fillColor(mutedColor)
          .text(
            "Image unavailable",
            x,
            rowY +
              imageHeight / 2 -
              5,
            {
              width: imageWidth,
              align: "center",
            }
          );
      }
    };

    await drawImage(
      images[index],
      firstX,
      index + 1
    );

    if (hasSecondImage) {
      await drawImage(
        images[index + 1],
        secondX,
        index + 2
      );

      index++;
    }

    currentY +=
      imageHeight + 28;
  }

  doc.fillColor("#111111");

  return currentY;
};

export default drawProductImages;