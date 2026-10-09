
import api from "./api";

export const getAvailableQuotations = async () => {
  const response = await api.get("/api/quotations/public");
  return response.data;
};

export const submitQuotationRequest = async (formData) => {
  const response = await api.post(
    "/api/quotation-requests",
    formData
  );

  return response.data;
};
