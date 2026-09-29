import React, { useState } from "react";

import {
  CheckCircle2,
  Download,
  MoveRight,
  Package,
  X,
} from "lucide-react";

import PhoneInput, {
  isValidPhoneNumber,
} from "react-phone-number-input";

import "react-phone-number-input/style.css";

import api from "../../../services/api";

const CompleteSpecifications = ({
  currentProduct,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  // =========================================
  // EMAIL VALIDATION
  // =========================================

  const validateEmail = (value) => {
    const email = value.trim();

    if (!email) {
      return "Email address is required.";
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailPattern.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  // =========================================
  // NORMAL INPUT CHANGE
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // =========================================
  // PHONE CHANGE
  // =========================================

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || "",
    }));

    setErrors((prev) => ({
      ...prev,
      phone: "",
    }));
  };

  // =========================================
  // FORM SUBMIT
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Prevent duplicate submissions
  if (isSubmitting) {
    return;
  }

    // -----------------------------------------
    // VALIDATE EMAIL
    // -----------------------------------------

    const emailError = validateEmail(
      formData.email
    );

    // -----------------------------------------
    // VALIDATE PHONE
    // -----------------------------------------

    let phoneError = "";

    if (!formData.phone) {
      phoneError = "Phone number is required.";
    } else if (
      !isValidPhoneNumber(formData.phone)
    ) {
      phoneError =
        "Please enter a valid phone number.";
    }

    // -----------------------------------------
    // SET ERRORS
    // -----------------------------------------

    setErrors({
      email: emailError,
      phone: phoneError,
    });

    // -----------------------------------------
    // STOP IF VALIDATION FAILED
    // -----------------------------------------

    if (emailError || phoneError) {
      return;
    }

    // -----------------------------------------
    // CHECK PRODUCT
    // -----------------------------------------

    if (!currentProduct?._id) {
      alert(
        "Product information is not available. Please try again."
      );

      return;
    }

    try {
      setIsSubmitting(true);

      // =======================================
      // API REQUEST
      // =======================================

      const response = await api.post(
        "/api/public/specification-requests",
        {
          productId: currentProduct._id,
          email: formData.email.trim(),
          phone: formData.phone,
        }
      );

      // =======================================
      // SUCCESS
      // =======================================

      if (response.data?.success) {
        alert(
          "Request submitted successfully. Complete specifications will be sent to your email."
        );

        // Clear form
        setFormData({
          email: "",
          phone: "",
        });

        // Clear validation errors
        setErrors({
          email: "",
          phone: "",
        });

        // Close popup
        if (onClose) {
          onClose();
        }
      } else {
        alert(
          response.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Complete specifications request failed:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 px-4 py-6 sm:px-6 sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="complete-specifications-title"
    >
      <div className="relative mx-auto flex min-h-full items-center justify-center">

        <div className="relative w-full max-w-5xl">

          {/* =====================================
              CLOSE BUTTON
          ===================================== */}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full border border-gray-200 bg-white p-2.5 text-gray-500 shadow-md transition hover:bg-gray-100 hover:text-gray-900 sm:right-5 sm:top-5"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          )}

          {/* =====================================
              MAIN CARD
          ===================================== */}

          <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

            <div className="grid lg:grid-cols-2">

              {/* =================================
                  LEFT SIDE
              ================================= */}

              <div className="bg-gray-900 p-8 text-white sm:p-10 lg:p-12">

                <div className="flex h-full flex-col justify-between">

                  <div>

                    <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-3">

                      <Download size={26} />

                    </div>

                    <h2
                      id="complete-specifications-title"
                      className="text-2xl font-bold sm:text-3xl"
                    >
                      Get the Full Technical Details
                    </h2>

                    <p className="mt-5 leading-7 text-gray-300">
                      Receive a detailed PDF containing
                      the complete technical
                      specifications of this model.
                    </p>

                    {/* FEATURES */}

                    <div className="mt-8 space-y-4">

                      <div className="flex items-start gap-3">

                        <CheckCircle2
                          size={20}
                          className="mt-0.5 shrink-0 text-white"
                        />

                        <div>

                          <p className="font-medium">
                            Complete Technical
                            Specifications
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            Detailed machine
                            specifications and
                            technical information.
                          </p>

                        </div>

                      </div>

                      <div className="flex items-start gap-3">

                        <CheckCircle2
                          size={20}
                          className="mt-0.5 shrink-0 text-white"
                        />

                        <div>

                          <p className="font-medium">
                            Dimensions & Performance
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            Machine dimensions,
                            capacity, performance and
                            operating details.
                          </p>

                        </div>

                      </div>

                      <div className="flex items-start gap-3">

                        <CheckCircle2
                          size={20}
                          className="mt-0.5 shrink-0 text-white"
                        />

                        <div>

                          <p className="font-medium">
                            PDF Document
                          </p>

                          <p className="mt-1 text-sm text-gray-400">
                            Receive the complete
                            specification document
                            directly by email.
                          </p>

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* PRODUCT */}

                  <div className="mt-10 border-t border-white/10 pt-6">

                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Product
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                      {currentProduct?.modelName}
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================
                  RIGHT SIDE
              ================================= */}

              <div className="p-8 sm:p-10 lg:p-12">

                <div className="mb-8">

                  <h3 className="text-xl font-bold text-gray-900">
                    Enter Your Details
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Enter your email address and phone
                    number to receive the complete
                    specifications.
                  </p>

                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* ============================
                      EMAIL
                  ============================ */}

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      autoComplete="email"
                      disabled={isSubmitting}
                      className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition ${
                        errors.email
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-gray-700"
                      }`}
                    />

                    {errors.email && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}

                  </div>

                  {/* ============================
                      PHONE
                  ============================ */}

                  <div>

                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                      Phone Number
                    </label>

                    <div
                      className={`w-full rounded-xl border px-4 py-3.5 transition ${
                        errors.phone
                          ? "border-red-500"
                          : "border-gray-300 focus-within:border-gray-700"
                      }`}
                    >

                      <PhoneInput
                        id="phone"
                        international
                        defaultCountry="IN"
                        countryCallingCodeEditable={
                          false
                        }
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        placeholder="Enter phone number"
                        autoComplete="tel"
                        disabled={isSubmitting}
                        className="w-full [&_.PhoneInputInput]:w-full [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:text-sm [&_.PhoneInputInput]:outline-none"
                      />

                    </div>

                    <p className="mt-2 text-xs text-gray-500">
                      Select your country and enter your
                      phone number.
                    </p>

                    {errors.phone && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}

                  </div>

                  {/* ============================
                      SUBMIT
                  ============================ */}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {isSubmitting
                      ? "Submitting..."
                      : "Get Complete Specifications"}

                    {!isSubmitting && (
                      <MoveRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}

                  </button>

                  {/* ============================
                      PRIVACY
                  ============================ */}

                  <p className="text-center text-xs leading-5 text-gray-400">
                    Your contact information will only
                    be used to provide the requested
                    product specifications.
                  </p>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CompleteSpecifications;