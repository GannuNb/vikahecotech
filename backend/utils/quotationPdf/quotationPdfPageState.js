
import quotationPdfHeader from "./quotationPdfHeader.js";
import quotationPdfFooter from "./quotationPdfFooter.js";

const quotationPdfPageState = (
  doc,
  quotation,
  quotationRequest
) => {
  const state = {
    pageNumber: 0,
    left: 45,
    right: doc.page.width - 45,
    top: 115,
    bottom: doc.page.height - 75,

    startPage() {
      if (this.pageNumber > 0) {
        doc.addPage();
      }

      this.pageNumber += 1;

      quotationPdfHeader(doc, quotation, quotationRequest);
      quotationPdfFooter(doc, this.pageNumber);

      doc.fillColor("#111111");
      doc.font("Helvetica");
      doc.y = this.top;

      return this.top;
    },

    ensureAt(y, requiredHeight = 30) {
      if (y + requiredHeight > this.bottom) {
        return this.startPage();
      }

      return y;
    },
  };

  state.startPage();

  return state;
};

export default quotationPdfPageState;
