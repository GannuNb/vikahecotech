
import sharp from "sharp";
import getObjectFromS3 from "../aws/s3GetObject.js";

import { drawSectionTitle } from "./quotationPdfSection.js";

const quotationPdfImages = async (
  doc,
  quotation,
  pageState,
  startY
) => {
  const left = pageState.left;
  const width = pageState.right - left;
  let y = startY;

  const groups = [
    {
      title: "Machinery Images",
      images: quotation.images || [],
      columns: 1,
      imageHeight: 230,
    },
    {
      title: "Reference Images",
      images: quotation.referenceImages || [],
      columns: 2,
      imageHeight: 155,
    },
  ];

  for (const group of groups) {
    if (!group.images.length) continue;

    y = pageState.ensureAt(y, 80);
    y = drawSectionTitle(doc, group.title, left, y, width) + 8;

    const gap = 12;
    const imageWidth =
      (width - gap * (group.columns - 1)) / group.columns;

    for (let index = 0; index < group.images.length; index += 1) {
      const column = index % group.columns;

      // Start a new row only after the previous row is complete.
      if (column === 0 && y + group.imageHeight > pageState.bottom) {
        y = pageState.startPage();
        y = drawSectionTitle(
          doc,
          `${group.title} (continued)`,
          left,
          y,
          width
        ) + 8;
      }

      const x = left + column * (imageWidth + gap);

      doc
        .roundedRect(x, y, imageWidth, group.imageHeight, 5)
        .fill("#F1F5F7");

      try {
        const original = await getObjectFromS3(group.images[index]);

        const buffer = await sharp(original)
          .rotate()
          .resize({
            width: Math.round((imageWidth - 16) * 2),
            height: Math.round((group.imageHeight - 16) * 2),
            fit: "inside",
            withoutEnlargement: true,
          })
          .png()
          .toBuffer();

        doc.image(buffer, x + 8, y + 8, {
          fit: [imageWidth - 16, group.imageHeight - 16],
          align: "center",
          valign: "center",
        });
      } catch (error) {
        console.error("Quotation image error:", error.message);

        doc
          .font("Helvetica")
          .fontSize(9)
          .fillColor("#64748B")
          .text("Image unavailable", x + 8, y + group.imageHeight / 2, {
            width: imageWidth - 16,
            align: "center",
          });
      }

      // Advance after a complete row or the final partial row.
      const rowComplete =
        column === group.columns - 1 ||
        index === group.images.length - 1;

      if (rowComplete) {
        y += group.imageHeight + 12;
      }
    }

    y += 8;
  }

  return y + 8;
};

export default quotationPdfImages;
