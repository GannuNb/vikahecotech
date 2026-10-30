
import React from "react";
import SectionHeading from "./SectionHeading";
import tyreImage from "../../images/Applications/tyre.webp";
import plasticImage from "../../images/Applications/plastic.jpg";
import ewasteImage from "../../images/Applications/ewaste.jpeg";
import metalImage from "../../images/Applications/metal.jpg";
import mswImage from "../../images/Applications/msw.jpg";

const APPLICATION_DETAILS = {
  tyre: {
    image: tyreImage,
    description: "Tyre recycling plant",
  },
  plastic: {
    image: plasticImage,
    description: "Plastic recycling plant",
  },
  ewaste: {
    image: ewasteImage,
    description: "Electronic waste processing",
  },
  "e-waste": {
    image: ewasteImage,
    description: "Electronic waste processing",
  },
  msw: {
    image: mswImage,
    description: "Municipal solid waste",
  },
  metal: {
    image: metalImage,
    description: "Metal recycling plant",
  },
};

const getApplicationDetails = (application) => {
  const key = String(application?.slug || application?.name || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    APPLICATION_DETAILS[key] || {
      image: null,
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {applications.map((item) => {
            const details = getApplicationDetails(item);
            const selected = application === item._id;

            return (
              <button
                key={item._id}
                type="button"
                onClick={() => onSelect(item)}
                aria-pressed={selected}
                className={`relative flex min-w-0 flex-col rounded-xl border p-3 text-left transition-all duration-200 sm:p-4 ${
                  selected
                    ? "border-emerald-600 bg-emerald-50 shadow-sm ring-2 ring-emerald-600/10"
                    : "border-slate-200 bg-white hover:border-emerald-300 hover:shadow-md"
                }`}
              >
                <div className="relative w-full overflow-hidden rounded-lg bg-slate-100">
                  {details.image ? (
                    <img
                      src={details.image}
                      alt={`${item.name} application`}
                      loading="lazy"
                      className="h-24 w-full object-cover transition-transform duration-300 hover:scale-105 sm:h-28"
                    />
                  ) : (
                    <div className="flex h-24 items-center justify-center px-2 text-center text-sm text-slate-500 sm:h-28">
                      Application image unavailable
                    </div>
                  )}
                </div>

                <div className="mt-4 w-full">
                  <h3 className="text-sm font-bold leading-5 text-slate-900 sm:text-base">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                    {details.description}
                  </p>
                </div>

                {selected && (
                  <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white shadow-sm">
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
