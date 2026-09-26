import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import { ChevronLeft } from "lucide-react";

import {
  createProduct,
  fetchProductById,
  updateProduct,
  clearCurrentProduct,
  deleteProductImage,
  replaceProductImage,
} from "../../redux/slices/productSlice";

import {
  fetchApplicationById,
} from "../../redux/slices/applicationSlice";

import BasicInformation from "./ProductForm/BasicInformation";
import SeoInformation from "./ProductForm/SeoInformation";
import Specifications from "./ProductForm/Specifications";
import FormActions from "./ProductForm/FormActions";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    applicationId,
    productId,
  } = useParams();

  const isEditMode = Boolean(productId);

  // =========================
  // REDUX
  // =========================

  const {
    currentProduct,
    loading: productLoading,
    creating,
    updating,
    error: productError,
  } = useSelector((state) => state.product);

  const {
    currentApplication,
    loading: applicationLoading,
    error: applicationError,
  } = useSelector((state) => state.application);

  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({
    modelName: "",
    slug: "",
    description: "",
  });

  const [seo, setSeo] = useState({
    title: "",
    description: "",
    keywords: "",
  });

  const [sections, setSections] = useState([]);

  // =========================
  // IMAGE STATE
  // =========================

  const [images, setImages] = useState([]);

  const [existingImages, setExistingImages] = useState([]);

  const [deletingImage, setDeletingImage] = useState(null);

  const [replacingImage, setReplacingImage] = useState(null);

  const [formError, setFormError] = useState("");

  // =========================
  // LOAD APPLICATION
  // =========================

  useEffect(() => {
    if (applicationId) {
      dispatch(fetchApplicationById(applicationId));
    }
  }, [dispatch, applicationId]);

  // =========================
  // LOAD PRODUCT FOR EDIT
  // =========================

  useEffect(() => {
    if (isEditMode && productId) {
      dispatch(fetchProductById(productId));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [
    dispatch,
    isEditMode,
    productId,
  ]);

  // =========================
  // FILL EDIT FORM
  // =========================

  useEffect(() => {
    if (!isEditMode || !currentProduct) {
      return;
    }

    setFormData({
      modelName: currentProduct.modelName || "",
      slug: currentProduct.slug || "",
      description:
        currentProduct.description || "",
    });

    setSeo({
      title: currentProduct.seo?.title || "",
      description:
        currentProduct.seo?.description || "",
      keywords:
        currentProduct.seo?.keywords || "",
    });

    setSections(
      Array.isArray(currentProduct.sections)
        ? currentProduct.sections
        : []
    );

    setExistingImages(
      Array.isArray(currentProduct.images)
        ? currentProduct.images
        : []
    );

    setImages([]);
  }, [
    isEditMode,
    currentProduct,
  ]);

  // =========================
  // BASIC INPUT CHANGE
  // =========================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SEO CHANGE
  // =========================

  const handleSeoChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setSeo((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // IMAGE CHANGE
  // =========================

  const handleImageChange = (event) => {
    const files = Array.from(
      event.target.files
    );

    const availableSlots =
      5 - existingImages.length;

    if (availableSlots <= 0) {
      setFormError(
        "You already have 5 images. Delete an existing image before adding a new one."
      );

      event.target.value = "";
      return;
    }

    if (files.length > availableSlots) {
      setFormError(
        `You can add only ${availableSlots} more image${availableSlots > 1 ? "s" : ""
        }.`
      );

      event.target.value = "";
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        setFormError(
          "Only image files are allowed."
        );

        event.target.value = "";
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setFormError(
          "Each image must be 5 MB or smaller."
        );

        event.target.value = "";
        return;
      }
    }

    setFormError("");
    setImages(files);

    event.target.value = "";
  };

  // =========================
  // DELETE EXISTING IMAGE
  // =========================

  const handleDeleteExistingImage = async (
    imageUrl
  ) => {
    if (!currentProduct?._id) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingImage(imageUrl);

      const updatedProduct =
        await dispatch(
          deleteProductImage({
            productId:
              currentProduct._id,
            imageUrl,
          })
        ).unwrap();

      setExistingImages(
        Array.isArray(
          updatedProduct?.images
        )
          ? updatedProduct.images
          : []
      );

      alert(
        "Image deleted successfully"
      );
    } catch (error) {
      console.error(
        "Delete image error:",
        error
      );

      alert(
        error ||
        "Failed to delete image"
      );
    } finally {
      setDeletingImage(null);
    }
  };

  // =========================
  // REPLACE EXISTING IMAGE
  // =========================

  const handleReplaceExistingImage = async (
    imageUrl
  ) => {
    if (!currentProduct?._id) {
      return;
    }

    // Create temporary file input
    const input =
      document.createElement("input");

    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (event) => {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      // =========================
      // VALIDATE IMAGE
      // =========================

      if (!file.type.startsWith("image/")) {
        alert(
          "Only image files are allowed."
        );
        return;
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        alert(
          "Image must be 5 MB or smaller."
        );
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to replace this image?"
      );

      if (!confirmed) {
        return;
      }

      try {
        setReplacingImage(imageUrl);

        const updatedProduct =
          await dispatch(
            replaceProductImage({
              productId:
                currentProduct._id,
              imageUrl,
              image: file,
            })
          ).unwrap();

        setExistingImages(
          Array.isArray(
            updatedProduct?.images
          )
            ? updatedProduct.images
            : []
        );

        alert(
          "Image replaced successfully"
        );
      } catch (error) {
        console.error(
          "Replace image error:",
          error
        );

        alert(
          error ||
          "Failed to replace image"
        );
      } finally {
        setReplacingImage(null);
      }
    };

    input.click();
  };

  // =========================
  // ADD SECTION
  // =========================

  const addSection = () => {
    setSections((previous) => [
      ...previous,
      {
        heading: "",
        fields: [],
      },
    ]);
  };

  // =========================
  // REMOVE SECTION
  // =========================

  const removeSection = (
    sectionIndex
  ) => {
    setSections((previous) =>
      previous.filter(
        (_, index) =>
          index !== sectionIndex
      )
    );
  };

  // =========================
  // UPDATE SECTION HEADING
  // =========================

  const updateSectionHeading = (
    sectionIndex,
    value
  ) => {
    setSections((previous) =>
      previous.map(
        (section, index) =>
          index === sectionIndex
            ? {
              ...section,
              heading: value,
            }
            : section
      )
    );
  };

  // =========================
  // ADD FIELD
  // =========================

  const addField = (
    sectionIndex
  ) => {
    setSections((previous) =>
      previous.map(
        (section, index) =>
          index === sectionIndex
            ? {
              ...section,
              fields: [
                ...section.fields,
                {
                  name: "",
                  value: "",
                  isPublic: false,
                },
              ],
            }
            : section
      )
    );
  };

  // =========================
  // REMOVE FIELD
  // =========================

  const removeField = (
    sectionIndex,
    fieldIndex
  ) => {
    setSections((previous) =>
      previous.map(
        (section, index) =>
          index === sectionIndex
            ? {
              ...section,
              fields:
                section.fields.filter(
                  (_, currentIndex) =>
                    currentIndex !==
                    fieldIndex
                ),
            }
            : section
      )
    );
  };

  // =========================
  // UPDATE FIELD
  // =========================

  const updateField = (
    sectionIndex,
    fieldIndex,
    fieldName,
    value
  ) => {
    setSections((previous) =>
      previous.map(
        (section, index) => {
          if (
            index !== sectionIndex
          ) {
            return section;
          }

          return {
            ...section,
            fields:
              section.fields.map(
                (
                  field,
                  currentIndex
                ) =>
                  currentIndex ===
                    fieldIndex
                    ? {
                      ...field,
                      [fieldName]:
                        value,
                    }
                    : field
              ),
          };
        }
      )
    );
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setFormError("");

    if (!applicationId) {
      setFormError(
        "Application information is missing."
      );
      return;
    }

    if (!formData.modelName.trim()) {
      setFormError(
        "Model name is required."
      );
      return;
    }

    if (!formData.slug.trim()) {
      setFormError(
        "Slug is required."
      );
      return;
    }

    if (!formData.description.trim()) {
      setFormError(
        "Description is required."
      );
      return;
    }

    // =========================
    // IMAGE VALIDATION
    // =========================

    if (
      existingImages.length +
      images.length >
      5
    ) {
      setFormError(
        "A product can have a maximum of 5 images."
      );
      return;
    }

    for (const image of images) {
      if (!image.type.startsWith("image/")) {
        setFormError(
          "Only image files are allowed."
        );
        return;
      }

      if (
        image.size >
        5 * 1024 * 1024
      ) {
        setFormError(
          "Each image must be 5 MB or smaller."
        );
        return;
      }
    }

    // =========================
    // SPECIFICATION VALIDATION
    // =========================

    for (
      let sectionIndex = 0;
      sectionIndex < sections.length;
      sectionIndex++
    ) {
      const section =
        sections[sectionIndex];

      if (!section.heading.trim()) {
        setFormError(
          `Specification section ${sectionIndex + 1
          } heading is required.`
        );
        return;
      }

      if (!section.fields.length) {
        setFormError(
          `Add at least one specification to "${section.heading}".`
        );
        return;
      }

      for (
        let fieldIndex = 0;
        fieldIndex <
        section.fields.length;
        fieldIndex++
      ) {
        const field =
          section.fields[fieldIndex];

        if (!field.name.trim()) {
          setFormError(
            `Specification ${fieldIndex + 1
            } name is required in "${section.heading}".`
          );
          return;
        }

        if (!field.value.trim()) {
          setFormError(
            `Specification "${field.name}" value is required.`
          );
          return;
        }
      }
    }

    // =========================
    // FORM DATA
    // =========================

    const productData =
      new FormData();

    productData.append(
      "modelName",
      formData.modelName.trim()
    );

    productData.append(
      "slug",
      formData.slug
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
    );

    productData.append(
      "application",
      applicationId
    );

    productData.append(
      "description",
      formData.description.trim()
    );

    productData.append(
      "seo",
      JSON.stringify({
        title: seo.title.trim(),
        description:
          seo.description.trim(),
        keywords:
          seo.keywords.trim(),
      })
    );

    productData.append(
      "sections",
      JSON.stringify(sections)
    );

    images.forEach((image) => {
      productData.append(
        "images",
        image
      );
    });

    // =========================
    // SAVE PRODUCT
    // =========================

    try {
      if (isEditMode) {
        await dispatch(
          updateProduct({
            productId,
            productData,
          })
        ).unwrap();
      } else {
        await dispatch(
          createProduct(
            productData
          )
        ).unwrap();
      }

      navigate(
        `/admin/products/application/${applicationId}`
      );
    } catch (error) {
      setFormError(
        typeof error === "string"
          ? error
          : "Failed to save product"
      );
    }
  };

  // =========================
  // BACK
  // =========================

  const handleBack = () => {
    navigate(
      `/admin/products/application/${applicationId}`
    );
  };

  // =========================
  // STATES
  // =========================

  const loading =
    productLoading ||
    applicationLoading;

  const saving =
    creating ||
    updating;

  const error =
    formError ||
    productError ||
    applicationError;

  // =========================
  // EDIT LOADING
  // =========================

  if (
    isEditMode &&
    loading &&
    !currentProduct
  ) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div className="p-4 md:p-6">

      {/* Back */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-5 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft size={18} />
        Back to Models
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {isEditMode
            ? "Edit Product Model"
            : "Add New Product Model"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {currentApplication?.name
            ? `Application: ${currentApplication.name}`
            : "Product model details"}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Basic Information */}
        <BasicInformation
          formData={formData}
          handleChange={handleChange}
          currentApplication={
            currentApplication
          }
        />

        {/* SEO */}
        <SeoInformation
          seo={seo}
          handleSeoChange={
            handleSeoChange
          }
        />

        {/* Specifications */}
        <Specifications
          sections={sections}
          addSection={addSection}
          removeSection={
            removeSection
          }
          updateSectionHeading={
            updateSectionHeading
          }
          addField={addField}
          removeField={removeField}
          updateField={updateField}
        />

        {/* =========================
            PRODUCT IMAGES
        ========================= */}

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">

          <h2 className="mb-1 text-lg font-semibold text-gray-800">
            Product Images
          </h2>

          <p className="mb-4 text-sm text-gray-500">
            Upload up to 5 product images.
            Maximum 5 MB per image.
          </p>

          {/* Existing Images */}
          {isEditMode &&
            existingImages.length > 0 && (
              <div className="mb-6">

                <p className="mb-3 text-sm font-medium text-gray-700">
                  Existing Images
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {existingImages.map(
                    (image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                      >

                        <img
                          src={image}
                          alt={`${formData.modelName || "Product"} ${index + 1
                            }`}
                          className="h-56 w-full object-contain"
                        />

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteExistingImage(
                              image
                            )
                          }
                          disabled={
                            deletingImage ===
                            image ||
                            replacingImage ===
                            image
                          }
                          className="absolute right-2 top-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingImage ===
                            image
                            ? "Deleting..."
                            : "Delete"}
                        </button>

                        {/* Replace */}
                        <button
                          type="button"
                          onClick={() =>
                            handleReplaceExistingImage(
                              image
                            )
                          }
                          disabled={
                            deletingImage ===
                            image ||
                            replacingImage ===
                            image
                          }
                          className="absolute bottom-2 right-2 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {replacingImage ===
                            image
                            ? "Replacing..."
                            : "Replace"}
                        </button>

                      </div>
                    )
                  )}

                </div>

              </div>
            )}

          {/* File Input */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={
              handleImageChange
            }
            className="block w-full rounded-lg border border-gray-300 p-2 text-sm"
          />

          {/* Newly Selected Images */}
          {images.length > 0 && (
            <div className="mt-5">

              <p className="mb-3 text-sm font-medium text-gray-700">
                New Images Selected
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {images.map(
                  (image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                    >

                      <img
                        src={URL.createObjectURL(
                          image
                        )}
                        alt={image.name}
                        className="h-56 w-full object-contain"
                      />

                      <div className="border-t border-gray-200 p-2">
                        <p className="truncate text-xs text-gray-600">
                          {image.name}
                        </p>
                      </div>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

          {/* No Images */}
          {isEditMode &&
            existingImages.length === 0 &&
            images.length === 0 && (
              <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-5 text-center text-sm text-gray-500">
                No product images added.
              </div>
            )}

        </div>

        {/* Actions */}
        <FormActions
          handleBack={handleBack}
          saving={saving}
          isEditMode={isEditMode}
        />

      </form>
    </div>
  );
};

export default ProductForm;