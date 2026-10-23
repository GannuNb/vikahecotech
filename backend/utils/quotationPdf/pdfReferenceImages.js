
import fetchPdfImage from "./fetchPdfImage.js";
import compressPdfImage from "./compressPdfImage.js";

const drawReferenceImages = async (doc, selectedMachinery, currentY = 125, pageState = null) => {
  const left = 50;
  const contentWidth = doc.page.width - 100;
  const imageWidth = 220;
  const imageHeight = 145;
  const bottomMargin = 45;
  const defaultContentStartY = 125;
  const getContentStartY = () => pageState?.getContentStartY ? pageState.getContentStartY() : defaultContentStartY;
  const startNewPage = () => {
    if (pageState?.startNewPage) {
      pageState.startNewPage();
      currentY = getContentStartY();
    } else {
      doc.addPage();
      currentY = defaultContentStartY;
    }
  };
  const getDescriptionHeight = (description) => {
    if (!description) return 10;
    doc.font("Helvetica").fontSize(9);
    return doc.heightOfString(description, { width: contentWidth, align: "center" }) + 15;
  };
  const ensureSpace = (requiredHeight) => {
    const availablePageHeight = doc.page.height - bottomMargin - getContentStartY();
    if (requiredHeight <= availablePageHeight && currentY + requiredHeight > doc.page.height - bottomMargin) {
      startNewPage();
    }
  };
  if (!Array.isArray(selectedMachinery) || selectedMachinery.length === 0) {
    return currentY;
  }
  let sectionStarted = false;
  for (const item of selectedMachinery) {
    const model = item.quotationModel && typeof item.quotationModel === "object" ? item.quotationModel : {};
    const category = item.category && typeof item.category === "object" ? item.category : {};
    const referencePhotos = Array.isArray(model.referencePhotos) ? model.referencePhotos : [];
    const validPhotos = referencePhotos.filter((photo) => photo && typeof photo.url === "string" && photo.url.trim());
    if (validPhotos.length === 0) continue;
    const capacityName = item.capacityName || model.capacityName || "";
    const title = capacityName ? `${category.name || "Machinery"} - ${capacityName}` : category.name || "Machinery";
    doc.font("Helvetica-Bold").fontSize(11);
    const titleHeight = doc.heightOfString(title, { width: contentWidth });
    const firstDescription = validPhotos[0].description?.trim() || "";
    const firstImageBlockHeight = imageHeight + 8 + getDescriptionHeight(firstDescription);
    const sectionHeadingHeight = sectionStarted ? 0 : 14 + 18;
    ensureSpace(titleHeight + 10 + firstImageBlockHeight + sectionHeadingHeight);
    if (!sectionStarted) {
      doc.font("Helvetica-Bold").fontSize(14).fillColor("#3F5F9B");
      doc.text("REFERENCE / OUTPUT IMAGES", left, currentY, { width: contentWidth });
      currentY = doc.y + 18;
      sectionStarted = true;
    }
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111");
    doc.text(title, left, currentY, { width: contentWidth });
    currentY = doc.y + 10;
    for (const photo of validPhotos) {
      const description = photo.description?.trim() || "";
      try {
        const originalBuffer = await fetchPdfImage(photo.url);
        const imageBuffer = await compressPdfImage(originalBuffer);
        if (!Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
          throw new Error("Image compression returned an empty buffer");
        }
        const descriptionHeight = getDescriptionHeight(description);
        const blockHeight = imageHeight + 8 + descriptionHeight;
        ensureSpace(blockHeight);
        const imageX = left + (contentWidth - imageWidth) / 2;
        doc.image(imageBuffer, imageX, currentY, { fit: [imageWidth, imageHeight], align: "center", valign: "center" });
        currentY += imageHeight + 8;
        if (description) {
          doc.font("Helvetica").fontSize(9).fillColor("#444444");
          doc.text(description, left, currentY, { width: contentWidth, align: "center" });
          currentY = doc.y + 15;
        } else {
          currentY += 10;
        }
      } catch (error) {
        console.error(`Failed to process reference image (${photo.url}):`, error.message);
        ensureSpace(40);
        doc.font("Helvetica").fontSize(9).fillColor("#666666");
        doc.text("Reference image could not be loaded.", left, currentY, { width: contentWidth, align: "center" });
        currentY = doc.y + 12;
        if (description) {
          const descriptionHeight = getDescriptionHeight(description);
          ensureSpace(descriptionHeight);
          doc.font("Helvetica").fontSize(9).fillColor("#444444");
          doc.text(description, left, currentY, { width: contentWidth, align: "center" });
          currentY = doc.y + 15;
        }
      }
    }
    currentY += 20;
  }
  doc.fillColor("#111111");
  return currentY;
};

export default drawReferenceImages;
