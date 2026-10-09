import React from "react";

const QuotationSummary = ({ formData }) => {
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
  // Calculate Overall Totals
  // --------------------------------------------------

  const calculateTotals = () => {
    let totalEquipmentQty = 0;
    let totalHp = 0;
    let grandTotal = 0;

    (formData.pricingTables || []).forEach((table) => {
      (table.machinery || []).forEach((machinery) => {
        const qty = Number(machinery.qty) || 0;

        const hp = Number(machinery.power?.hp) || 0;

        const unitPrice =
          Number(machinery.unitPrice) || 0;

        const totalPrice = qty * unitPrice;

        totalEquipmentQty += qty;

        totalHp += hp * qty;

        grandTotal += totalPrice;
      });
    });

    return {
      totalEquipmentQty,
      totalHp,
      grandTotal,
    };
  };

  const totals = calculateTotals();

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* --------------------------------------------------
          Header
      -------------------------------------------------- */}

      <div className="flex items-start gap-3 border-b border-gray-200 px-5 py-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
          5
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Quotation Summary
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            Review the overall equipment quantity, HP and quotation amount.
          </p>
        </div>
      </div>

      {/* --------------------------------------------------
          Summary
      -------------------------------------------------- */}

      <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-3">
        {/* Total Equipment */}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Total Equipment Qty
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {totals.totalEquipmentQty}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Total quantity across all pricing tables
          </p>
        </div>

        {/* Total HP */}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Total HP
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {totals.totalHp}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Total calculated horsepower
          </p>
        </div>

        {/* Grand Total */}

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Grand Total
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            ₹ {formatCurrency(totals.grandTotal)}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Before additional tax
          </p>
        </div>
      </div>

      {/* --------------------------------------------------
          Detailed Total
      -------------------------------------------------- */}

      <div className="border-t border-gray-200 p-5">
        <div className="ml-auto w-full max-w-md space-y-3">
          {/* Equipment Quantity */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Total Equipment Qty
            </span>

            <span className="font-medium text-gray-800">
              {totals.totalEquipmentQty}
            </span>
          </div>

          {/* Total HP */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Total HP
            </span>

            <span className="font-medium text-gray-800">
              {totals.totalHp}
            </span>
          </div>

          {/* Subtotal */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Subtotal
            </span>

            <span className="font-medium text-gray-800">
              ₹ {formatCurrency(totals.grandTotal)}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-gray-900">
                Total Amount
              </span>

              <span className="text-lg font-bold text-gray-900">
                ₹ {formatCurrency(totals.grandTotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotationSummary;