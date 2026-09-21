import React from "react";
import { Plus, Trash2 } from "lucide-react";

const SpecificationSection = ({
  section,
  sectionIndex,
  updateSectionHeading,
  removeSection,
  addField,
  removeField,
  updateField,
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      {/* Section Header */}
      <div className="flex gap-3">
        <input
          type="text"
          value={section.heading}
          onChange={(event) =>
            updateSectionHeading(
              sectionIndex,
              event.target.value
            )
          }
          placeholder="Section heading, e.g. General Specifications"
          className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500"
        />

        <button
          type="button"
          onClick={() => removeSection(sectionIndex)}
          className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
          title="Remove section"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Fields */}
      <div className="mt-4 space-y-3">
        {section.fields.map((field, fieldIndex) => (
          <div
            key={fieldIndex}
            className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-white p-3 md:grid-cols-12"
          >
            {/* Field Name */}
            <div className="md:col-span-4">
              <input
                type="text"
                value={field.name}
                onChange={(event) =>
                  updateField(
                    sectionIndex,
                    fieldIndex,
                    "name",
                    event.target.value
                  )
                }
                placeholder="Field name"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>

            {/* Field Value */}
            <div className="md:col-span-5">
              <input
                type="text"
                value={field.value}
                onChange={(event) =>
                  updateField(
                    sectionIndex,
                    fieldIndex,
                    "value",
                    event.target.value
                  )
                }
                placeholder="Field value"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>

            {/* Public */}
            <div className="flex items-center gap-3 md:col-span-2">
              <label className="flex items-center gap-2 text-xs text-gray-600">
                <input
                  type="checkbox"
                  checked={field.isPublic}
                  onChange={(event) =>
                    updateField(
                      sectionIndex,
                      fieldIndex,
                      "isPublic",
                      event.target.checked
                    )
                  }
                />

                Public
              </label>
            </div>

            {/* Delete Field */}
            <div className="flex justify-end md:col-span-1">
              <button
                type="button"
                onClick={() =>
                  removeField(
                    sectionIndex,
                    fieldIndex
                  )
                }
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                title="Remove field"
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Field */}
      <button
        type="button"
        onClick={() => addField(sectionIndex)}
        className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <Plus size={16} />
        Add Specification
      </button>
    </div>
  );
};

export default SpecificationSection;