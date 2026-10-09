import React from "react";
import { Plus, Trash2 } from "lucide-react";

const QuotationSpecifications = ({
  formData,
  setFormData,
}) => {
  const createSpecification = () => ({
    id: `${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`,
    label: "",
    value: "",
  });

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        createSpecification(),
      ],
    }));
  };

  const removeSpecification = (id) => {
    setFormData((prev) => ({
      ...prev,
      specifications:
        prev.specifications.length === 1
          ? prev.specifications
          : prev.specifications.filter(
              (item) => item.id !== id
            ),
    }));
  };

  const updateSpecification = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
            3
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Specifications
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Add dynamic specification label and value pairs.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addSpecification}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
        >
          <Plus size={15} />
          Add Specification
        </button>
      </div>

      <div className="space-y-3 p-5">
        {formData.specifications.map(
          (specification, index) => (
            <div
              key={specification.id}
              className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 md:grid-cols-[1fr_1.5fr_auto]"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Label {index + 1}
                </label>

                <input
                  type="text"
                  value={specification.label}
                  onChange={(e) =>
                    updateSpecification(
                      specification.id,
                      "label",
                      e.target.value
                    )
                  }
                  placeholder="Capacity"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Value {index + 1}
                </label>

                <input
                  type="text"
                  value={specification.value}
                  onChange={(e) =>
                    updateSpecification(
                      specification.id,
                      "value",
                      e.target.value
                    )
                  }
                  placeholder="1000 Kg / Hour"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() =>
                    removeSpecification(
                      specification.id
                    )
                  }
                  className="flex h-10 w-full items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 transition hover:bg-red-50 md:w-10"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default QuotationSpecifications;