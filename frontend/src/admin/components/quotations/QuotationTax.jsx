import React from "react";

const QuotationTax = ({ formData, setFormData }) => {
  // --------------------------------------------------
  // Currency Formatter
  // --------------------------------------------------

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // --------------------------------------------------
  // Calculate Subtotal
  // --------------------------------------------------

  const calculateSubtotal = () => {
    let subtotal = 0;

    (formData.pricingTables || []).forEach((table) => {
      (table.machinery || []).forEach((machinery) => {
        const qty = Number(machinery.qty) || 0;

        const unitPrice =
          Number(machinery.unitPrice) || 0;

        subtotal += qty * unitPrice;
      });
    });

    return subtotal;
  };

  const subtotal = calculateSubtotal();

  // --------------------------------------------------
  // Tax Values
  // --------------------------------------------------

  const taxName = formData.tax?.name || "";

  const taxPercentage =
    Number(formData.tax?.percentage) || 0;

  const isTaxExtra =
    formData.tax?.isExtra ?? true;

  // --------------------------------------------------
  // Calculate Tax Amount
  // --------------------------------------------------

  const taxAmount = isTaxExtra
    ? (subtotal * taxPercentage) / 100
    : 0;

  // --------------------------------------------------
  // Final Total
  // --------------------------------------------------

  const finalTotal =
    subtotal + taxAmount;

  // --------------------------------------------------
  // Update Tax
  // --------------------------------------------------

  const updateTax = (field, value) => {
    setFormData((prev) => ({
      ...prev,

      tax: {
        ...prev.tax,

        [field]: value,
      },
    }));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* --------------------------------------------------
          Header
      -------------------------------------------------- */}

      <div className="flex items-start gap-3 border-b border-gray-200 px-5 py-4">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
          6
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Tax & Final Amount
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            Add tax details and review the final quotation amount.
          </p>
        </div>

      </div>

      {/* --------------------------------------------------
          Tax Form
      -------------------------------------------------- */}

      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">

        {/* Tax Name */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Tax Name
          </label>

          <input
            type="text"
            value={taxName}
            onChange={(e) =>
              updateTax(
                "name",
                e.target.value
              )
            }
            placeholder="GST"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />

          <p className="mt-1 text-xs text-gray-500">
            Example: GST, IGST, CGST + SGST
          </p>
        </div>

        {/* Tax Percentage */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Tax Percentage
          </label>

          <div className="relative">

            <input
              type="number"
              min="0"
              step="0.01"
              value={
                formData.tax?.percentage ?? 0
              }
              onChange={(e) =>
                updateTax(
                  "percentage",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
            />

            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              %
            </span>

          </div>

          <p className="mt-1 text-xs text-gray-500">
            Enter the applicable tax percentage.
          </p>
        </div>

        {/* Tax Extra */}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Add Tax to Total
          </label>

          <select
            value={
              isTaxExtra
                ? "true"
                : "false"
            }
            onChange={(e) =>
              updateTax(
                "isExtra",
                e.target.value === "true"
              )
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          >
            <option value="true">
              Yes
            </option>

            <option value="false">
              No
            </option>
          </select>

          <p className="mt-1 text-xs text-gray-500">
            Select whether tax should be added to the quotation amount.
          </p>
        </div>

      </div>

      {/* --------------------------------------------------
          Amount Summary
      -------------------------------------------------- */}

      <div className="border-t border-gray-200 bg-gray-50 p-5">

        <div className="ml-auto w-full max-w-md space-y-3">

          {/* Subtotal */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Subtotal
            </span>

            <span className="font-medium text-gray-800">
              ₹ {formatCurrency(subtotal)}
            </span>
          </div>

          {/* Tax */}

          <div className="flex items-center justify-between text-sm">

            <span className="text-gray-500">
              {taxName || "Tax"}{" "}
              {taxPercentage > 0
                ? `(${taxPercentage}%)`
                : ""}
            </span>

            <span className="font-medium text-gray-800">
              ₹ {formatCurrency(taxAmount)}
            </span>

          </div>

          {/* Final Total */}

          <div className="border-t border-gray-200 pt-3">

            <div className="flex items-center justify-between">

              <span className="text-base font-semibold text-gray-900">
                Final Total
              </span>

              <span className="text-xl font-bold text-gray-900">
                ₹ {formatCurrency(finalTotal)}
              </span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default QuotationTax;