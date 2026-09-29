import addPdfHeader from "./pdfHeader.js";
import addPdfFooter from "./pdfFooter.js";

const CONTENT_TOP = 112;

const startPdfPage = (
  doc,
  pageState
) => {
  pageState.pageNumber += 1;

  doc.addPage();

  /*
   * Add header immediately.
   */

  addPdfHeader(doc);

  /*
   * Add footer immediately.
   */

  addPdfFooter(
    doc,
    pageState.pageNumber
  );

  /*
   * Content always starts below header.
   */

  doc.y = CONTENT_TOP;
};

const getRemainingHeight = (doc) => {
  return (
    doc.page.height -
    doc.page.margins.bottom -
    doc.y
  );
};

const ensureSpace = (
  doc,
  requiredHeight,
  pageState,
  startPage = startPdfPage
) => {
  const remainingHeight =
    getRemainingHeight(doc);

  if (
    remainingHeight <
    requiredHeight
  ) {
    startPage(
      doc,
      pageState
    );

    return true;
  }

  return false;
};

export {
  CONTENT_TOP,
  startPdfPage,
  getRemainingHeight,
  ensureSpace,
};