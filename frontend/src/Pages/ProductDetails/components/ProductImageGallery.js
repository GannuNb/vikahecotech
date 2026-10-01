import React from "react";

import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
  const images = Array.isArray(product?.images)
    ? product.images
    : [];

  return (
    <div className="w-full min-w-0">

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">

        {/* THUMBNAILS - DESKTOP / TABLET */}
        {hasImages && images.length > 1 && (
          <div className="hidden sm:flex flex-col justify-center items-center gap-2.5 w-[78px] flex-shrink-0">

            {images.map((image, index) => (
              <button
                type="button"
                key={`${image}-${index}`}
                onClick={() =>
                  handleImageSelect(image, index)
                }
                aria-label={`View image ${index + 1}`}
                className={`w-[70px] h-[70px] rounded-xl overflow-hidden border-2 bg-slate-50 transition ${
                  currentImageIndex === index
                    ? "border-emerald-500 shadow-sm"
                    : "border-transparent hover:border-emerald-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product?.modelName || "Product"} ${index + 1}`}
                  className="w-full h-full object-contain p-1.5"
                />
              </button>
            ))}

          </div>
        )}

        {/* MAIN IMAGE AREA */}
        <div className="w-full min-w-0">

          <div className="relative w-full h-[390px] sm:h-[450px] lg:h-[500px] xl:h-[540px] rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">

            {/* MAIN IMAGE */}
            {hasImages && selectedImage ? (
              <img
                src={selectedImage}
                alt={
                  product?.modelName ||
                  "Product image"
                }
                className="absolute inset-0 w-full h-full object-contain p-5 sm:p-7 lg:p-9 xl:p-10"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <Package
                    size={42}
                    className="mx-auto mb-3"
                  />

                  <p className="text-sm">
                    No product image available
                  </p>
                </div>
              </div>
            )}

            {/* IMAGE COUNTER */}
            {hasImages && images.length > 0 && (
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-500/70 text-white text-xs sm:text-sm font-medium">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* PREVIOUS IMAGE */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handlePreviousImage}
                aria-label="Previous image"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md text-slate-800 flex items-center justify-center hover:bg-slate-50 transition"
              >
                <ChevronLeft size={21} />
              </button>
            )}

            {/* NEXT IMAGE */}
            {images.length > 1 && (
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next image"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white shadow-md text-slate-800 flex items-center justify-center hover:bg-slate-50 transition"
              >
                <ChevronRight size={21} />
              </button>
            )}

            {/* OPEN IMAGE IN NEW TAB */}
            {hasImages && selectedImage && (
              <button
                type="button"
                onClick={() => {
                  window.open(
                    selectedImage,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
                aria-label="Open image in new tab"
                title="Open image in new tab"
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md text-slate-800 flex items-center justify-center hover:bg-slate-50 transition"
              >
                <Maximize2 size={17} />
              </button>
            )}

          </div>
        </div>
      </div>

      {/* MOBILE THUMBNAILS */}
      {hasImages && images.length > 1 && (
        <div className="sm:hidden mt-3">

          <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-1 scrollbar-hide">

            {images.map((image, index) => (
              <button
                type="button"
                key={`mobile-${image}-${index}`}
                onClick={() =>
                  handleImageSelect(image, index)
                }
                aria-label={`View image ${index + 1}`}
                className={`flex-shrink-0 w-[58px] h-[58px] rounded-lg overflow-hidden border-2 bg-slate-50 transition ${
                  currentImageIndex === index
                    ? "border-emerald-500"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt={`${product?.modelName || "Product"} ${index + 1}`}
                  className="w-full h-full object-contain p-1"
                />
              </button>
            ))}

          </div>
        </div>
      )}

    </div>
  );
}

export default ProductImageGallery;