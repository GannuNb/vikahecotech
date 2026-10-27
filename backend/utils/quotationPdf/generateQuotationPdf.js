
import PDFDocument from "pdfkit";
import drawQuotationPdfHeader from "./pdfHeader.js";
import drawCustomerInfo from "./pdfCustomerInfo.js";
import drawDescription from "./pdfDescription.js";
import drawPricingTable from "./pdfPricingTable.js";
import drawConsolidatedTable from "./pdfConsolidatedTable.js";
import drawTechnicalSpecifications from "./pdfTechnicalSpecifications.js";
import drawMachineryImages from "./pdfMachineryImages.js";
import drawReferenceImages from "./pdfReferenceImages.js";
import drawBuyerScope from "./pdfBuyerScope.js";
import drawCommercialTerms from "./pdfCommercialTerms.js";
import getControlPanelPrice from "../../config/controlPanels/index.js";

const generateQuotationPdf = async (quotationRequest) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: "A4",
        margin: 0,
        autoFirstPage: true,
      });

      const chunks = [];

      doc.on("data", (chunk) => chunks.push(chunk));

      doc.on("end", () => {
        const pdfBuffer = Buffer.concat(chunks);
        const safeQuotationNumber = (
          quotationRequest.quotationNumber ||
          quotationRequest._id ||
          "quotation"
        )
          .toString()
          .replace(/[^a-zA-Z0-9_-]/g, "-");

        resolve({
          pdfBuffer,
          fileName: `${safeQuotationNumber}.pdf`,
        });
      });

      doc.on("error", reject);

      const pageState = {
        pageNumber: 1,
        contentStartY: 125,
        getContentStartY() {
          return this.contentStartY;
        },
        startNewPage() {
          doc.addPage();
          this.pageNumber += 1;
          drawQuotationPdfHeader(
            doc,
            quotationRequest,
            this.pageNumber
          );
        },
      };

      const generate = async () => {
        drawQuotationPdfHeader(
          doc,
          quotationRequest,
          pageState.pageNumber
        );

        let currentY = pageState.getContentStartY();

        currentY = drawCustomerInfo(
          doc,
          quotationRequest,
          currentY
        );

        currentY = drawDescription(
          doc,
          quotationRequest.selectedMachinery,
          currentY,
          pageState
        );

        const applicationSlug =
          quotationRequest.application?.slug || "";

        const controlPanel = getControlPanelPrice(
          applicationSlug,
          quotationRequest.selectedMachinery
        );

        currentY = drawPricingTable(
          doc,
          quotationRequest.selectedMachinery,
          currentY,
          pageState,
          controlPanel
        );

        currentY = drawConsolidatedTable(
          doc,
          quotationRequest.selectedMachinery,
          currentY,
          pageState,
          controlPanel
        );

        currentY = drawTechnicalSpecifications(
          doc,
          quotationRequest.selectedMachinery,
          currentY,
          pageState
        );

        currentY = await drawMachineryImages(
          doc,
          quotationRequest.selectedMachinery,
          currentY,
          pageState
        );

        currentY = await drawReferenceImages(
          doc,
          quotationRequest.selectedMachinery,
          currentY,
          pageState
        );

        currentY = drawBuyerScope(doc, currentY, pageState);
        currentY = drawCommercialTerms(doc, currentY, pageState);

        doc.end();
      };

      generate().catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

export default generateQuotationPdf;
