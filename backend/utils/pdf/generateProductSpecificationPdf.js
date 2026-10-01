import PDFDocument from "pdfkit";

import drawPdfHeader from "./pdfHeader.js";
import drawPdfFooter from "./pdfFooter.js";

import drawProductInfo from "./pdfProductInfo.js";
import drawDescription from "./pdfDescription.js";
import drawSpecifications from "./pdfSpecifications.js";
import drawContact from "./pdfContact.js";

const generateProductSpecificationPdf = async (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 0,
        autoFirstPage: true,
      });

      const chunks = [];

      // Collect PDF data in memory

      doc.on("data", (chunk) => {
        chunks.push(chunk);
      });

      // PDF completed

      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);

        const safeModelName =
  (product.modelName || "product")
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toUpperCase();

const fileName = `${safeModelName}.pdf`;

        resolve({
          pdfBuffer,
          fileName,
        });
      });

      doc.on("error", (error) => {
        reject(error);
      });

      // --------------------------------
      // PAGE STATE
      // --------------------------------

      const pageState = {
        pageNumber: 1,

        contentStartY: 145,

        getContentStartY() {
          return this.contentStartY;
        },

        startNewPage() {
          doc.addPage();

          this.pageNumber += 1;

          drawPdfHeader(doc);

          drawPdfFooter(
            doc,
            this.pageNumber
          );
        },
      };

      // --------------------------------
      // FIRST PAGE HEADER / FOOTER
      // --------------------------------

      drawPdfHeader(doc);

      drawPdfFooter(
        doc,
        pageState.pageNumber
      );

      // --------------------------------
      // PAGE 1
      // PRODUCT INFORMATION
      // --------------------------------

      let currentY =
        pageState.getContentStartY();

      currentY =
        await drawProductInfo(
          doc,
          product,
          currentY,
          pageState
        );

      // --------------------------------
      // PAGE 1
      // DESCRIPTION
      // --------------------------------

      currentY =
        drawDescription(
          doc,
          product,
          currentY,
          pageState
        );

      // --------------------------------
      // PAGE 2+
      // TECHNICAL SPECIFICATIONS
      // --------------------------------

      pageState.startNewPage();

      currentY =
        pageState.getContentStartY();

      currentY =
        drawSpecifications(
          doc,
          product,
          currentY,
          pageState
        );

      // --------------------------------
      // CONTACT SECTION
      // --------------------------------

      currentY =
        drawContact(
          doc,
          currentY,
          pageState
        );

      // --------------------------------
      // FINISH PDF
      // --------------------------------

      doc.end();

    } catch (error) {
      reject(error);
    }
  });
};

export default generateProductSpecificationPdf;