import React from "react";

import {
  Package,
} from "lucide-react";

function ProductOverview({
  product,
  hasImages,
}) {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-white via-emerald-50/50 to-slate-50">

      {/* Decorative Background */}

      <div className="absolute -right-32 top-20 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* =================================================
              TEXT
          ================================================= */}

          <div className="min-w-0">

            <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              <span className="w-7 sm:w-8 h-[2px] bg-emerald-500" />
              Product Overview
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-5 sm:mb-6">
              About {product.modelName}
            </h2>

            <div className="w-14 sm:w-16 h-1 bg-emerald-500 rounded-full mb-6 sm:mb-7" />

            {product.description ? (
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8">
                {product.description}
              </p>
            ) : (
              <p className="text-slate-500">
                Product description is not available.
              </p>
            )}

          </div>

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="w-full min-w-0">

            {hasImages ? (
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl p-2.5 sm:p-3">

                <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-emerald-50 aspect-[4/3]">

                  <img
                    src={product.images[0]}
                    alt={product.modelName}
                    className="w-full h-full object-contain p-4 sm:p-6"
                  />

                </div>

                <div className="absolute top-5 right-5 sm:top-7 sm:right-7 bg-white/95 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-md text-xs sm:text-sm font-semibold text-slate-700">
                  {product.modelName}
                </div>

              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-50 to-slate-100 flex items-center justify-center border border-slate-200">

                <Package
                  size={50}
                  className="text-slate-300"
                />

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductOverview;