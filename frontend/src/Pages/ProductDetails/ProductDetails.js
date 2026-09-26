import React, { useEffect, useState } from "react";

import {
  CheckCircle2,
  Leaf,
  MoveRight,
  Package,
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
  const { slug } = useParams();

  const dispatch = useDispatch();

  const {
    currentProduct,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.publicProduct);

  const [selectedImage, setSelectedImage] =
    useState("");

  const [currentImageIndex, setCurrentImageIndex] =
    useState(0);

  // =========================================================
  // FETCH PRODUCT
  // =========================================================

  useEffect(() => {
    if (slug) {
      dispatch(fetchPublicProductBySlug(slug));
    }

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
      currentProduct.images.length === 0
    ) {
      return;
    }

    const newIndex =
      currentImageIndex === 0
        ? currentProduct.images.length - 1
        : currentImageIndex - 1;

    setCurrentImageIndex(newIndex);
    setSelectedImage(
      currentProduct.images[newIndex]
    );
  };

  const handleNextImage = () => {
    if (
      !currentProduct?.images ||
      currentProduct.images.length === 0
    ) {
      return;
    }

    const newIndex =
      currentImageIndex ===
      currentProduct.images.length - 1
        ? 0
        : currentImageIndex + 1;

    setCurrentImageIndex(newIndex);
    setSelectedImage(
      currentProduct.images[newIndex]
    );
  };

  const handleImageSelect = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (productLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-12 h-12 mx-auto mb-4 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin" />

          <p className="text-slate-600 text-base sm:text-lg">
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 text-center">

          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">

            <Package
              className="w-8 h-8 text-red-500"
            />

          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-3">
            Product Not Found
          </h1>

          <p className="text-slate-600 mb-6">
            {productError}
          </p>

          <Link
            to="/our-products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
          >
            View Products
            <MoveRight size={18} />
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

        <div className="text-center">

          <p className="text-slate-600">
            Product information is not available.
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // PRODUCT DATA
  // =========================================================

  const applicationName =
    typeof currentProduct.application === "object"
      ? currentProduct.application?.name
      : currentProduct.application;

  const categoryName =
    typeof currentProduct.application === "object"
      ? currentProduct.application?.category?.name
      : "";

  // =========================================================
  // PUBLIC SPECIFICATIONS
  // =========================================================

  const publicSpecifications = Array.isArray(
    currentProduct.sections
  )
    ? currentProduct.sections
        .map((section) => ({
          ...section,
          fields: Array.isArray(section.fields)
            ? section.fields.filter(
                (field) => field.isPublic === true
              )
            : [],
        }))
        .filter(
          (section) => section.fields.length > 0
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
  // SCROLL TO FULL SPECIFICATIONS
  // =========================================================

  const scrollToCompleteSpecifications = () => {
    document
      .getElementById("complete-specifications")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="min-h-screen bg-white">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white">

        {/* Decorative Background */}

        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          <div className="absolute -top-32 -right-32 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl" />

          <div className="absolute bottom-0 -left-32 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl" />

          <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="pt-5 sm:pt-7 lg:pt-8 pb-4 sm:pb-6">

            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 overflow-x-auto whitespace-nowrap scrollbar-hide">

              <Link
                to="/"
                className="hover:text-white transition flex-shrink-0"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                to="/our-products"
                className="hover:text-white transition flex-shrink-0"
              >
                Products
              </Link>

              {categoryName && (
                <>
                  <span>/</span>

                  <span className="flex-shrink-0">
                    {categoryName}
                  </span>
                </>
              )}

              {applicationName && (
                <>
                  <span>/</span>

                  <span className="flex-shrink-0">
                    {applicationName}
                  </span>
                </>
              )}

              <span>/</span>

              <span className="text-white font-medium flex-shrink-0">
                {currentProduct.modelName}
              </span>

            </div>

          </div>

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center pb-12 sm:pb-16 lg:pb-20">

            {/* =================================================
                IMAGE GALLERY
            ================================================= */}

            <ProductImageGallery
              product={currentProduct}
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
                PRODUCT INFORMATION
            ================================================= */}

            <div className="min-w-0">

              {/* Application Badge */}

              {applicationName && (
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/15 border border-emerald-400/20 text-emerald-300 text-xs sm:text-sm font-medium mb-4 sm:mb-5">

                  <Leaf size={15} />

                  <span className="truncate max-w-[240px]">
                    {applicationName}
                  </span>

                </div>
              )}

              {/* Model Name */}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] break-words mb-4">
                {currentProduct.modelName}
              </h1>

              {/* Application */}

              {applicationName && (
                <h2 className="text-lg sm:text-xl lg:text-2xl text-slate-200 font-medium leading-snug mb-5 sm:mb-6">
                  {applicationName}
                </h2>
              )}

              {/* Green Line */}

              <div className="w-14 sm:w-16 h-1 bg-emerald-400 rounded-full mb-5 sm:mb-7" />

              {/* Description */}

              {currentProduct.description && (
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 max-w-2xl">
                  {currentProduct.description}
                </p>
              )}

              {/* Product Data Indicators */}

              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-6 sm:mt-8">

                <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-3.5 sm:p-4">

                  <Package
                    size={20}
                    className="text-emerald-400 mb-2 sm:mb-3"
                  />

                  <p className="text-[11px] sm:text-xs text-slate-400">
                    Product
                  </p>

                  <p className="font-semibold text-sm sm:text-base mt-1 break-words">
                    {currentProduct.modelName}
                  </p>

                </div>

                {applicationName && (
                  <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-3.5 sm:p-4">

                    <Sparkles
                      size={20}
                      className="text-emerald-400 mb-2 sm:mb-3"
                    />

                    <p className="text-[11px] sm:text-xs text-slate-400">
                      Application
                    </p>

                    <p className="font-semibold text-sm sm:text-base mt-1 break-words line-clamp-2">
                      {applicationName}
                    </p>

                  </div>
                )}

                <div className="rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 p-3.5 sm:p-4">

                  <CheckCircle2
                    size={20}
                    className="text-emerald-400 mb-2 sm:mb-3"
                  />

                  <p className="text-[11px] sm:text-xs text-slate-400">
                    Public Specifications
                  </p>

                  <p className="font-semibold text-sm sm:text-base mt-1">
                    {totalPublicSpecifications}
                  </p>

                </div>

              </div>

              {/* CTA */}

              <button
                type="button"
                onClick={
                  scrollToCompleteSpecifications
                }
                className="mt-7 sm:mt-9 w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-emerald-500 text-white text-sm sm:text-base font-semibold hover:bg-emerald-400 transition shadow-lg shadow-emerald-900/20"
              >
                Need Complete Specifications?
                <MoveRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          PRODUCT OVERVIEW
      ===================================================== */}

      <ProductOverview
        product={currentProduct}
        hasImages={hasImages}
      />

      {/* =====================================================
          TECHNICAL SPECIFICATIONS
      ===================================================== */}

      <TechnicalSpecifications
        product={currentProduct}
        publicSpecifications={
          publicSpecifications
        }
        specificationRows={specificationRows}
      />

      {/* =====================================================
          COMPLETE SPECIFICATIONS CTA
      ===================================================== */}

      <CompleteSpecifications
        product={currentProduct}
        applicationName={applicationName}
      />

      {/* =====================================================
          BOTTOM SPACE
      ===================================================== */}

      <div className="h-3 sm:h-4 bg-white" />

    </main>
  );
}

export default ProductDetails;