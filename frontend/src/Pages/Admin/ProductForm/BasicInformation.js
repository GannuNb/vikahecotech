import React from "react";

const BasicInformation = ({
  formData,
  handleChange,
  currentApplication,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-800">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Model Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Model Name
          </label>

          <input
            type="text"
            name="modelName"
            value={formData.modelName}
            onChange={handleChange}
            placeholder="Example: BLT-150"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Example: blt150"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
          />

          <p className="mt-1 text-xs text-gray-500">
            Public URL: /{formData.slug || "model-slug"}
          </p>
        </div>
      </div>

      {/* Application */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Application
        </label>

        <input
          type="text"
          value={currentApplication?.name || ""}
          disabled
          className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-500"
        />

        <p className="mt-1 text-xs text-gray-500">
          Application is automatically selected from the current page.
        </p>
      </div>

      {/* Description */}
      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Enter product description..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
        />
      </div>
    </div>
  );
};

export default BasicInformation;