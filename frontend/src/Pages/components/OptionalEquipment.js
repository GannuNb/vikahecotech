
import React from "react";

export default function OptionalEquipment({
  equipment = [],
  selectedEquipment = {},
  onToggle,
  onQuantityChange,
  loading = false,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Optional Equipment
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Select any additional equipment you need and specify the quantity.
        </p>
      </div>

      {loading ? (
        <div className="py-6 text-center text-sm text-slate-500">
          Loading optional equipment...
        </div>
      ) : equipment.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
          No optional equipment is available for this application.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item) => {
            const itemId = String(item._id);
            const selection = selectedEquipment[itemId];
            const selected = Boolean(selection?.selected);

            return (
              <div
                key={itemId}
                className={`rounded-xl border p-4 transition ${
                  selected
                    ? "border-emerald-500 bg-emerald-50/50"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={(event) =>
                      onToggle(item, event.target.checked)
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                  />
                  <span className="font-medium text-slate-800">
                    {item.name}
                  </span>
                </label>

                {selected && (
                  <div className="mt-4">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={selection?.quantity ?? 1}
                      onChange={(event) =>
                        onQuantityChange(item, event.target.value)
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
