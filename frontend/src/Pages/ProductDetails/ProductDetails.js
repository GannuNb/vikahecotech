import React, { useEffect, useState } from "react";

import {
  CheckCircle2,
  Leaf,
  MoveRight,
  Package,
  Share2,
  Sparkles,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";

import {
  fetchPublicProductBySlug,
  clearCurrentPublicProduct,
} from "../../redux/slices/publicProductSlice";

import ProductImageGallery from "./components/ProductImageGallery";
import ProductOverview from "./components/ProductOverview";
import TechnicalSpecifications from "./components/TechnicalSpecifications";
import CompleteSpecifications from "./components/CompleteSpecifications";

function ProductDetails() {
  const params = useParams();

  /*
    Supports both:

    /product/:slug
    /product/:productId
  */

  const slug =
    params.slug ||
    params.productId ||
    params.id ||
    "";

  const dispatch = useDispatch();

  const {
    currentProduct,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.publicProduct);

  const [selectedImage, setSelectedImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [
    showCompleteSpecifications,
    setShowCompleteSpecifications,
  ] = useState(false);


  useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant",
  });
}, [slug]);
  // =========================================================
  // FETCH PRODUCT
  // =========================================================

  useEffect(() => {
    if (!slug) {
      return;
    }

    dispatch(fetchPublicProductBySlug(slug));

    return () => {
      dispatch(clearCurrentPublicProduct());
    };
  }, [dispatch, slug]);

  // =========================================================
  // SET FIRST IMAGE
  // =========================================================

  useEffect(() => {
    if (
      currentProduct &&
      Array.isArray(currentProduct.images) &&
      currentProduct.images.length > 0
    ) {
      setSelectedImage(currentProduct.images[0]);
      setCurrentImageIndex(0);
    } else {
      setSelectedImage("");
      setCurrentImageIndex(0);
    }
  }, [currentProduct]);

  // =========================================================
  // IMAGE NAVIGATION
  // =========================================================

  const handlePreviousImage = () => {
    if (
      !currentProduct?.images ||
      currentProduct.images.length <= 1
    ) {
      return;
    }

    const newIndex =
      currentImageIndex === 0
        ? currentProduct.images.length - 1
        : currentImageIndex - 1;

    setCurrentImageIndex(newIndex);
    setSelectedImage(currentProduct.images[newIndex]);
  };

  const handleNextImage = () => {
    if (
      !currentProduct?.images ||
      currentProduct.images.length <= 1
    ) {
      return;
    }

    const newIndex =
      currentImageIndex ===
      currentProduct.images.length - 1
        ? 0
        : currentImageIndex + 1;

    setCurrentImageIndex(newIndex);
    setSelectedImage(currentProduct.images[newIndex]);
  };

  const handleImageSelect = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  // =========================================================
  // SHARE
  // =========================================================

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title:
            currentProduct?.modelName ||
            "Vikah Ecotech Product",
          text:
            currentProduct?.description ||
            currentProduct?.modelName ||
            "",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        alert("Product link copied.");
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);
      }
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (productLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-4 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />

          <p className="text-sm sm:text-base text-slate-600">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (productError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <Package
              size={28}
              className="text-red-500"
            />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Product Not Found
          </h1>

          <p className="text-sm text-slate-500 mb-5">
            {productError}
          </p>

          <Link
            to="/our-products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 transition"
          >
            View Products
            <MoveRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================
  // NO PRODUCT
  // =========================================================

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <p className="text-sm text-slate-500">
          Product information is not available.
        </p>
      </div>
    );
  }

  // =========================================================
  // PRODUCT DATA
  // =========================================================

  const applicationName =
    typeof currentProduct.application === "object"
      ? currentProduct.application?.name
      : currentProduct.application || "";

  const categoryName =
    typeof currentProduct.application === "object"
      ? currentProduct.application?.category?.name
      : "";

  /*
    Keep model name capitalized.
    Example:
    blt-150 -> BLT-150
  */

  const modelName = (
    currentProduct.modelName || ""
  ).toUpperCase();

  // =========================================================
  // SEO
  // =========================================================

  const seoTitle =
    currentProduct.seo?.title?.trim() ||
    `${modelName} | ${applicationName || "Product"} | Vikah Ecotech`;

  const seoDescription =
    currentProduct.seo?.description?.trim() ||
    currentProduct.description ||
    `Learn more about ${modelName} by Vikah Ecotech.`;

  const seoKeywords =
    currentProduct.seo?.keywords?.trim() || "";

  const canonicalUrl =
    `https://vikahecotech.com/${currentProduct.slug || slug}`;

  // =========================================================
  // PUBLIC SPECIFICATIONS
  // =========================================================

  const publicSpecifications =
    Array.isArray(currentProduct.sections)
      ? currentProduct.sections
          .map((section) => ({
            ...section,

            fields: Array.isArray(section.fields)
              ? section.fields.filter(
                  (field) =>
                    field.isPublic === true
                )
              : [],
          }))
          .filter(
            (section) =>
              section.fields.length > 0
          )
      : [];

  const totalPublicSpecifications =
    publicSpecifications.reduce(
      (total, section) =>
        total + section.fields.length,
      0
    );

  // =========================================================
  // IMAGES
  // =========================================================

  const hasImages =
    Array.isArray(currentProduct.images) &&
    currentProduct.images.length > 0;

  // =========================================================
  // SPECIFICATION ROWS
  // =========================================================

  const specificationRows = [];

  publicSpecifications.forEach((section) => {
    section.fields.forEach((field) => {
      specificationRows.push({
        section: section.heading,
        name: field.name,
        value: field.value,
      });
    });
  });

  // =========================================================
  // COMPLETE SPECIFICATIONS
  // =========================================================

  const openCompleteSpecifications = () => {
    setShowCompleteSpecifications(true);
  };

  const closeCompleteSpecifications = () => {
    setShowCompleteSpecifications(false);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          SEO
      ===================================================== */}

      <title>{seoTitle}</title>

      <meta
        name="description"
        content={seoDescription}
      />

      {seoKeywords && (
        <meta
          name="keywords"
          content={seoKeywords}
        />
      )}

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      <meta
        property="og:title"
        content={seoTitle}
      />

      <meta
        property="og:description"
        content={seoDescription}
      />

      <meta
        property="og:type"
        content="product"
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      {hasImages && (
        <meta
          property="og:image"
          content={currentProduct.images[0]}
        />
      )}

      <meta
        property="og:site_name"
        content="Vikah Ecotech Pvt Ltd"
      />

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={seoTitle}
      />

      <meta
        name="twitter:description"
        content={seoDescription}
      />

      {hasImages && (
        <meta
          name="twitter:image"
          content={currentProduct.images[0]}
        />
      )}

      {/* =====================================================
          TOP PRODUCT SECTION
      ===================================================== */}

      <section className="bg-white">

        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">

          {/* =================================================
              BREADCRUMB + SHARE
          ================================================= */}

          <div className="flex items-center justify-between gap-4 pt-5 sm:pt-7 lg:pt-8 pb-5">

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-hide">

              <Link
                to="/"
                className="hover:text-emerald-700 transition flex-shrink-0"
              >
                Home
              </Link>

              <span className="text-slate-300">
                ›
              </span>

              {categoryName && (
                <>
                  <span className="flex-shrink-0">
                    {categoryName}
                  </span>

                  <span className="text-slate-300">
                    ›
                  </span>
                </>
              )}

              {applicationName && (
                <>
                  <span className="flex-shrink-0">
                    {applicationName}
                  </span>

                  <span className="text-slate-300">
                    ›
                  </span>
                </>
              )}

              <span className="font-semibold text-emerald-700 flex-shrink-0">
                {modelName}
              </span>

            </div>

            <button
              type="button"
              onClick={handleShare}
              className="flex-shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md hover:border-slate-300 transition"
            >
              <Share2 size={17} />
              <span>Share</span>
            </button>

          </div>

          {/* =================================================
              MAIN GRID
          ================================================= */}

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] xl:grid-cols-[minmax(0,1.08fr)_minmax(480px,0.92fr)] gap-7 lg:gap-9 xl:gap-12 pb-10 sm:pb-12 lg:pb-14">

            {/* =================================================
                LEFT - IMAGE
            ================================================= */}

            <ProductImageGallery
              product={{
                ...currentProduct,
                modelName,
              }}
              selectedImage={selectedImage}
              currentImageIndex={currentImageIndex}
              hasImages={hasImages}
              handlePreviousImage={
                handlePreviousImage
              }
              handleNextImage={handleNextImage}
              handleImageSelect={
                handleImageSelect
              }
            />

            {/* =================================================
                RIGHT - PRODUCT INFORMATION
            ================================================= */}

            <div className="min-w-0 flex flex-col justify-center">

              {/* APPLICATION BADGE */}

              {applicationName && (
                <div className="inline-flex self-start items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm font-semibold mb-5">
                  <Leaf size={15} />

                  <span>
                    {applicationName}
                  </span>
                </div>
              )}

              {/* MODEL */}

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-bold tracking-tight leading-none text-slate-950 mb-5">
                {modelName}
              </h1>

              {/* APPLICATION */}

              {applicationName && (
                <div className="flex items-center gap-4 mb-6">

                  <span className="w-12 sm:w-14 h-[3px] rounded-full bg-emerald-600" />

                  <h2 className="text-base sm:text-lg lg:text-xl font-medium text-slate-900">
                    {applicationName}
                  </h2>

                </div>
              )}

              {/* INFORMATION CARDS */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">

                {/* PRODUCT */}

                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4 sm:p-5 min-h-[105px]">

                  <div className="flex items-start gap-3">

                    <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Package
                        size={19}
                        className="text-emerald-700"
                      />
                    </div>

                    <div className="min-w-0">

                      <p className="text-[11px] sm:text-xs text-slate-500 mb-1">
                        Product
                      </p>

                      <p className="font-semibold text-sm sm:text-base text-slate-950 break-words">
                        {modelName}
                      </p>

                    </div>

                  </div>

                </div>

                {/* APPLICATION */}

                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4 sm:p-5 min-h-[105px]">

                  <div className="flex items-start gap-3">

                    <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Sparkles
                        size={19}
                        className="text-emerald-700"
                      />
                    </div>

                    <div className="min-w-0">

                      <p className="text-[11px] sm:text-xs text-slate-500 mb-1">
                        Application
                      </p>

                      <p className="font-semibold text-sm sm:text-base text-slate-950 break-words">
                        {applicationName || "-"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* PUBLIC SPECIFICATIONS */}

                <div className="rounded-2xl bg-emerald-50/70 border border-emerald-100 p-4 sm:p-5 min-h-[105px]">

                  <div className="flex items-start gap-3">

                    <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2
                        size={19}
                        className="text-emerald-700"
                      />
                    </div>

                    <div>

                      <p className="text-[11px] sm:text-xs text-slate-500 mb-1">
                        Public Specifications
                      </p>

                      <p className="font-semibold text-sm sm:text-base text-slate-950">
                        {totalPublicSpecifications}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* COMPLETE SPECIFICATION BUTTON */}

              <button
                type="button"
                onClick={
                  openCompleteSpecifications
                }
                className="w-full inline-flex items-center justify-center gap-3 px-5 py-3.5 sm:py-4 rounded-xl bg-emerald-700 text-white text-sm sm:text-base font-semibold hover:bg-emerald-800 transition shadow-sm"
              >
                <span className="text-lg">
                  ▧
                </span>

                Need Complete Specifications?

                <MoveRight size={19} />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PRODUCT OVERVIEW
      ===================================================== */}

      <ProductOverview
        product={{
          ...currentProduct,
          modelName,
        }}
        hasImages={hasImages}
      />

      {/* =====================================================
          TECHNICAL SPECIFICATIONS
      ===================================================== */}

      <TechnicalSpecifications
        product={{
          ...currentProduct,
          modelName,
        }}
        publicSpecifications={
          publicSpecifications
        }
        specificationRows={
          specificationRows
        }
      />

      {/* =====================================================
          COMPLETE SPECIFICATIONS SECTION
      ===================================================== */}

      <section
        id="complete-specifications"
        className="relative overflow-hidden bg-slate-50 py-12 sm:py-16 lg:py-20"
      >

        <div className="absolute -right-32 -top-32 w-72 h-72 bg-emerald-100 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute -left-32 -bottom-32 w-72 h-72 bg-cyan-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white overflow-hidden shadow-xl">

            <div className="grid lg:grid-cols-[1fr_auto] gap-7 lg:gap-10 items-center p-7 sm:p-9 lg:p-12">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 text-xs sm:text-sm font-medium mb-4">

                  <CheckCircle2 size={15} />

                  Complete Technical Information

                </div>

                <h2 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
                  Need Complete Specifications?
                </h2>

                <p className="text-slate-300 text-sm sm:text-base leading-7 max-w-2xl">
                  Get the complete technical specifications,
                  detailed product information and other
                  technical details for {modelName}.
                </p>

              </div>

              <button
                type="button"
                onClick={
                  openCompleteSpecifications
                }
                className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-500 text-white text-sm sm:text-base font-semibold hover:bg-emerald-400 transition"
              >
                Get Complete Specifications
                <MoveRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          COMPLETE SPECIFICATIONS POPUP
      ===================================================== */}

      {showCompleteSpecifications && (
        <CompleteSpecifications
          currentProduct={currentProduct}
          onClose={
            closeCompleteSpecifications
          }
        />
      )}

      <div className="h-3 sm:h-4 bg-white" />

    </main>
  );
}

export default ProductDetails;