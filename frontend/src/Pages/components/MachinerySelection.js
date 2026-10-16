
import React from "react";
import SectionHeading from "./SectionHeading";
import MachineryCard from "./MachineryCard";

export default function MachinerySelection({
  groups = [],
  configuration = {},
  onToggle,
  onQuantityChange,
  onConnectingChange,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <SectionHeading
        number="03"
        title="Configure Your Equipment"
        description="Choose your required machinery capacities, set individual quantities and optionally request connecting equipment."
      />

      {groups.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500">
          No machinery is available for this application yet.
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.key || group.label}>
              <div className="mb-3">
                <h3 className="font-semibold text-slate-900">
                  {group.label}
                </h3>
                {group.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {group.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {group.models.map((model) => {
                  const selectedItem = configuration[model._id] || {};

                  return (
                    <MachineryCard
                      key={model._id}
                      model={model}
                      selected={Boolean(selectedItem.selected)}
                      quantity={selectedItem.quantity ?? 1}
                      connectingEquipment={
                        selectedItem.connectingEquipment ?? false
                      }
                      onToggle={() => onToggle(model)}
                      onQuantityChange={(value) =>
                        onQuantityChange(model, value)
                      }
                      onConnectingEquipmentChange={(value) =>
                        onConnectingChange(model, value)
                      }
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
