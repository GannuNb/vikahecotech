import React, { useState } from "react";

import {
  CheckCircle2,
  Download,
  MoveRight,
  Package,
  X,
} from "lucide-react";

import {
  validateBusinessEmail,
  validatePhone,
} from "../utils/validation";

function CompleteSpecifications({
  product,
  applicationName,
}) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailError = validateBusinessEmail(
      formData.email
    );

    const phoneError = validatePhone(
      formData.phone
    );

    setErrors({
      email: emailError,
      phone: phoneError,
    });

    if (emailError || phoneError) {
      return;
    }

    try {
      setSubmitting(true);

      // Backend API will be added later.
      console.log("Specification request:", {
        productId: product?._id,
        productName: product?.modelName,
        slug: product?.slug,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
      });

      // Temporary simulation
      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      alert(
        "Request submitted successfully. The PDF will be sent to your email."
      );

      setFormData({
        email: "",
        phone: "",
      });

      setShowForm(false);
    } catch (error) {
      console.error(
        "Specification request error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => {
    if (submitting) {
      return;
    }

    setShowForm(false);
  };

  return (
    <>
      {/* =====================================================
          COMPLETE SPECIFICATIONS CTA
      ===================================================== */}

      <section
        id="complete-specifications"
        className="relative overflow-hidden py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-emerald-50 via-white to-sky-50"
      >

        {/* Decorative Background */}

        <div className="absolute -left-32 -bottom-32 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-100/70 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute -right-32 -top-32 w-72 sm:w-96 h-72 sm:h-96 bg-sky-100/70 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

            {/* =================================================
                CTA TEXT
            ================================================= */}

            <div className="min-w-0">

              <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                <span className="w-7 sm:w-8 h-[2px] bg-emerald-500" />
                Get More Details
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">

                Need Complete
                <br className="hidden sm:block" />

                <span className="sm:hidden"> </span>

                Specifications?

              </h2>

              <div className="w-14 sm:w-16 h-1 bg-emerald-500 rounded-full mt-4 sm:mt-5 mb-5 sm:mb-6" />

              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 max-w-xl">
                Get detailed technical specifications and
                complete product information for{" "}
                <span className="font-semibold text-slate-800">
                  {product.modelName}
                </span>
                .
              </p>

              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="mt-6 sm:mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-emerald-600 text-white text-sm sm:text-base font-semibold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20"
              >

                <Download size={18} />

                Get Full Specifications

                <MoveRight size={18} />

              </button>

            </div>

            {/* =================================================
                PRODUCT IMAGE
            ================================================= */}

            <div className="relative w-full min-w-0">

              <div className="absolute inset-0 bg-emerald-200/30 blur-3xl rounded-full scale-75" />

              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white shadow-xl p-3 sm:p-5">

                {product.images?.length > 0 ? (

                  <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-white to-emerald-50">

                    <img
                      src={
                        product.images[
                          product.images.length > 1
                            ? 1
                            : 0
                        ]
                      }
                      alt={product.modelName}
                      className="w-full h-full object-contain p-4 sm:p-6"
                    />

                  </div>

                ) : (

                  <div className="aspect-[4/3] rounded-xl sm:rounded-2xl bg-gradient-to-br from-white to-emerald-50 flex items-center justify-center">

                    <Package
                      size={54}
                      className="text-slate-300"
                    />

                  </div>

                )}

                {/* Product Label */}

                <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-slate-100">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 sm:w-11 sm:h-11 flex-shrink-0 rounded-xl bg-emerald-50 flex items-center justify-center">

                      <CheckCircle2
                        size={21}
                        className="text-emerald-600"
                      />

                    </div>

                    <div className="min-w-0">

                      <p className="font-bold text-slate-900 text-sm sm:text-base truncate">
                        {product.modelName}
                      </p>

                      {applicationName && (
                        <p className="text-xs sm:text-sm text-slate-500 truncate">
                          {applicationName}
                        </p>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          REQUEST FORM
      ===================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 px-4 py-6 overflow-y-auto">

          <div className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl shadow-2xl">

            {/* Close */}

            <button
              type="button"
              onClick={closeForm}
              disabled={submitting}
              className="absolute right-4 top-4 sm:right-5 sm:top-5 w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 transition disabled:opacity-50"
              aria-label="Close"
            >
              <X size={19} />
            </button>

            <div className="p-6 sm:p-8">

              <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-xs uppercase tracking-wider">
                Get More Details
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 pr-10">
                Get Full Specifications
              </h3>

              <div className="w-12 h-1 bg-emerald-500 rounded-full mt-4 mb-5" />

              <p className="text-sm sm:text-base text-slate-600 leading-6">
                Enter your business email and phone number
                to request the complete specifications for{" "}
                <span className="font-semibold text-slate-800">
                  {product.modelName}
                </span>
                .
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-5"
              >

                {/* Email */}

                <div>

                  <label
                    htmlFor="spec-email"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Business Email
                  </label>

                  <input
                    id="spec-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={`w-full px-4 py-3.5 rounded-xl border outline-none text-sm transition ${
                      errors.email
                        ? "border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.email}
                    </p>
                  )}

                </div>

                {/* Phone */}

                <div>

                  <label
                    htmlFor="spec-phone"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Phone Number
                  </label>

                  <input
                    id="spec-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className={`w-full px-4 py-3.5 rounded-xl border outline-none text-sm transition ${
                      errors.phone
                        ? "border-red-500 focus:ring-2 focus:ring-red-100"
                        : "border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    }`}
                  />

                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.phone}
                    </p>
                  )}

                </div>

                {/* Product Information */}

                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">

                  <div className="flex items-start gap-3">

                    <CheckCircle2
                      size={20}
                      className="mt-0.5 text-emerald-600 flex-shrink-0"
                    />

                    <div className="min-w-0">

                      <p className="text-xs text-slate-500">
                        Specification requested for
                      </p>

                      <p className="font-semibold text-slate-900 mt-1 break-words">
                        {product.modelName}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white text-sm sm:text-base font-semibold hover:bg-emerald-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting
                    ? "Submitting..."
                    : "Request Specifications"}
                </button>

                <p className="text-center text-xs text-slate-400 leading-5">
                  Your information will be used only for
                  processing your specification request.
                </p>

              </form>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default CompleteSpecifications;