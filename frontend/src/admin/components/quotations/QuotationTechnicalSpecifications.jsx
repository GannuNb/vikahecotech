import React from "react";
import { Plus, Trash2 } from "lucide-react";

const createId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const createField = () => ({
  id: createId(),
  label: "",
  value: "",
});

const createTechnicalSection = () => ({
  id: createId(),
  title: "",
  fields: [createField()],
});

const QuotationTechnicalSpecifications = ({
  formData,
  setFormData,
}) => {
  // --------------------------------------------------
  // Add Technical Section
  // --------------------------------------------------

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      technicalSpecifications: [
        ...(prev.technicalSpecifications || []),
        createTechnicalSection(),
      ],
    }));
  };

  // --------------------------------------------------
  // Remove Technical Section
  // --------------------------------------------------

  const removeSection = (sectionId) => {
    setFormData((prev) => ({
      ...prev,
      technicalSpecifications: (
        prev.technicalSpecifications || []
      ).filter((section) => section.id !== sectionId),
    }));
  };

  // --------------------------------------------------
  // Update Section Title
  // --------------------------------------------------

  const updateSectionTitle = (
    sectionId,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,

      technicalSpecifications: (
        prev.technicalSpecifications || []
      ).map((section) =>
        section.id === sectionId
          ? {
              ...section,
              title: value,
            }
          : section
      ),
    }));
  };

  // --------------------------------------------------
  // Add Field
  // --------------------------------------------------

  const addField = (sectionId) => {
    setFormData((prev) => ({
      ...prev,

      technicalSpecifications: (
        prev.technicalSpecifications || []
      ).map((section) =>
        section.id === sectionId
          ? {
              ...section,

              fields: [
                ...(section.fields || []),
                createField(),
              ],
            }
          : section
      ),
    }));
  };

  // --------------------------------------------------
  // Remove Field
  // --------------------------------------------------

  const removeField = (
    sectionId,
    fieldId
  ) => {
    setFormData((prev) => ({
      ...prev,

      technicalSpecifications: (
        prev.technicalSpecifications || []
      ).map((section) =>
        section.id === sectionId
          ? {
              ...section,

              fields:
                section.fields.length === 1
                  ? section.fields
                  : section.fields.filter(
                      (field) =>
                        field.id !== fieldId
                    ),
            }
          : section
      ),
    }));
  };

  // --------------------------------------------------
  // Update Field
  // --------------------------------------------------

  const updateField = (
    sectionId,
    fieldId,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,

      technicalSpecifications: (
        prev.technicalSpecifications || []
      ).map((section) =>
        section.id === sectionId
          ? {
              ...section,

              fields: section.fields.map(
                (item) =>
                  item.id === fieldId
                    ? {
                        ...item,
                        [field]: value,
                      }
                    : item
              ),
            }
          : section
      ),
    }));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* --------------------------------------------------
          Header
      -------------------------------------------------- */}

      <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
            7
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Technical Specifications
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Add technical specification sections and their details.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addSection}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
        >
          <Plus size={15} />
          Add Section
        </button>
      </div>

      {/* --------------------------------------------------
          Content
      -------------------------------------------------- */}

      <div className="space-y-5 p-5">
        {/* Empty State */}

        {(!formData.technicalSpecifications ||
          formData.technicalSpecifications.length === 0) && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center">
            <p className="text-sm font-medium text-gray-700">
              No technical specifications added
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Add a section to start entering technical details.
            </p>

            <button
              type="button"
              onClick={addSection}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
            >
              <Plus size={15} />
              Add Section
            </button>
          </div>
        )}

        {/* Technical Sections */}

        {(formData.technicalSpecifications || []).map(
          (section, sectionIndex) => (
            <div
              key={section.id}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              {/* Section Header */}

              <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full sm:max-w-xl">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Section Title {sectionIndex + 1}

                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) =>
                      updateSectionTitle(
                        section.id,
                        e.target.value
                      )
                    }
                    placeholder="Machine Specifications"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeSection(section.id)
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Remove Section
                </button>
              </div>

              {/* Fields */}

              <div className="p-4">
                <div className="space-y-3">
                  {(section.fields || []).map(
                    (field, fieldIndex) => (
                      <div
                        key={field.id}
                        className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1.5fr_auto]"
                      >
                        {/* Label */}

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-600">
                            Label {fieldIndex + 1}
                          </label>

                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) =>
                              updateField(
                                section.id,
                                field.id,
                                "label",
                                e.target.value
                              )
                            }
                            placeholder="Motor"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                          />
                        </div>

                        {/* Value */}

                        <div>
                          <label className="mb-1 block text-xs font-medium text-gray-600">
                            Value {fieldIndex + 1}
                          </label>

                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              updateField(
                                section.id,
                                field.id,
                                "value",
                                e.target.value
                              )
                            }
                            placeholder="50 HP"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                          />
                        </div>

                        {/* Remove Field */}

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() =>
                              removeField(
                                section.id,
                                field.id
                              )
                            }
                            disabled={
                              section.fields.length === 1
                            }
                            className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                            title="Remove field"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Add Field */}

                <button
                  type="button"
                  onClick={() =>
                    addField(section.id)
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  <Plus size={16} />
                  Add Field
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default QuotationTechnicalSpecifications;