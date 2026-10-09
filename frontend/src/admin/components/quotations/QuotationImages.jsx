import React from "react";
import { ImagePlus, Trash2 } from "lucide-react";

const QuotationImages = ({
  formData,
  setFormData,
}) => {
  // --------------------------------------------------
  // Add Main Quotation Images
  // --------------------------------------------------

  const handleImagesChange = (event) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    setFormData((prev) => ({
      ...prev,

      images: [
        ...(prev.images || []),
        ...files,
      ],
    }));

    event.target.value = "";
  };

  // --------------------------------------------------
  // Remove Main Image
  // --------------------------------------------------

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,

      images: (prev.images || []).filter(
        (_, imageIndex) =>
          imageIndex !== index
      ),
    }));
  };

  // --------------------------------------------------
  // Add Reference Images
  // --------------------------------------------------

  const handleReferenceImagesChange = (
    event
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    setFormData((prev) => ({
      ...prev,

      referenceImages: [
        ...(prev.referenceImages || []),
        ...files,
      ],
    }));

    event.target.value = "";
  };

  // --------------------------------------------------
  // Remove Reference Image
  // --------------------------------------------------

  const removeReferenceImage = (index) => {
    setFormData((prev) => ({
      ...prev,

      referenceImages: (
        prev.referenceImages || []
      ).filter(
        (_, imageIndex) =>
          imageIndex !== index
      ),
    }));
  };

  // --------------------------------------------------
  // Format File Size
  // --------------------------------------------------

  const formatFileSize = (bytes) => {
    if (!bytes) {
      return "0 KB";
    }

    const kb = bytes / 1024;

    if (kb < 1024) {
      return `${kb.toFixed(1)} KB`;
    }

    const mb = kb / 1024;

    return `${mb.toFixed(1)} MB`;
  };

  // --------------------------------------------------
  // Image Preview
  // --------------------------------------------------

  const getPreviewUrl = (file) => {
    if (!(file instanceof File)) {
      return "";
    }

    return URL.createObjectURL(file);
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      {/* --------------------------------------------------
          Header
      -------------------------------------------------- */}

      <div className="flex items-start gap-3 border-b border-gray-200 px-5 py-4">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
          8
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900">
            Quotation Images
          </h2>

          <p className="mt-0.5 text-xs text-gray-500">
            Add quotation images and reference images.
          </p>
        </div>

      </div>

      {/* --------------------------------------------------
          Main Images
      -------------------------------------------------- */}

      <div className="space-y-6 p-5">

        <div>
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Quotation Images
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Images that belong to the main quotation.
            </p>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center transition hover:border-gray-400 hover:bg-gray-100">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <ImagePlus
                size={23}
                className="text-gray-500"
              />
            </div>

            <p className="mt-3 text-sm font-semibold text-gray-700">
              Click to upload images
            </p>

            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, JPEG or WEBP
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              className="hidden"
              onChange={handleImagesChange}
            />

          </label>

          {/* Main Image List */}

          {formData.images?.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {formData.images.map(
                (file, index) => {
                  const previewUrl =
                    getPreviewUrl(file);

                  return (
                    <div
                      key={`${file.name}-${index}`}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                    >
                      {/* Preview */}

                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt={file.name}
                          className="h-40 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center bg-gray-100 text-xs text-gray-500">
                          Image Preview
                        </div>
                      )}

                      {/* Details */}

                      <div className="flex items-center justify-between gap-3 p-3">

                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-gray-700">
                            {file.name}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {formatFileSize(
                              file.size
                            )}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                          title="Remove image"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* --------------------------------------------------
            Reference Images
        -------------------------------------------------- */}

        <div className="border-t border-gray-200 pt-6">

          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Reference Images
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Add reference photos that will be included separately in the quotation.
            </p>
          </div>

          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-8 text-center transition hover:border-gray-400 hover:bg-gray-100">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
              <ImagePlus
                size={23}
                className="text-gray-500"
              />
            </div>

            <p className="mt-3 text-sm font-semibold text-gray-700">
              Click to upload reference images
            </p>

            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, JPEG or WEBP
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              multiple
              className="hidden"
              onChange={
                handleReferenceImagesChange
              }
            />

          </label>

          {/* Reference Image List */}

          {formData.referenceImages?.length >
            0 && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {formData.referenceImages.map(
                (file, index) => {
                  const previewUrl =
                    getPreviewUrl(file);

                  return (
                    <div
                      key={`${file.name}-${index}`}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                    >
                      {/* Preview */}

                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt={file.name}
                          className="h-40 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-40 items-center justify-center bg-gray-100 text-xs text-gray-500">
                          Image Preview
                        </div>
                      )}

                      {/* Details */}

                      <div className="flex items-center justify-between gap-3 p-3">

                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-gray-700">
                            {file.name}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {formatFileSize(
                              file.size
                            )}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeReferenceImage(
                              index
                            )
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                          title="Remove image"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

export default QuotationImages;