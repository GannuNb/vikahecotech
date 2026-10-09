import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

const ViewQuotation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // FETCH QUOTATION
  // --------------------------------------------------

  const fetchQuotation = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/api/quotations/${id}`
      );

      if (response.data?.success) {
        setQuotation(
          response.data.quotation
        );
      }
    } catch (error) {
      console.error(
        "Fetch quotation error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch quotation."
      );

      navigate("/admin/quotations");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    fetchQuotation();
  }, [id]);

  // --------------------------------------------------
  // FORMAT CURRENCY
  // --------------------------------------------------

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);
  };

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // CLOUDFRONT IMAGE URL
  // --------------------------------------------------

  const getImageUrl = (key) => {
    if (!key) {
      return "";
    }

    if (
      key.startsWith("http://") ||
      key.startsWith("https://")
    ) {
      return key;
    }

    const cloudFrontUrl =
      process.env.REACT_APP_CLOUDFRONT_URL;

    if (!cloudFrontUrl) {
      return key;
    }

    return `${cloudFrontUrl}/${key}`;
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="text-sm text-gray-500">
              Loading quotation...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!quotation) {
    return null;
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <button
            type="button"
            onClick={() =>
              navigate("/admin/quotations")
            }
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={18} />

            Back to Quotations
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            {quotation.quotationName}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Quotation preview
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/admin/quotations/${quotation._id}/edit`
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Edit size={18} />

          Edit Quotation
        </button>
      </div>

      {/* ========================================== */}
      {/* QUOTATION DOCUMENT */}
      {/* ========================================== */}

      <div className="mx-auto max-w-6xl space-y-6">
        {/* ======================================== */}
        {/* BASIC INFORMATION */}
        {/* ======================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <FileText
                size={20}
                className="text-blue-600"
              />

              <h2 className="text-lg font-semibold text-gray-900">
                Quotation Information
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <InfoItem
              label="Quotation Name"
              value={
                quotation.quotationName
              }
            />

            <InfoItem
              label="Quotation Date"
              value={formatDate(
                quotation.quotationDate
              )}
            />

            <div className="md:col-span-2">
              <InfoItem
                label="Subject"
                value={
                  quotation.subject
                }
              />
            </div>

            <InfoItem
              label="Prepared By"
              value={
                quotation.preparedBy
              }
            />

            <InfoItem
              label="Verified By"
              value={
                quotation.verifiedBy
              }
            />

            <InfoItem
              label="Approved By"
              value={
                quotation.approvedBy
              }
            />

            <InfoItem
              label="Status"
              value={
                quotation.isActive
                  ? "Active"
                  : "Inactive"
              }
            />
          </div>
        </section>

        {/* ======================================== */}
        {/* INFORMATION */}
        {/* ======================================== */}

        {quotation.information
          ?.description && (
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <SectionTitle title="Information" />

            <div className="whitespace-pre-wrap px-6 py-5 text-sm leading-7 text-gray-700">
              {
                quotation.information
                  .description
              }
            </div>
          </section>
        )}

        {/* ======================================== */}
        {/* SPECIFICATIONS */}
        {/* ======================================== */}

        {quotation.specifications
          ?.length > 0 && (
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <SectionTitle title="Specifications" />

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Specification
                    </th>

                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Value
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {quotation.specifications.map(
                    (item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                          {item.label ||
                            "-"}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.value ||
                            "-"}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ======================================== */}
        {/* PRICING TABLES */}
        {/* ======================================== */}

        {quotation.pricingTables
          ?.length > 0 && (
          <section className="space-y-6">
            <SectionTitle
              title="Pricing & Equipment"
            />

            {quotation.pricingTables.map(
              (table, tableIndex) => (
                <div
                  key={tableIndex}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="font-semibold text-gray-900">
                      {table.sectionName}
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                      <thead className="bg-white">
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                            #
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                            Equipment
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                            Model
                          </th>

                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500">
                            Power
                          </th>

                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                            Qty
                          </th>

                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                            Unit Price
                          </th>

                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500">
                            Total
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {(
                          table.machinery ||
                          []
                        ).map(
                          (
                            item,
                            itemIndex
                          ) => (
                            <tr
                              key={
                                itemIndex
                              }
                            >
                              <td className="px-4 py-4 text-sm text-gray-500">
                                {itemIndex +
                                  1}
                              </td>

                              <td className="px-4 py-4 text-sm font-medium text-gray-800">
                                {
                                  item.equipmentDescription
                                }
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-600">
                                {item.modelNo ||
                                  "-"}
                              </td>

                              <td className="px-4 py-4 text-sm text-gray-600">
                                {item.power
                                  ?.display ||
                                  (item.power
                                    ?.hp
                                    ? `${item.power.hp} HP`
                                    : "-")}
                              </td>

                              <td className="px-4 py-4 text-right text-sm text-gray-700">
                                {
                                  item.qty
                                }
                              </td>

                              <td className="px-4 py-4 text-right text-sm text-gray-700">
                                {formatCurrency(
                                  item.unitPrice
                                )}
                              </td>

                              <td className="px-4 py-4 text-right text-sm font-semibold text-gray-900">
                                {formatCurrency(
                                  item.totalPrice
                                )}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>

                      <tfoot className="border-t border-gray-200 bg-gray-50">
                        <tr>
                          <td
                            colSpan="4"
                            className="px-4 py-3 text-right text-sm font-semibold text-gray-700"
                          >
                            Section Total
                          </td>

                          <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800">
                            {
                              table.totalQty
                            }
                          </td>

                          <td className="px-4 py-3 text-right text-sm text-gray-600">
                            {
                              table.totalHp
                            }{" "}
                            HP
                          </td>

                          <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                            {formatCurrency(
                              table.totalCost
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )
            )}
          </section>
        )}

        {/* ======================================== */}
        {/* TOTALS */}
        {/* ======================================== */}

        <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <SectionTitle title="Quotation Summary" />

          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="Total Equipment"
              value={
                quotation.totalEquipmentQty
              }
            />

            <SummaryCard
              label="Total HP"
              value={`${quotation.totalHp || 0} HP`}
            />

            <SummaryCard
              label="Subtotal"
              value={formatCurrency(
                quotation.grandTotal
              )}
            />

            <SummaryCard
              label="Final Total"
              value={formatCurrency(
                quotation.finalTotal ??
                  quotation.grandTotal
              )}
            />
          </div>

          {/* Tax */}

          {quotation.tax?.isExtra &&
            Number(
              quotation.tax?.percentage
            ) > 0 && (
              <div className="border-t border-gray-200 px-6 py-5">
                <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-gray-600">
                    {quotation.tax.name ||
                      "Tax"}{" "}
                    (
                    {
                      quotation.tax
                        .percentage
                    }
                    %)
                  </span>

                  <span className="font-semibold text-gray-900">
                    {formatCurrency(
                      quotation.taxAmount
                    )}
                  </span>
                </div>
              </div>
            )}
        </section>

        {/* ======================================== */}
        {/* TECHNICAL SPECIFICATIONS */}
        {/* ======================================== */}

        {quotation
          .technicalSpecifications
          ?.length > 0 && (
          <section className="space-y-4">
            <SectionTitle
              title="Technical Specifications"
            />

            {quotation.technicalSpecifications.map(
              (section, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                    <h3 className="font-semibold text-gray-900">
                      {section.title ||
                        `Technical Specification ${
                          index + 1
                        }`}
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody className="divide-y divide-gray-100">
                        {(
                          section.fields ||
                          []
                        ).map(
                          (
                            field,
                            fieldIndex
                          ) => (
                            <tr
                              key={
                                fieldIndex
                              }
                            >
                              <td className="w-1/3 px-6 py-4 text-sm font-medium text-gray-800">
                                {
                                  field.label
                                }
                              </td>

                              <td className="whitespace-pre-wrap px-6 py-4 text-sm text-gray-600">
                                {
                                  field.value
                                }
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            )}
          </section>
        )}

        {/* ======================================== */}
        {/* QUOTATION IMAGES */}
        {/* ======================================== */}

        {quotation.images
          ?.length > 0 && (
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <SectionTitle
              title="Quotation Images"
            />

            <ImageGrid
              images={quotation.images}
              getImageUrl={getImageUrl}
            />
          </section>
        )}

        {/* ======================================== */}
        {/* REFERENCE IMAGES */}
        {/* ======================================== */}

        {quotation.referenceImages
          ?.length > 0 && (
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <SectionTitle
              title="Reference Images"
            />

            <ImageGrid
              images={
                quotation.referenceImages
              }
              getImageUrl={getImageUrl}
            />
          </section>
        )}

        {/* ======================================== */}
        {/* BUYER SCOPE */}
        {/* ======================================== */}

        {quotation.buyerScope
          ?.length > 0 && (
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <SectionTitle title="Buyer Scope" />

            <div className="divide-y divide-gray-100">
              {quotation.buyerScope.map(
                (item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-2 px-6 py-4 md:grid-cols-3"
                  >
                    <div className="font-medium text-gray-800">
                      {item.label}
                    </div>

                    <div className="whitespace-pre-wrap text-sm leading-6 text-gray-600 md:col-span-2">
                      {item.value}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* ======================================== */}
        {/* COMMERCIAL TERMS */}
        {/* ======================================== */}

        {quotation.commercialTerms
          ?.length > 0 && (
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <SectionTitle
              title="Commercial Terms"
            />

            <div className="divide-y divide-gray-100">
              {quotation.commercialTerms.map(
                (item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 gap-2 px-6 py-4 md:grid-cols-3"
                  >
                    <div className="font-medium text-gray-800">
                      {item.label}
                    </div>

                    <div className="whitespace-pre-wrap text-sm leading-6 text-gray-600 md:col-span-2">
                      {item.value}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* ======================================== */}
        {/* BOTTOM ACTION */}
        {/* ======================================== */}

        <div className="flex justify-end pb-8">
          <button
            type="button"
            onClick={() =>
              navigate(
                `/admin/quotations/${quotation._id}/edit`
              )
            }
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Edit size={18} />

            Edit Quotation
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================================================
// INFO ITEM
// ==================================================

const InfoItem = ({
  label,
  value,
}) => {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
};

// ==================================================
// SECTION TITLE
// ==================================================

const SectionTitle = ({
  title,
}) => {
  return (
    <div className="border-b border-gray-200 px-6 py-5">
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>
    </div>
  );
};

// ==================================================
// SUMMARY CARD
// ==================================================

const SummaryCard = ({
  label,
  value,
}) => {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-gray-900">
        {value}
      </p>
    </div>
  );
};

// ==================================================
// IMAGE GRID
// ==================================================

const ImageGrid = ({
  images,
  getImageUrl,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => {
        const imageUrl =
          getImageUrl(image);

        return (
          <div
            key={`${image}-${index}`}
            className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`Quotation ${
                  index + 1
                }`}
                className="h-56 w-full object-contain"
              />
            ) : (
              <div className="flex h-56 items-center justify-center text-gray-400">
                <ImageIcon size={32} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ViewQuotation;