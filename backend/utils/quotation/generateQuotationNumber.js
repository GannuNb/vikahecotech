import QuotationRequest from "../../models/quotationRequestModel.js";

const generateQuotationNumber = async () => {
  const year = new Date().getFullYear();

  const prefix = `QTN-${year}-`;

  const latestRequest =
    await QuotationRequest.findOne({
      quotationNumber: {
        $regex: `^${prefix}`,
      },
    })
      .sort({ quotationNumber: -1 })
      .lean();

  let nextNumber = 1;

  if (latestRequest?.quotationNumber) {
    const lastNumber = Number(
      latestRequest.quotationNumber.replace(
        prefix,
        ""
      )
    );

    if (!Number.isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  return `${prefix}${String(nextNumber).padStart(
    5,
    "0"
  )}`;
};

export default generateQuotationNumber;