
import PDFDocument from "pdfkit";

import quotationPdfPageState from "./quotationPdfPageState.js";
import quotationPdfCustomer from "./quotationPdfCustomer.js";
import quotationPdfBasicInfo from "./quotationPdfBasicInfo.js";
import quotationPdfDescription from "./quotationPdfDescription.js";
import quotationPdfSpecifications from "./quotationPdfSpecifications.js";
import quotationPdfPricing from "./quotationPdfPricing.js";
import quotationPdfTechnicalSpecifications from "./quotationPdfTechnicalSpecifications.js";
import quotationPdfImages from "./quotationPdfImages.js";
import quotationPdfBuyerScope from "./quotationPdfBuyerScope.js";
import quotationPdfCommercialTerms from "./quotationPdfCommercialTerms.js";

const generateQuotationPdf = async (quotation, quotationRequest) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
      autoFirstPage: true,
    });

    const chunks = [];
    let settled = false;

    doc.on("data", (chunk) => chunks.push(chunk));

    doc.on("error", (error) => {
      if (!settled) {
        settled = true;
        reject(error);
      }
    });

    doc.on("end", () => {
      if (!settled) {
        settled = true;
        resolve(Buffer.concat(chunks));
      }
    });

    const run = async () => {
      try {
        const pageState = quotationPdfPageState(
          doc,
          quotation,
          quotationRequest
        );

        let y = pageState.top;

        y = quotationPdfCustomer(
          doc,
          quotationRequest,
          pageState,
          y
        );

        y = quotationPdfBasicInfo(
          doc,
          quotation,
          pageState,
          y
        );

        y = quotationPdfDescription(
          doc,
          quotation,
          pageState,
          y
        );

        y = quotationPdfSpecifications(
          doc,
          quotation,
          pageState,
          y
        );

        y = quotationPdfPricing(
          doc,
          quotation,
          pageState,
          y
        );

        y = quotationPdfTechnicalSpecifications(
          doc,
          quotation,
          pageState,
          y
        );

        y = await quotationPdfImages(
          doc,
          quotation,
          pageState,
          y
        );

        y = quotationPdfBuyerScope(
          doc,
          quotation,
          pageState,
          y
        );

        quotationPdfCommercialTerms(
          doc,
          quotation,
          pageState,
          y
        );

        doc.end();
      } catch (error) {
        if (!settled) {
          settled = true;
          reject(error);
        }

        doc.destroy();
      }
    };

    run();
  });
};

export default generateQuotationPdf;
