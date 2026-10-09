
import React, { useEffect, useState } from "react";
import {
  getAvailableQuotations,
  submitQuotationRequest,
} from "../../services/quotationRequestApi";

const initialForm = {
  quotationId: "",
  customerName: "",
  companyName: "",
  email: "",
  mobile: "",
  address: "",
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-[#0f4c5c] focus:bg-white focus:ring-4 focus:ring-[#0f4c5c]/10";

const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

const QuotationRequestForm = () => {
  const [quotations, setQuotations] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loadingQuotations, setLoadingQuotations] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchQuotations = async () => {
      try {
        const data = await getAvailableQuotations();

        if (isMounted) {
          setQuotations(data.quotations || []);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.response?.data?.message ||
              "Unable to load available quotations. Please refresh the page and try again."
          );
        }
      } finally {
        if (isMounted) {
          setLoadingQuotations(false);
        }
      }
    };

    fetchQuotations();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedQuotation = quotations.find(
    (quotation) => quotation._id === form.quotationId
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      setSubmitting(true);

      const result = await submitQuotationRequest(form);

      if (result.quotationRequest?.emailStatus === "failed") {
        setError(
          "Your request was recorded, but the quotation email could not be sent. Please contact our team."
        );
        return;
      }

      setMessage(
        result.message ||
          "Your quotation request has been submitted successfully."
      );
      setForm({ ...initialForm });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit your request. Please check your details and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-[#0b3540] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b3540] via-[#0f4c5c] to-[#176578]" />

        <div className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -right-8 -top-16 h-56 w-56 rounded-full border border-white/10" />
        <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/[0.04] blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-100">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              Vikah Ecotech
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Request Your
              <span className="block text-teal-300">
                Custom Quotation
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-200 sm:text-base">
              Tell us about your requirements. Our quotation document will be
              prepared for your selected plant or machinery and delivered
              directly to your email.
            </p>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-teal-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M7 3.5h7l5 5v12H7z" />
                    <path d="M14 3.5v5h5M10 13h6M10 17h6" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold">Detailed quotation</p>
                  <p className="mt-1 text-xs text-gray-300">
                    Plant and machinery details
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-teal-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-semibold">Email delivery</p>
                  <p className="mt-1 text-xs text-gray-300">
                    PDF sent to your inbox
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form section */}
      <section className="mx-auto mt-10 max-w-7xl px-4 sm:px-8 lg:px-10 sm:mt-12">
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/[0.04]">
            <div className="border-b border-gray-100 px-5 py-6 sm:px-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0f4c5c]/10 text-[#0f4c5c]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-6 w-6"
                    aria-hidden="true"
                  >
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
                  </svg>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Your Details
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Complete the form below to receive your quotation.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              {message && (
                <div
                  role="status"
                  aria-live="polite"
                  className="mb-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                  <p>{message}</p>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12 8v5m0 3h.01M10.3 3.9 2.8 17.1A2 2 0 0 0 4.5 20h15a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                  </svg>
                  <p>{error}</p>
                </div>
              )}

              {loadingQuotations ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <span className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#0f4c5c]" />
                  <p className="mt-4 text-sm font-medium text-gray-600">
                    Loading available quotations...
                  </p>
                </div>
              ) : quotations.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-12 text-center">
                  <p className="font-semibold text-gray-800">
                    No quotations available
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    We currently have no quotations available to request.
                    Please contact our team for assistance.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
                  {/* Quotation selection */}
                  <div>
                    <label htmlFor="quotationId" className={labelClass}>
                      Select Plant / Quotation
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <select
                      id="quotationId"
                      name="quotationId"
                      value={form.quotationId}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">Choose a quotation</option>
                      {quotations.map((quotation) => (
                        <option key={quotation._id} value={quotation._id}>
                          {quotation.quotationName} — {quotation.subject}
                        </option>
                      ))}
                    </select>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Select the plant or machinery for which you need a
                      quotation.
                    </p>
                  </div>

                  {/* Customer information */}
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-6 w-1 rounded-full bg-[#0f4c5c]" />
                      <h3 className="font-bold text-gray-900">
                        Contact Information
                      </h3>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="customerName"
                          className={labelClass}
                        >
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="customerName"
                          name="customerName"
                          type="text"
                          value={form.customerName}
                          onChange={handleChange}
                          required
                          maxLength={100}
                          autoComplete="name"
                          className={inputClass}
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="companyName"
                          className={labelClass}
                        >
                          Company Name
                        </label>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={form.companyName}
                          onChange={handleChange}
                          maxLength={150}
                          autoComplete="organization"
                          className={inputClass}
                          placeholder="Enter your company name"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          maxLength={254}
                          autoComplete="email"
                          className={inputClass}
                          placeholder="name@company.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="mobile" className={labelClass}>
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="mobile"
                          name="mobile"
                          type="tel"
                          value={form.mobile}
                          onChange={handleChange}
                          required
                          maxLength={20}
                          autoComplete="tel"
                          className={inputClass}
                          placeholder="Enter your mobile number"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <span className="h-6 w-1 rounded-full bg-[#0f4c5c]" />
                      <h3 className="font-bold text-gray-900">
                        Address Details
                      </h3>
                    </div>

                    <label htmlFor="address" className={labelClass}>
                      Complete Address{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      rows={4}
                      autoComplete="street-address"
                      className={`${inputClass} resize-y`}
                      placeholder="Enter your street, city, state and PIN code"
                    />
                  </div>

                  {/* Submit */}
                  <div className="border-t border-gray-100 pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0f4c5c] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0f4c5c]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#176578] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#0f4c5c]/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto sm:min-w-64"
                    >
                      {submitting ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          Request Quotation
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14m-6-6 6 6-6 6" />
                          </svg>
                        </>
                      )}
                    </button>

                    <p className="mt-4 text-xs leading-5 text-gray-500">
                      By submitting this form, you agree that our team may
                      contact you regarding your quotation request.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right-side information panel */}
          <aside className="space-y-5 lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-2xl bg-[#0f4c5c] p-6 text-white shadow-lg shadow-[#0f4c5c]/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-teal-200">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="M8 8h8M8 12h8M8 16h5" />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-bold">Quotation Summary</h3>
              <p className="mt-2 text-sm leading-6 text-teal-50/80">
                Review your selected quotation before submitting your details.
              </p>

              <div className="mt-6 rounded-xl border border-white/15 bg-white/[0.06] p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                  Selected quotation
                </p>

                {selectedQuotation ? (
                  <>
                    <p className="mt-3 break-words font-semibold leading-6 text-white">
                      {selectedQuotation.quotationName}
                    </p>
                    <p className="mt-2 break-words text-sm leading-6 text-teal-50/80">
                      {selectedQuotation.subject}
                    </p>
                    {selectedQuotation.quotationDate && (
                      <p className="mt-3 text-xs text-teal-100/70">
                        Date:{" "}
                        {new Date(
                          selectedQuotation.quotationDate
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-teal-50/70">
                    Your selected plant or quotation details will appear here.
                  </p>
                )}
              </div>

              <div className="mt-5 flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-300/15 text-teal-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
                <p className="text-sm leading-6 text-teal-50/90">
                  Your quotation will be generated as a PDF document.
                </p>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-300/15 text-teal-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <p className="text-sm leading-6 text-teal-50/90">
                  The PDF will be sent to the email address you provide.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-[#0f4c5c]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </span>
                <h3 className="font-bold text-gray-900">Your Information</h3>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                Your contact details are used to process your quotation request
                and communicate with you about it.
              </p>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-xs leading-5 text-gray-500">
                  Please ensure your email address and mobile number are
                  correct so we can reach you if needed.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Footer note */}
      <div className="mx-auto mt-10 max-w-7xl px-5 text-center sm:px-8">
        <p className="text-xs leading-6 text-gray-400">
          © {new Date().getFullYear()} Vikah Ecotech. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default QuotationRequestForm;
