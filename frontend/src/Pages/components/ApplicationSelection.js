
import React from "react";
import SectionHeading from "./SectionHeading";

const APPLICATION_DETAILS = {
  tyre: { icon: "♻️", description: "Tyre recycling plant" },
  plastic: { icon: "🧴", description: "Plastic recycling plant" },
  ewaste: { icon: "🔌", description: "Electronic waste processing" },
  "e-waste": { icon: "🔌", description: "Electronic waste processing" },
  msw: { icon: "🏭", description: "Municipal solid waste" },
  metal: { icon: "⚙️", description: "Metal recycling plant" },
};

const getApplicationDetails = (application) => {
  const key = String(application?.slug || application?.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    APPLICATION_DETAILS[key] || {
      icon: "⚙️",
      description: `${application?.name || "Industrial"} application`,
    }
  );
};

export default function ApplicationSelection({
  applications,
  application,
  onSelect,
  loading,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <SectionHeading
        number="02"
        title="Choose Your Application"
        description="Select the material or recycling application for which you need a quotation."
      />
      {loading ? (
        <p className="text-sm text-slate-500">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          No active quotation applications are available.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {applications.map((item) => {
            const details = getApplicationDetails(item);
            const selected = application === item._id;

            return (
              <button
                key={item._id}
                type="button"
                onClick={() => onSelect(item)}
                aria-pressed={selected}
                className={`relative flex min-w-0 items-start gap-3 rounded-xl border p-4 text-left transition sm:block ${
                  selected
                    ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-600/10"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50"
                }`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl sm:mb-3">
                  {details.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-slate-900">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    {details.description}
                  </span>
                </span>
                {selected && (
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white sm:absolute sm:right-3 sm:top-3">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
