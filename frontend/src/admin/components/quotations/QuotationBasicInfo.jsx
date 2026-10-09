import React from "react";

const QuotationBasicInfo = ({ formData, setFormData }) => {
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
            1
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Basic Information
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Enter the basic quotation details.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Quotation Name
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.quotationName}
            onChange={(e) =>
              updateField("quotationName", e.target.value)
            }
            placeholder="100 TPD Tyre Recycling Plant"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Quotation Date
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            type="date"
            value={formData.quotationDate}
            onChange={(e) =>
              updateField("quotationDate", e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Subject
            <span className="ml-1 text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.subject}
            onChange={(e) =>
              updateField("subject", e.target.value)
            }
            placeholder="Quotation for complete tyre recycling plant"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Prepared By
          </label>

          <input
            type="text"
            value={formData.preparedBy}
            onChange={(e) =>
              updateField("preparedBy", e.target.value)
            }
            placeholder="Prepared by"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Verified By
          </label>

          <input
            type="text"
            value={formData.verifiedBy}
            onChange={(e) =>
              updateField("verifiedBy", e.target.value)
            }
            placeholder="Verified by"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Approved By
          </label>

          <input
            type="text"
            value={formData.approvedBy}
            onChange={(e) =>
              updateField("approvedBy", e.target.value)
            }
            placeholder="Approved by"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
          />
        </div>
      </div>
    </section>
  );
};

export default QuotationBasicInfo;