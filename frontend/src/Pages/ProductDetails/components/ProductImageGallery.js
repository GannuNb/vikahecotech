import React from "react";

import {
  ChevronLeft,
  ChevronRight,
  Package,
} from "lucide-react";

function ProductImageGallery({
  product,
  selectedImage,
  currentImageIndex,
  hasImages,
  handlePreviousImage,
  handleNextImage,
  handleImageSelect,
}) {
  return (
    <div className="w-full min-w-0">

      <div className="bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 lg:p-5 shadow-2xl">

        {/* =================================================
            MAIN IMAGE
        ================================================= */}

        <div className="relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">

          {hasImages && selectedImage ? (
            <img
              src={selectedImage}
              alt={product.modelName}
              className="w-full h-full object-contain p-3 sm:p-6 lg:p-8"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center text-slate-400 px-4">

                <Package
                  size={42}
                  className="mx-auto mb-3"
                />

                <p className="text-sm sm:text-base">
                  No product image available
                </p>

              </div>
            </div>
          )}

          {/* Image Counter */}

          {hasImages && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full bg-slate-900/70 text-white text-xs font-medium backdrop-blur-sm">
              {currentImageIndex + 1} /{" "}
              {product.images.length}
            </div>
          )}

          {/* Previous */}

          {product.images?.length > 1 && (
            <button
              type="button"
              onClick={handlePreviousImage}
              aria-label="Previous image"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 text-slate-800 shadow-lg flex items-center justify-center hover:bg-white transition"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Next */}

          {product.images?.length > 1 && (
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 text-slate-800 shadow-lg flex items-center justify-center hover:bg-white transition"
            >
              <ChevronRight size={20} />
            </button>
          )}

        </div>

        {/* =================================================
            THUMBNAILS
        ================================================= */}

        {hasImages && product.images.length > 1 && (
          <div className="mt-3 sm:mt-4">

            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-thin">

              {product.images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() =>
                    handleImageSelect(image, index)
                  }
                  aria-label={`View image ${index + 1}`}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === image
                      ? "border-emerald-500 shadow-md"
                      : "border-slate-200 hover:border-emerald-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.modelName} ${index + 1}`}
                    className="w-full h-full object-contain bg-slate-50 p-1"
                  />
                </button>
              ))}

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default ProductImageGallery;