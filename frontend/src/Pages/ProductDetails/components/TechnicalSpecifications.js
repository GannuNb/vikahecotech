import React from "react";

import {
  Package,
} from "lucide-react";

function TechnicalSpecifications({
  product,
  publicSpecifications,
  specificationRows,
}) {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-100 via-sky-50 to-emerald-50 overflow-hidden">

      <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =================================================
            TECHNICAL HEADING
        ================================================= */}

        <div className="mb-8 sm:mb-10">

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5 sm:gap-6 lg:gap-12 items-end">

            {/* Left Heading */}

            <div>

              <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
                <span className="w-7 sm:w-8 h-[2px] bg-emerald-500" />
                Technical Data
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                Technical Specifications
              </h2>

              <div className="w-14 sm:w-16 h-1 bg-emerald-500 rounded-full mt-4 sm:mt-5" />

            </div>

            {/* Right Description */}

            <div className="lg:pb-1">

              <div className="bg-white/60 border border-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm">

                <p className="text-sm sm:text-base text-slate-600 leading-6 sm:leading-7">
                  Key technical specifications available
                  for{" "}
                  <span className="font-semibold text-slate-800">
                    {product.modelName}
                  </span>
                  .
                </p>

                <p className="text-sm sm:text-base text-slate-500 leading-6 sm:leading-7 mt-2">
                  For complete product information,
                  request the full specifications.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            SPECIFICATION TABLE
        ================================================= */}

        {specificationRows.length > 0 ? (

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[620px] border-collapse">

                <thead>

                  <tr className="bg-emerald-600 text-white">

                    <th className="text-left px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold">
                      Specification
                    </th>

                    <th className="text-left px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base font-semibold">
                      Details
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {specificationRows.map(
                    (item, index) => (
                      <tr
                        key={`${item.section}-${item.name}-${index}`}
                        className={`border-b border-slate-200 last:border-b-0 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-slate-50"
                        }`}
                      >

                        <td className="px-4 sm:px-5 py-3.5 sm:py-4 align-top w-[42%]">

                          <div className="font-semibold text-slate-800 text-sm sm:text-base">
                            {item.name}
                          </div>

                          {item.section && (
                            <div className="text-[11px] sm:text-xs text-emerald-600 mt-1">
                              {item.section}
                            </div>
                          )}

                        </td>

                        <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-slate-600 text-sm sm:text-base align-top">
                          {item.value}
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        ) : (

          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-8 sm:p-10 text-center shadow-sm">

            <Package
              size={42}
              className="mx-auto mb-4 text-slate-300"
            />

            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">
              Technical specifications unavailable
            </h3>

            <p className="text-sm sm:text-base text-slate-500">
              No public technical specifications have
              been added for this product yet.
            </p>

          </div>

        )}

        {/* Mobile Table Hint */}

        {specificationRows.length > 0 && (
          <p className="lg:hidden text-center text-xs text-slate-400 mt-3">
            Swipe left or right to view the complete table.
          </p>
        )}

      </div>

    </section>
  );
}

export default TechnicalSpecifications;