import React from "react";
import { Plus } from "lucide-react";

import SpecificationSection from "./SpecificationSection";

const Specifications = ({
  sections,
  addSection,
  removeSection,
  updateSectionHeading,
  addField,
  removeField,
  updateField,
}) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Technical Specifications
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Add specification sections and fields.
          </p>
        </div>

        <button
          type="button"
          onClick={addSection}
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Plus size={17} />
          Add Section
        </button>
      </div>

      {/* Empty State */}
      {sections.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
          No specification sections added yet.
        </div>
      )}

      {/* Sections */}
      <div className="space-y-5">
        {sections.map((section, sectionIndex) => (
          <SpecificationSection
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            updateSectionHeading={updateSectionHeading}
            removeSection={removeSection}
            addField={addField}
            removeField={removeField}
            updateField={updateField}
          />
        ))}
      </div>
    </div>
  );
};

export default Specifications;