import React from "react";
import { Plus, Trash2 } from "lucide-react";

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const createMachinery = () => ({
  id: createId(),

  equipmentDescription: "",

  modelNo: "",

  power: {
    display: "",
    hp: 0,
  },

  qty: 1,

  unitPrice: 0,
});

const createPricingTable = () => ({
  id: createId(),

  sectionName: "",

  machinery: [createMachinery()],
});

const QuotationPricingTables = ({ formData, setFormData }) => {
  // --------------------------------------------------
  // Currency
  // --------------------------------------------------

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // --------------------------------------------------
  // Row Calculations
  // --------------------------------------------------

  const calculateRowTotal = (machinery) => {
    const qty = Number(machinery.qty) || 0;
    const unitPrice = Number(machinery.unitPrice) || 0;

    return qty * unitPrice;
  };

  const calculateRowHp = (machinery) => {
    const qty = Number(machinery.qty) || 0;
    const hp = Number(machinery.power?.hp) || 0;

    return qty * hp;
  };

  // --------------------------------------------------
  // Table Calculations
  // --------------------------------------------------

  const calculateTableTotals = (table) => {
    return table.machinery.reduce(
      (totals, machinery) => {
        totals.qty += Number(machinery.qty) || 0;

        totals.hp += calculateRowHp(machinery);

        totals.cost += calculateRowTotal(machinery);

        return totals;
      },
      {
        qty: 0,
        hp: 0,
        cost: 0,
      }
    );
  };

  // --------------------------------------------------
  // Add Pricing Table
  // --------------------------------------------------

  const addPricingTable = () => {
    setFormData((prev) => ({
      ...prev,

      pricingTables: [
        ...prev.pricingTables,

        createPricingTable(),
      ],
    }));
  };

  // --------------------------------------------------
  // Remove Pricing Table
  // --------------------------------------------------

  const removePricingTable = (tableId) => {
    setFormData((prev) => {
      if (prev.pricingTables.length === 1) {
        return prev;
      }

      return {
        ...prev,

        pricingTables: prev.pricingTables.filter(
          (table) => table.id !== tableId
        ),
      };
    });
  };

  // --------------------------------------------------
  // Update Pricing Table
  // --------------------------------------------------

  const updatePricingTable = (
    tableId,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,

      pricingTables: prev.pricingTables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              [field]: value,
            }
          : table
      ),
    }));
  };

  // --------------------------------------------------
  // Add Machinery
  // --------------------------------------------------

  const addMachinery = (tableId) => {
    setFormData((prev) => ({
      ...prev,

      pricingTables: prev.pricingTables.map((table) =>
        table.id === tableId
          ? {
              ...table,

              machinery: [
                ...table.machinery,

                createMachinery(),
              ],
            }
          : table
      ),
    }));
  };

  // --------------------------------------------------
  // Remove Machinery
  // --------------------------------------------------

  const removeMachinery = (
    tableId,
    machineryId
  ) => {
    setFormData((prev) => ({
      ...prev,

      pricingTables: prev.pricingTables.map((table) =>
        table.id === tableId
          ? {
              ...table,

              machinery:
                table.machinery.length === 1
                  ? table.machinery
                  : table.machinery.filter(
                      (item) =>
                        item.id !== machineryId
                    ),
            }
          : table
      ),
    }));
  };

  // --------------------------------------------------
  // Update Machinery
  // --------------------------------------------------

  const updateMachinery = (
    tableId,
    machineryId,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,

      pricingTables: prev.pricingTables.map((table) =>
        table.id === tableId
          ? {
              ...table,

              machinery: table.machinery.map(
                (item) =>
                  item.id === machineryId
                    ? {
                        ...item,
                        [field]: value,
                      }
                    : item
              ),
            }
          : table
      ),
    }));
  };

  // --------------------------------------------------
  // Update Machinery Power
  // --------------------------------------------------

  const updateMachineryPower = (
    tableId,
    machineryId,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,

      pricingTables: prev.pricingTables.map((table) =>
        table.id === tableId
          ? {
              ...table,

              machinery: table.machinery.map(
                (item) =>
                  item.id === machineryId
                    ? {
                        ...item,

                        power: {
                          ...item.power,
                          [field]: value,
                        },
                      }
                    : item
              ),
            }
          : table
      ),
    }));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* --------------------------------------------------
          Header
      -------------------------------------------------- */}

      <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-start gap-3">

          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
            4
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Pricing Tables
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Add multiple pricing sections and unlimited machinery rows.
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={addPricingTable}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
        >
          <Plus size={15} />

          Add Pricing Table
        </button>

      </div>

      {/* --------------------------------------------------
          Content
      -------------------------------------------------- */}

      <div className="space-y-6 p-5">

        {/* No Pricing Tables */}

        {formData.pricingTables.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center">

            <p className="text-sm font-medium text-gray-700">
              No pricing tables added
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Add a pricing table to start adding machinery.
            </p>

            <button
              type="button"
              onClick={addPricingTable}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
            >
              <Plus size={15} />

              Add Pricing Table
            </button>

          </div>
        )}

        {/* --------------------------------------------------
            Pricing Tables
        -------------------------------------------------- */}

        {formData.pricingTables.map(
          (table, tableIndex) => {
            const tableTotals =
              calculateTableTotals(table);

            return (
              <div
                key={table.id}
                className="overflow-hidden rounded-xl border border-gray-200"
              >

                {/* --------------------------------------------------
                    Table Header
                -------------------------------------------------- */}

                <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-end sm:justify-between">

                  <div className="w-full sm:max-w-xl">

                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Section Name {tableIndex + 1}

                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      value={table.sectionName}
                      onChange={(e) =>
                        updatePricingTable(
                          table.id,
                          "sectionName",
                          e.target.value
                        )
                      }
                      placeholder="Main Equipment"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removePricingTable(table.id)
                    }
                    disabled={
                      formData.pricingTables.length === 1
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 size={15} />

                    Remove Table
                  </button>

                </div>

                {/* --------------------------------------------------
                    Pricing Table
                -------------------------------------------------- */}

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[1100px] text-left">

                    <thead className="bg-white">

                      <tr className="border-b border-gray-200">

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          SR. NO.
                        </th>

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Equipment Description
                        </th>

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Model No.
                        </th>

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Power
                        </th>

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          HP
                        </th>

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Qty
                        </th>

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Unit Price
                        </th>

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Total Price
                        </th>

                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Action
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {table.machinery.map(
                        (machinery, machineryIndex) => (

                          <tr
                            key={machinery.id}
                            className="border-b border-gray-100 align-top"
                          >

                            {/* SR NO */}

                            <td className="px-4 py-4 text-sm font-semibold text-gray-700">
                              {machineryIndex + 1}
                            </td>

                            {/* Equipment Description */}

                            <td className="px-4 py-4">

                              <input
                                type="text"
                                value={
                                  machinery.equipmentDescription
                                }
                                onChange={(e) =>
                                  updateMachinery(
                                    table.id,
                                    machinery.id,
                                    "equipmentDescription",
                                    e.target.value
                                  )
                                }
                                placeholder="Equipment description"
                                className="w-56 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                              />

                            </td>

                            {/* Model No */}

                            <td className="px-4 py-4">

                              <input
                                type="text"
                                value={
                                  machinery.modelNo
                                }
                                onChange={(e) =>
                                  updateMachinery(
                                    table.id,
                                    machinery.id,
                                    "modelNo",
                                    e.target.value
                                  )
                                }
                                placeholder="Model"
                                className="w-36 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                              />

                            </td>

                            {/* Power */}

                            <td className="px-4 py-4">

                              <input
                                type="text"
                                value={
                                  machinery.power.display
                                }
                                onChange={(e) =>
                                  updateMachineryPower(
                                    table.id,
                                    machinery.id,
                                    "display",
                                    e.target.value
                                  )
                                }
                                placeholder="120 HP X 2"
                                className="w-36 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                              />

                            </td>

                            {/* HP */}

                            <td className="px-4 py-4">

                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                  machinery.power.hp
                                }
                                onChange={(e) =>
                                  updateMachineryPower(
                                    table.id,
                                    machinery.id,
                                    "hp",
                                    Number(
                                      e.target.value
                                    )
                                  )
                                }
                                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                              />

                            </td>

                            {/* Quantity */}

                            <td className="px-4 py-4">

                              <input
                                type="number"
                                min="1"
                                step="1"
                                value={machinery.qty}
                                onChange={(e) =>
                                  updateMachinery(
                                    table.id,
                                    machinery.id,
                                    "qty",
                                    Number(
                                      e.target.value
                                    )
                                  )
                                }
                                className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                              />

                            </td>

                            {/* Unit Price */}

                            <td className="px-4 py-4">

                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={
                                  machinery.unitPrice
                                }
                                onChange={(e) =>
                                  updateMachinery(
                                    table.id,
                                    machinery.id,
                                    "unitPrice",
                                    Number(
                                      e.target.value
                                    )
                                  )
                                }
                                className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
                              />

                            </td>

                            {/* Total Price */}

                            <td className="px-4 py-4">

                              <div className="w-32 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-800">
                                ₹{" "}
                                {formatCurrency(
                                  calculateRowTotal(
                                    machinery
                                  )
                                )}
                              </div>

                            </td>

                            {/* Action */}

                            <td className="px-4 py-4">

                              <button
                                type="button"
                                onClick={() =>
                                  removeMachinery(
                                    table.id,
                                    machinery.id
                                  )
                                }
                                disabled={
                                  table.machinery.length ===
                                  1
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                              >
                                <Trash2 size={15} />
                              </button>

                            </td>

                          </tr>
                        )
                      )}

                    </tbody>

                    {/* --------------------------------------------------
                        Footer
                    -------------------------------------------------- */}

                    <tfoot>

                      <tr className="bg-gray-50">

                        <td
                          colSpan="5"
                          className="px-4 py-4 text-right text-sm font-semibold text-gray-700"
                        >
                          Section Total
                        </td>

                        {/* Total Qty */}

                        <td className="px-4 py-4 text-sm font-bold text-gray-900">
                          {tableTotals.qty}
                        </td>

                        {/* Unit Price - intentionally blank */}

                        <td className="px-4 py-4">
                          -
                        </td>

                        {/* Total Cost */}

                        <td className="px-4 py-4 text-sm font-bold text-gray-900">
                          ₹{" "}
                          {formatCurrency(
                            tableTotals.cost
                          )}
                        </td>

                        {/* Action */}

                        <td className="px-4 py-4">

                          <div className="text-xs text-gray-500">
                            Total HP:{" "}
                            <span className="font-semibold text-gray-800">
                              {tableTotals.hp}
                            </span>
                          </div>

                        </td>

                      </tr>

                    </tfoot>

                  </table>

                </div>

                {/* --------------------------------------------------
                    Add Machinery
                -------------------------------------------------- */}

                <div className="border-t border-gray-200 bg-gray-50 p-4">

                  <button
                    type="button"
                    onClick={() =>
                      addMachinery(table.id)
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    <Plus size={16} />

                    Add Machinery
                  </button>

                </div>

              </div>
            );
          }
        )}

      </div>
    </section>
  );
};

export default QuotationPricingTables;