
import fetchPdfImage from "./fetchPdfImage.js";
import compressPdfImage from "./compressPdfImage.js";

const drawMachineryImages = async (
  doc,
  selectedMachinery,
  currentY = 125,
  pageState = null
) => {
  const left = 50;
  const contentWidth = doc.page.width - 100;
  const imageWidth = 220;
  const imageHeight = 145;
  const bottomMargin = 45;

  const startNewPage = () => {
    if (pageState?.startNewPage) {
      pageState.startNewPage();
      currentY = pageState.getContentStartY
        ? pageState.getContentStartY()
        : 125;
    } else {
      doc.addPage();
      currentY = 125;
    }
  };

  if (!Array.isArray(selectedMachinery) || selectedMachinery.length === 0) {
    return currentY;
  }

  let sectionStarted = false;

  for (const item of selectedMachinery) {
    const model =
      item.quotationModel &&
      typeof item.quotationModel === "object"
        ? item.quotationModel
        : {};

    const category =
      item.category && typeof item.category === "object"
        ? item.category
        : {};

    const images = Array.isArray(model.images) ? model.images : [];
    const validImages = images.filter(
      (image) =>
        image &&
        typeof image.url === "string" &&
        image.url.trim()
    );

    if (validImages.length === 0) continue;

    if (!sectionStarted) {
      if (currentY + 45 > doc.page.height - bottomMargin) {
        startNewPage();
      }

      doc.font("Helvetica-Bold").fontSize(14).fillColor("#3F5F9B");
      doc.text("MACHINERY IMAGES", left, currentY, {
        width: contentWidth,
      });

      currentY = doc.y + 18;
      sectionStarted = true;
    }

    const capacityName = item.capacityName || model.capacityName || "";
    const title = capacityName
      ? `${category.name || "Machinery"} - ${capacityName}`
      : category.name || "Machinery";

    if (currentY + 35 > doc.page.height - bottomMargin) {
      startNewPage();
    }

    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111");
    doc.text(title, left, currentY, { width: contentWidth });
    currentY = doc.y + 10;

    for (const imageItem of validImages) {
      const description = imageItem.description?.trim() || "";

      try {
        const originalBuffer = await fetchPdfImage(imageItem.url);
        const imageBuffer = await compressPdfImage(originalBuffer);

        if (!Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
          throw new Error("Image compression returned an empty buffer");
        }

        const descriptionHeight = description
          ? doc.font("Helvetica").fontSize(9).heightOfString(description, {
              width: contentWidth,
              align: "center",
            }) + 15
          : 10;

        if (
          currentY + imageHeight + descriptionHeight + bottomMargin >
          doc.page.height
        ) {
          startNewPage();
        }

        const imageX = left + (contentWidth - imageWidth) / 2;

        doc.image(imageBuffer, imageX, currentY, {
          fit: [imageWidth, imageHeight],
          align: "center",
          valign: "center",
        });

        currentY += imageHeight + 8;

        if (description) {
          doc.font("Helvetica").fontSize(9).fillColor("#444444");
          doc.text(description, left, currentY, {
            width: contentWidth,
            align: "center",
          });
          currentY = doc.y + 15;
        } else {
          currentY += 10;
        }
      } catch (error) {
        console.error(
          `Failed to process machinery image (${imageItem.url}):`,
          error.message
        );

        if (currentY + 40 > doc.page.height - bottomMargin) {
          startNewPage();
        }

        doc.font("Helvetica").fontSize(9).fillColor("#666666");
        doc.text("Machinery image could not be loaded.", left, currentY, {
          width: contentWidth,
          align: "center",
        });

        currentY = doc.y + 12;

        if (description) {
          doc.font("Helvetica").fontSize(9).fillColor("#444444");
          doc.text(description, left, currentY, {
            width: contentWidth,
            align: "center",
          });
          currentY = doc.y + 15;
        }
      }
    }

    currentY += 20;
  }

  doc.fillColor("#111111");
  return currentY;
};

export default drawMachineryImages;
