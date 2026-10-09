import React, { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import QuotationBasicInfo from "../components/quotations/QuotationBasicInfo";
import QuotationInformation from "../components/quotations/QuotationInformation";
import QuotationSpecifications from "../components/quotations/QuotationSpecifications";
import QuotationPricingTables from "../components/quotations/QuotationPricingTables";
import QuotationSummary from "../components/quotations/QuotationSummary";
import QuotationTax from "../components/quotations/QuotationTax";
import QuotationTechnicalSpecifications from "../components/quotations/QuotationTechnicalSpecifications";
import QuotationEditImages from "../components/quotations/QuotationEditImages";
import QuotationBuyerScope from "../components/quotations/QuotationBuyerScope";
import QuotationCommercialTerms from "../components/quotations/QuotationCommercialTerms";

const EditQuotation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // ==================================================
  // FETCH QUOTATION
  // ==================================================

  useEffect(() => {
    const fetchQuotation = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          `/api/quotations/${id}`
        );

        if (!response.data?.success) {
          throw new Error(
            response.data?.message ||
              "Failed to fetch quotation."
          );
        }

        const quotation =
          response.data.quotation;

        // ==================================================
        // SET FORM DATA
        // ==================================================

        setFormData({
          // ==================================================
          // BASIC INFORMATION
          // ==================================================

          quotationName:
            quotation.quotationName || "",

          quotationDate:
            quotation.quotationDate
              ? new Date(
                  quotation.quotationDate
                )
                  .toISOString()
                  .split("T")[0]
              : "",

          subject:
            quotation.subject || "",

          preparedBy:
            quotation.preparedBy || "",

          verifiedBy:
            quotation.verifiedBy || "",

          approvedBy:
            quotation.approvedBy || "",

          // ==================================================
          // INFORMATION
          // ==================================================

          information: {
            description:
              quotation.information
                ?.description || "",
          },

          // ==================================================
          // SPECIFICATIONS
          // ==================================================

          specifications:
            Array.isArray(
              quotation.specifications
            )
              ? quotation.specifications.map(
                  (item, index) => ({
                    id:
                      item.id ||
                      `${Date.now()}-specification-${index}`,

                    label:
                      item.label || "",

                    value:
                      item.value || "",
                  })
                )
              : [],

          // ==================================================
          // PRICING TABLES
          // ==================================================

          pricingTables:
            Array.isArray(
              quotation.pricingTables
            )
              ? quotation.pricingTables.map(
                  (
                    table,
                    tableIndex
                  ) => ({
                    id:
                      table.id ||
                      `${Date.now()}-table-${tableIndex}`,

                    sectionName:
                      table.sectionName || "",

                    machinery:
                      Array.isArray(
                        table.machinery
                      )
                        ? table.machinery.map(
                            (
                              machinery,
                              machineryIndex
                            ) => ({
                              id:
                                machinery.id ||
                                `${Date.now()}-machinery-${tableIndex}-${machineryIndex}`,

                              equipmentDescription:
                                machinery.equipmentDescription ||
                                "",

                              modelNo:
                                machinery.modelNo ||
                                "",

                              power: {
                                display:
                                  machinery
                                    .power
                                    ?.display ||
                                  "",

                                hp:
                                  machinery
                                    .power
                                    ?.hp || 0,
                              },

                              qty:
                                machinery.qty ||
                                1,

                              unitPrice:
                                machinery.unitPrice ||
                                0,

                              totalPrice:
                                machinery.totalPrice ||
                                0,
                            })
                          )
                        : [],
                  })
                )
              : [],

          // ==================================================
          // TAX
          // ==================================================

          tax: {
            name:
              quotation.tax?.name || "",

            percentage:
              quotation.tax?.percentage ||
              0,

            isExtra:
              quotation.tax?.isExtra !== false,
          },

          // ==================================================
          // TECHNICAL SPECIFICATIONS
          // ==================================================

          technicalSpecifications:
            Array.isArray(
              quotation.technicalSpecifications
            )
              ? quotation.technicalSpecifications.map(
                  (
                    section,
                    sectionIndex
                  ) => ({
                    id:
                      section.id ||
                      `${Date.now()}-technical-${sectionIndex}`,

                    title:
                      section.title || "",

                    fields:
                      Array.isArray(
                        section.fields
                      )
                        ? section.fields.map(
                            (
                              field,
                              fieldIndex
                            ) => ({
                              id:
                                field.id ||
                                `${Date.now()}-technical-field-${sectionIndex}-${fieldIndex}`,

                              label:
                                field.label ||
                                "",

                              value:
                                field.value ||
                                "",
                            })
                          )
                        : [],
                  })
                )
              : [],

          // ==================================================
          // NEW IMAGES
          // ==================================================

          images: [],

          referenceImages: [],

          // ==================================================
          // EXISTING S3 IMAGE KEYS
          //
          // These are NOT CloudFront URLs.
          // They are used by the backend for update/delete.
          // ==================================================

          existingImages:
            Array.isArray(
              quotation.imageKeys
            )
              ? quotation.imageKeys
              : [],

          existingReferenceImages:
            Array.isArray(
              quotation.referenceImageKeys
            )
              ? quotation.referenceImageKeys
              : [],

          // ==================================================
          // EXISTING CLOUDFRONT IMAGE URLS
          //
          // These are ONLY used for displaying images.
          // ==================================================

          existingImageUrls:
            Array.isArray(
              quotation.images
            )
              ? quotation.images
              : [],

          existingReferenceImageUrls:
            Array.isArray(
              quotation.referenceImages
            )
              ? quotation.referenceImages
              : [],

          // ==================================================
          // BUYER SCOPE
          // ==================================================

          buyerScope:
            Array.isArray(
              quotation.buyerScope
            )
              ? quotation.buyerScope.map(
                  (item, index) => ({
                    id:
                      item.id ||
                      `${Date.now()}-buyer-${index}`,

                    label:
                      item.label || "",

                    value:
                      item.value || "",
                  })
                )
              : [],

          // ==================================================
          // COMMERCIAL TERMS
          // ==================================================

          commercialTerms:
            Array.isArray(
              quotation.commercialTerms
            )
              ? quotation.commercialTerms.map(
                  (item, index) => ({
                    id:
                      item.id ||
                      `${Date.now()}-commercial-${index}`,

                    label:
                      item.label || "",

                    value:
                      item.value || "",
                  })
                )
              : [],

          // ==================================================
          // STATUS
          // ==================================================

          isActive:
            quotation.isActive !== false,
        });
      } catch (error) {
        console.error(
          "Fetch quotation error:",
          error
        );

        alert(
          error.response?.data?.message ||
            error.message ||
            "Failed to load quotation."
        );

        navigate("/admin/quotations");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuotation();
    }
  }, [id, navigate]);

  // ==================================================
  // VALIDATION
  // ==================================================

  const validateForm = () => {
    if (!formData.quotationName.trim()) {
      alert(
        "Please enter quotation name."
      );

      return false;
    }

    if (!formData.subject.trim()) {
      alert(
        "Please enter quotation subject."
      );

      return false;
    }

    // ==================================================
    // PRICING TABLE VALIDATION
    // ==================================================

    for (
      let tableIndex = 0;
      tableIndex <
      formData.pricingTables.length;
      tableIndex++
    ) {
      const table =
        formData.pricingTables[
          tableIndex
        ];

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
        machineryIndex <
        table.machinery.length;
        machineryIndex++
      ) {
        const machinery =
          table.machinery[
            machineryIndex
          ];

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
            } in pricing table ${
              tableIndex + 1
            }.`
          );

          return false;
        }

        if (
          Number(machinery.unitPrice) < 0
        ) {
          alert(
            `Unit price cannot be negative for item ${
              machineryIndex + 1
            } in pricing table ${
              tableIndex + 1
            }.`
          );

          return false;
        }
      }
    }

    // ==================================================
    // TAX VALIDATION
    // ==================================================

    if (
      Number(formData.tax?.percentage) < 0
    ) {
      alert(
        "Tax percentage cannot be negative."
      );

      return false;
    }

    return true;
  };

  // ==================================================
  // BUILD FORMDATA
  // ==================================================

  const buildFormData = () => {
    const data = new FormData();

    // ==================================================
    // NEW QUOTATION IMAGES
    // ==================================================

    const newImages = Array.isArray(
      formData.images
    )
      ? formData.images.filter(
          (file) => file instanceof File
        )
      : [];

    // ==================================================
    // NEW REFERENCE IMAGES
    // ==================================================

    const newReferenceImages =
      Array.isArray(
        formData.referenceImages
      )
        ? formData.referenceImages.filter(
            (file) => file instanceof File
          )
        : [];

    // ==================================================
    // QUOTATION DATA
    // ==================================================

    const quotationData = {
      ...formData,

      // These are uploaded separately.
      images: [],

      referenceImages: [],

      // These are the original S3 keys
      // that should remain after update.
      existingImages:
        formData.existingImages || [],

      existingReferenceImages:
        formData.existingReferenceImages ||
        [],

      // These are only frontend display values.
      // They should NOT be saved to MongoDB.
      existingImageUrls: undefined,

      existingReferenceImageUrls:
        undefined,
    };

    // Remove frontend-only fields
    delete quotationData.existingImageUrls;

    delete quotationData.existingReferenceImageUrls;

    data.append(
      "quotationData",
      JSON.stringify(quotationData)
    );

    // ==================================================
    // APPEND NEW QUOTATION IMAGES
    // ==================================================

    newImages.forEach((file) => {
      data.append("images", file);
    });

    // ==================================================
    // APPEND NEW REFERENCE IMAGES
    // ==================================================

    newReferenceImages.forEach((file) => {
      data.append(
        "referenceImages",
        file
      );
    });

    return data;
  };

  // ==================================================
  // SAVE CHANGES
  // ==================================================

  const handleSave = async (event) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const data = buildFormData();

      const response = await api.put(
        `/api/quotations/${id}`,
        data
      );

      if (response.data?.success) {
        alert(
          "Quotation updated successfully."
        );

        navigate(
          `/admin/quotations/${id}`
        );

        return;
      }

      throw new Error(
        response.data?.message ||
          "Failed to update quotation."
      );
    } catch (error) {
      console.error(
        "Update quotation error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to update quotation."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-sm font-medium text-gray-600">
          Loading quotation...
        </div>
      </div>
    );
  }

  // ==================================================
  // NOT FOUND
  // ==================================================

  if (!formData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-600">
          Quotation not found.
        </div>
      </div>
    );
  }

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* ==================================================
          PAGE HEADER
          ================================================== */}

      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            navigate(
              `/admin/quotations/${id}`
            )
          }
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft size={18} />

          Back to Quotation
        </button>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Quotation
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Update quotation information,
              pricing, specifications, images
              and commercial details.
            </p>
          </div>

          <button
            type="submit"
            form="edit-quotation-form"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ==================================================
          FORM
          ================================================== */}

      <form
        id="edit-quotation-form"
        onSubmit={handleSave}
        className="space-y-6"
      >
        {/* ==================================================
            BASIC INFORMATION
            ================================================== */}

        <QuotationBasicInfo
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            INFORMATION
            ================================================== */}

        <QuotationInformation
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            SPECIFICATIONS
            ================================================== */}

        <QuotationSpecifications
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            PRICING TABLES
            ================================================== */}

        <QuotationPricingTables
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            SUMMARY
            ================================================== */}

        <QuotationSummary
          formData={formData}
        />

        {/* ==================================================
            TAX
            ================================================== */}

        <QuotationTax
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            TECHNICAL SPECIFICATIONS
            ================================================== */}

        <QuotationTechnicalSpecifications
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            IMAGES
            ================================================== */}

        <QuotationEditImages
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            BUYER SCOPE
            ================================================== */}

        <QuotationBuyerScope
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            COMMERCIAL TERMS
            ================================================== */}

        <QuotationCommercialTerms
          formData={formData}
          setFormData={setFormData}
        />

        {/* ==================================================
            BOTTOM SAVE BUTTON
            ================================================== */}

        <div className="flex justify-end border-t border-gray-200 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuotation;