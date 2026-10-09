import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import QuotationBasicInfo from "../components/quotations/QuotationBasicInfo";
import QuotationInformation from "../components/quotations/QuotationInformation";
import QuotationSpecifications from "../components/quotations/QuotationSpecifications";
import QuotationPricingTables from "../components/quotations/QuotationPricingTables";
import QuotationSummary from "../components/quotations/QuotationSummary";
import QuotationTax from "../components/quotations/QuotationTax";
import QuotationTechnicalSpecifications from "../components/quotations/QuotationTechnicalSpecifications";
import QuotationImages from "../components/quotations/QuotationImages";
import QuotationBuyerScope from "../components/quotations/QuotationBuyerScope";
import QuotationCommercialTerms from "../components/quotations/QuotationCommercialTerms";

const CreateQuotation = () => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // FORM DATA
  // --------------------------------------------------

  const [formData, setFormData] = useState({
    quotationName: "",

    quotationDate: new Date()
      .toISOString()
      .split("T")[0],

    subject: "",

    preparedBy: "",

    verifiedBy: "",

    approvedBy: "",

    information: {
      description: "",
    },

    specifications: [
      {
        id: `${Date.now()}-specification`,
        label: "",
        value: "",
      },
    ],

    pricingTables: [],

    tax: {
      name: "",
      percentage: 0,
      isExtra: true,
    },

    technicalSpecifications: [],

    images: [],

    referenceImages: [],

    buyerScope: [],

    commercialTerms: [],
  });

  // --------------------------------------------------
  // SAVING STATE
  // --------------------------------------------------

  const [saving, setSaving] = useState(false);

  // --------------------------------------------------
  // VALIDATION
  // --------------------------------------------------

  const validateForm = () => {
    if (!formData.quotationName.trim()) {
      alert("Please enter quotation name.");
      return false;
    }

    if (!formData.subject.trim()) {
      alert("Please enter quotation subject.");
      return false;
    }

    // ----------------------------------------------
    // Pricing Tables
    // ----------------------------------------------

    for (
      let tableIndex = 0;
      tableIndex < formData.pricingTables.length;
      tableIndex++
    ) {
      const table =
        formData.pricingTables[tableIndex];

      if (!table.sectionName?.trim()) {
        alert(
          `Please enter section name for pricing table ${
            tableIndex + 1
          }.`
        );

        return false;
      }

      if (
        !table.machinery ||
        table.machinery.length === 0
      ) {
        alert(
          `Please add at least one machinery item to pricing table ${
            tableIndex + 1
          }.`
        );

        return false;
      }

      for (
        let machineryIndex = 0;
        machineryIndex < table.machinery.length;
        machineryIndex++
      ) {
        const machinery =
          table.machinery[machineryIndex];

        if (
          !machinery.equipmentDescription?.trim()
        ) {
          alert(
            `Please enter equipment description for item ${
              machineryIndex + 1
            } in pricing table ${
              tableIndex + 1
            }.`
          );

          return false;
        }

        if (Number(machinery.qty) < 1) {
          alert(
            `Quantity must be at least 1 for item ${
              machineryIndex + 1
            }.`
          );

          return false;
        }

        if (Number(machinery.unitPrice) < 0) {
          alert(
            `Unit price cannot be negative for item ${
              machineryIndex + 1
            }.`
          );

          return false;
        }
      }
    }

    // ----------------------------------------------
    // Tax
    // ----------------------------------------------

    if (Number(formData.tax?.percentage) < 0) {
      alert("Tax percentage cannot be negative.");
      return false;
    }

    return true;
  };

  // --------------------------------------------------
  // BUILD FORMDATA
  // --------------------------------------------------

  const buildFormData = () => {
    const data = new FormData();

    // ----------------------------------------------
    // Get actual browser files
    // ----------------------------------------------

    const quotationImages =
      Array.isArray(formData.images)
        ? formData.images.filter(
            (file) => file instanceof File
          )
        : [];

    const referenceImages =
      Array.isArray(formData.referenceImages)
        ? formData.referenceImages.filter(
            (file) => file instanceof File
          )
        : [];

    // ----------------------------------------------
    // Prepare JSON quotation data
    //
    // File objects must NOT be placed inside JSON.
    // ----------------------------------------------

    const quotationData = {
      ...formData,

      images: [],

      referenceImages: [],
    };

    // ----------------------------------------------
    // Add quotation JSON
    // ----------------------------------------------

    data.append(
      "quotationData",
      JSON.stringify(quotationData)
    );

    // ----------------------------------------------
    // Add quotation images
    // ----------------------------------------------

    quotationImages.forEach((file) => {
      data.append("images", file);
    });

    // ----------------------------------------------
    // Add reference images
    // ----------------------------------------------

    referenceImages.forEach((file) => {
      data.append("referenceImages", file);
    });

    return data;
  };

  // --------------------------------------------------
  // SAVE QUOTATION
  // --------------------------------------------------

  const handleSave = async (event) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    // ----------------------------------------------
    // Validate
    // ----------------------------------------------

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    setSaving(true);

    try {
      // --------------------------------------------
      // Build FormData
      // --------------------------------------------

      const data = buildFormData();

      // --------------------------------------------
      // POST TO BACKEND
      //
      // api.js automatically:
      // - uses REACT_APP_API_URL
      // - adds adminToken
      // - handles FormData Content-Type
      // --------------------------------------------

      const response = await api.post(
        "/api/quotations",
        data
      );

      // --------------------------------------------
      // Success
      // --------------------------------------------

      if (response.data?.success) {
        alert(
          "Quotation created successfully."
        );

        navigate("/admin/quotations");

        return;
      }

      throw new Error(
        response.data?.message ||
          "Failed to create quotation."
      );
    } catch (error) {
      console.error(
        "Save quotation error:",
        error
      );

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to create quotation.";

      alert(message);
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            navigate("/admin/quotations")
          }
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />

          Back to Quotations
        </button>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Create Quotation
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Create and manage quotation
              information, pricing, images,
              technical specifications and
              commercial terms.
            </p>
          </div>

          <button
            type="submit"
            form="quotation-form"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Quotation"}
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* QUOTATION FORM */}
      {/* ========================================== */}

      <form
        id="quotation-form"
        onSubmit={handleSave}
        className="space-y-6"
      >
        {/* ======================================== */}
        {/* BASIC INFORMATION */}
        {/* ======================================== */}

        <QuotationBasicInfo
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* INFORMATION */}
        {/* ======================================== */}

        <QuotationInformation
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* SPECIFICATIONS */}
        {/* ======================================== */}

        <QuotationSpecifications
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* PRICING TABLES */}
        {/* ======================================== */}

        <QuotationPricingTables
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* SUMMARY */}
        {/* ======================================== */}

        <QuotationSummary
          formData={formData}
        />

        {/* ======================================== */}
        {/* TAX */}
        {/* ======================================== */}

        <QuotationTax
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* TECHNICAL SPECIFICATIONS */}
        {/* ======================================== */}

        <QuotationTechnicalSpecifications
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* IMAGES */}
        {/* ======================================== */}

        <QuotationImages
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* BUYER SCOPE */}
        {/* ======================================== */}

        <QuotationBuyerScope
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* COMMERCIAL TERMS */}
        {/* ======================================== */}

        <QuotationCommercialTerms
          formData={formData}
          setFormData={setFormData}
        />

        {/* ======================================== */}
        {/* BOTTOM SAVE BUTTON */}
        {/* ======================================== */}

        <div className="flex justify-end border-t border-gray-200 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Quotation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuotation;