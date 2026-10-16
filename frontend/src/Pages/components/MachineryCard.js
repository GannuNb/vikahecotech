
import React from "react";

export default function MachineryCard({
  model,
  selected,
  quantity,
  connectingEquipment,
  onToggle,
  onQuantityChange,
  onConnectingEquipmentChange,
}) {
  const modelName = model.name || model.modelName || "Machinery";
  const capacity = model.capacity || model.description || "";

  return (
    <div
      className={`rounded-xl border p-4 transition ${
        selected
          ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500/20"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
        />
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-slate-900">
            {modelName}
          </span>
          {capacity && (
            <span className="mt-1 block text-sm leading-5 text-slate-500">
              {capacity}
            </span>
          )}
        </span>
      </label>

      {selected && (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) => onQuantityChange(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Connecting Equipment
            </p>
            <div className="flex flex-wrap gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name={`connecting-equipment-${model._id}`}
                  checked={connectingEquipment === true}
                  onChange={() => onConnectingEquipmentChange(true)}
                  className="accent-emerald-600"
                />
                Include
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name={`connecting-equipment-${model._id}`}
                  checked={connectingEquipment === false}
                  onChange={() => onConnectingEquipmentChange(false)}
                  className="accent-emerald-600"
                />
                Not required
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";

export default function MachineryCard({
  model,
  selected,
  quantity,
  connectingEquipment,
  onToggle,
  onQuantityChange,
  onConnectingEquipmentChange,
}) {
  const modelName = model.name || model.modelName || "Machinery";
  const capacity = model.capacity || model.description || "";

  return (
    <div
      className={`rounded-xl border p-4 transition ${
        selected
          ? "border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500/20"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
        />
        <span className="min-w-0 flex-1">
          <span className="block font-semibold text-slate-900">
            {modelName}
          </span>
          {capacity && (
            <span className="mt-1 block text-sm leading-5 text-slate-500">
              {capacity}
            </span>
          )}
        </span>
      </label>

      {selected && (
        <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(event) => onQuantityChange(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Connecting Equipment
            </p>
            <div className="flex flex-wrap gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name={`connecting-equipment-${model._id}`}
                  checked={connectingEquipment === true}
                  onChange={() => onConnectingEquipmentChange(true)}
                  className="accent-emerald-600"
                />
                Include
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  name={`connecting-equipment-${model._id}`}
                  checked={connectingEquipment === false}
                  onChange={() => onConnectingEquipmentChange(false)}
                  className="accent-emerald-600"
                />
                Not required
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
