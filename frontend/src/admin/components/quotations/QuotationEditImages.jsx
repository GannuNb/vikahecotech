import React, { useEffect, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";

const QuotationEditImages = ({
  formData,
  setFormData,
}) => {
  const [existingImagePreviews, setExistingImagePreviews] =
    useState([]);

  const [
    existingReferenceImagePreviews,
    setExistingReferenceImagePreviews,
  ] = useState([]);

  // ==================================================
  // EXISTING QUOTATION IMAGE PREVIEWS
  // ==================================================

  useEffect(() => {
    const keys = formData.existingImages || [];
    const urls = formData.existingImageUrls || [];

    const previews = keys.map((key, index) => ({
      key,
      url: urls[index] || "",
      index,
    }));

    setExistingImagePreviews(previews);
  }, [
    formData.existingImages,
    formData.existingImageUrls,
  ]);

  // ==================================================
  // EXISTING REFERENCE IMAGE PREVIEWS
  // ==================================================

  useEffect(() => {
    const keys =
      formData.existingReferenceImages || [];

    const urls =
      formData.existingReferenceImageUrls || [];

    const previews = keys.map((key, index) => ({
      key,
      url: urls[index] || "",
      index,
    }));

    setExistingReferenceImagePreviews(
      previews
    );
  }, [
    formData.existingReferenceImages,
    formData.existingReferenceImageUrls,
  ]);

  // ==================================================
  // ADD NEW QUOTATION IMAGES
  // ==================================================

  const handleAddImages = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    setFormData((previous) => ({
      ...previous,

      images: [
        ...(previous.images || []),
        ...files,
      ],
    }));

    // Allow selecting the same file again later.
    event.target.value = "";
  };

  // ==================================================
  // ADD NEW REFERENCE IMAGES
  // ==================================================

  const handleAddReferenceImages = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    setFormData((previous) => ({
      ...previous,

      referenceImages: [
        ...(previous.referenceImages || []),
        ...files,
      ],
    }));

    event.target.value = "";
  };

  // ==================================================
  // REMOVE EXISTING QUOTATION IMAGE
  // ==================================================

  const handleRemoveExistingImage = (
    imageKey
  ) => {
    setFormData((previous) => {
      const imageIndex = (
        previous.existingImages || []
      ).indexOf(imageKey);

      return {
        ...previous,

        existingImages: (
          previous.existingImages || []
        ).filter(
          (key) => key !== imageKey
        ),

        existingImageUrls: (
          previous.existingImageUrls || []
        ).filter(
          (_, index) =>
            index !== imageIndex
        ),
      };
    });
  };

  // ==================================================
  // REMOVE EXISTING REFERENCE IMAGE
  // ==================================================

  const handleRemoveExistingReferenceImage = (
    imageKey
  ) => {
    setFormData((previous) => {
      const imageIndex = (
        previous.existingReferenceImages || []
      ).indexOf(imageKey);

      return {
        ...previous,

        existingReferenceImages: (
          previous.existingReferenceImages || []
        ).filter(
          (key) => key !== imageKey
        ),

        existingReferenceImageUrls: (
          previous.existingReferenceImageUrls ||
          []
        ).filter(
          (_, index) =>
            index !== imageIndex
        ),
      };
    });
  };

  // ==================================================
  // REMOVE NEW QUOTATION IMAGE
  // ==================================================

  const handleRemoveNewImage = (index) => {
    setFormData((previous) => ({
      ...previous,

      images: (
        previous.images || []
      ).filter(
        (_, imageIndex) =>
          imageIndex !== index
      ),
    }));
  };

  // ==================================================
  // REMOVE NEW REFERENCE IMAGE
  // ==================================================

  const handleRemoveNewReferenceImage = (
    index
  ) => {
    setFormData((previous) => ({
      ...previous,

      referenceImages: (
        previous.referenceImages || []
      ).filter(
        (_, imageIndex) =>
          imageIndex !== index
      ),
    }));
  };

  // ==================================================
  // NEW FILE PREVIEW
  // ==================================================

  const getFilePreview = (file) => {
    if (!(file instanceof File)) {
      return "";
    }

    return URL.createObjectURL(file);
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
      {/* ==================================================
          HEADER
          ================================================== */}

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Quotation Images
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Manage existing quotation images and
          add new images.
        </p>
      </div>

      {/* ==================================================
          EXISTING QUOTATION IMAGES
          ================================================== */}

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Existing Quotation Images
        </h3>

        {existingImagePreviews.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
            No existing quotation images.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {existingImagePreviews.map(
              (image) => (
                <div
                  key={image.key}
                  className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  <img
                    src={image.url}
                    alt={`Quotation ${
                      image.index + 1
                    }`}
                    className="h-56 w-full object-contain"
                    onError={(event) => {
                      console.error(
                        "Failed to load quotation image:",
                        image.url
                      );

                      event.currentTarget.style.display =
                        "none";
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveExistingImage(
                        image.key
                      )
                    }
                    className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow transition hover:bg-red-700"
                    title="Remove image"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* ==================================================
          ADD NEW QUOTATION IMAGES
          ================================================== */}

      <div className="mb-8">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">
          <ImagePlus size={18} />

          Add Quotation Images

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAddImages}
            className="hidden"
          />
        </label>

        {formData.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formData.images.map(
              (file, index) => (
                <div
                  key={`${file.name}-${file.size}-${index}`}
                  className="relative overflow-hidden rounded-lg border border-blue-200 bg-gray-50"
                >
                  <img
                    src={getFilePreview(file)}
                    alt={`New quotation ${
                      index + 1
                    }`}
                    className="h-56 w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveNewImage(
                        index
                      )
                    }
                    className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow transition hover:bg-red-700"
                    title="Remove image"
                  >
                    <Trash2 size={17} />
                  </button>

                  <div className="border-t border-gray-200 bg-white px-3 py-2">
                    <p className="truncate text-xs text-gray-600">
                      {file.name}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* ==================================================
          EXISTING REFERENCE IMAGES
          ================================================== */}

      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold text-gray-800">
          Existing Reference Images
        </h3>

        {existingReferenceImagePreviews.length ===
        0 ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
            No existing reference images.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {existingReferenceImagePreviews.map(
              (image) => (
                <div
                  key={image.key}
                  className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50"
                >
                  <img
                    src={image.url}
                    alt={`Reference ${
                      image.index + 1
                    }`}
                    className="h-56 w-full object-contain"
                    onError={(event) => {
                      console.error(
                        "Failed to load reference image:",
                        image.url
                      );

                      event.currentTarget.style.display =
                        "none";
                    }}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveExistingReferenceImage(
                        image.key
                      )
                    }
                    className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow transition hover:bg-red-700"
                    title="Remove reference image"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* ==================================================
          ADD NEW REFERENCE IMAGES
          ================================================== */}

      <div>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">
          <ImagePlus size={18} />

          Add Reference Images

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={
              handleAddReferenceImages
            }
            className="hidden"
          />
        </label>

        {formData.referenceImages?.length >
          0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formData.referenceImages.map(
              (file, index) => (
                <div
                  key={`${file.name}-${file.size}-${index}`}
                  className="relative overflow-hidden rounded-lg border border-blue-200 bg-gray-50"
                >
                  <img
                    src={getFilePreview(file)}
                    alt={`New reference ${
                      index + 1
                    }`}
                    className="h-56 w-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveNewReferenceImage(
                        index
                      )
                    }
                    className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow transition hover:bg-red-700"
                    title="Remove reference image"
                  >
                    <Trash2 size={17} />
                  </button>

                  <div className="border-t border-gray-200 bg-white px-3 py-2">
                    <p className="truncate text-xs text-gray-600">
                      {file.name}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuotationEditImages;