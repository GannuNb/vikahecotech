import React from "react";

const QuotationInformation = ({ formData, setFormData }) => {
  const updateDescription = (value) => {
    setFormData((prev) => ({
      ...prev,
      information: {
        ...prev.information,
        description: value,
      },
    }));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
            2
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Information
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Add general information that will appear in the quotation.
            </p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Description
        </label>

        <textarea
          value={formData.information.description}
          onChange={(e) => updateDescription(e.target.value)}
          placeholder="Enter quotation or project information..."
          rows={6}
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
        />
      </div>
    </section>
  );
};

export default QuotationInformation;