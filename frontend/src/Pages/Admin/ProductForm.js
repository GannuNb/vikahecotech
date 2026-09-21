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
  }, [dispatch, isEditMode, productId]);

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
  }, [isEditMode, currentProduct]);

  // =========================
  // BASIC INPUT CHANGE
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // SEO CHANGE
  // =========================

  const handleSeoChange = (event) => {
    const { name, value } = event.target;

    setSeo((previous) => ({
      ...previous,
      [name]: value,
    }));
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

  const removeSection = (sectionIndex) => {
    setSections((previous) =>
      previous.filter(
        (_, index) => index !== sectionIndex
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
      previous.map((section, index) =>
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

  const addField = (sectionIndex) => {
    setSections((previous) =>
      previous.map((section, index) =>
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
      previous.map((section, index) =>
        index === sectionIndex
          ? {
              ...section,
              fields: section.fields.filter(
                (_, currentIndex) =>
                  currentIndex !== fieldIndex
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
      previous.map((section, index) => {
        if (index !== sectionIndex) {
          return section;
        }

        return {
          ...section,
          fields: section.fields.map(
            (field, currentIndex) =>
              currentIndex === fieldIndex
                ? {
                    ...field,
                    [fieldName]: value,
                  }
                : field
          ),
        };
      })
    );
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");

    if (!applicationId) {
      setFormError(
        "Application information is missing."
      );
      return;
    }

    if (!formData.modelName.trim()) {
      setFormError("Model name is required.");
      return;
    }

    if (!formData.slug.trim()) {
      setFormError("Slug is required.");
      return;
    }

    if (!formData.description.trim()) {
      setFormError("Description is required.");
      return;
    }
    // Validate specification sections
for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
  const section = sections[sectionIndex];

  if (!section.heading.trim()) {
    setFormError(
      `Specification section ${sectionIndex + 1} heading is required.`
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
    fieldIndex < section.fields.length;
    fieldIndex++
  ) {
    const field = section.fields[fieldIndex];

    if (!field.name.trim()) {
      setFormError(
        `Specification ${fieldIndex + 1} name is required in "${section.heading}".`
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

    const productData = {
      modelName: formData.modelName.trim(),

      slug: formData.slug
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-"),

      application: applicationId,

      description:
        formData.description.trim(),

      images: [],

      seo: {
        title: seo.title.trim(),
        description:
          seo.description.trim(),
        keywords:
          seo.keywords.trim(),
      },

      sections,
    };

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
          createProduct(productData)
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
          handleSeoChange={handleSeoChange}
        />

        {/* Specifications */}
        <Specifications
          sections={sections}
          addSection={addSection}
          removeSection={removeSection}
          updateSectionHeading={
            updateSectionHeading
          }
          addField={addField}
          removeField={removeField}
          updateField={updateField}
        />

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