import React from "react";
import { Plus, Trash2 } from "lucide-react";

const createId = () =>
  `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

const createCommercialTerm = () => ({
  id: createId(),
  label: "",
  value: "",
});

const QuotationCommercialTerms = ({
  formData,
  setFormData,
}) => {
  const commercialTerms =
    formData.commercialTerms || [];

  // --------------------------------------------------
  // Add Commercial Term
  // --------------------------------------------------

  const addCommercialTerm = () => {
    setFormData((prev) => ({
      ...prev,

      commercialTerms: [
        ...(prev.commercialTerms || []),
        createCommercialTerm(),
      ],
    }));
  };

  // --------------------------------------------------
  // Remove Commercial Term
  // --------------------------------------------------

  const removeCommercialTerm = (termId) => {
    setFormData((prev) => ({
      ...prev,

      commercialTerms: (
        prev.commercialTerms || []
      ).filter(
        (term) => term.id !== termId
      ),
    }));
  };

  // --------------------------------------------------
  // Update Commercial Term
  // --------------------------------------------------

  const updateCommercialTerm = (
    termId,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,

      commercialTerms: (
        prev.commercialTerms || []
      ).map((term) =>
        term.id === termId
          ? {
              ...term,
              [field]: value,
            }
          : term
      ),
    }));
  };

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
            10
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Commercial Terms
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Add and manage quotation commercial terms and conditions.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addCommercialTerm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
        >
          <Plus size={15} />
          Add Commercial Term
        </button>
      </div>

      {/* Content */}

      <div className="p-5">
        {commercialTerms.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center">
            <p className="text-sm font-medium text-gray-700">
              No commercial terms added
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Add terms and conditions that should appear in the quotation.
            </p>

            <button
              type="button"
              onClick={addCommercialTerm}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
            >
              <Plus size={15} />
              Add Commercial Term
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {commercialTerms.map(
              (term, index) => (
                <div
                  key={term.id}
                  className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-[1fr_2fr_auto]"
                >
                  {/* Term Name */}

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                      Term {index + 1}
                    </label>

                    <input
                      type="text"
                      value={term.label}
                      onChange={(e) =>
                        updateCommercialTerm(
                          term.id,
                          "label",
                          e.target.value
                        )
                      }
                      placeholder="Payment Terms"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>

                  {/* Term Description */}

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                      Details
                    </label>

                    <textarea
                      rows="2"
                      value={term.value}
                      onChange={(e) =>
                        updateCommercialTerm(
                          term.id,
                          "value",
                          e.target.value
                        )
                      }
                      placeholder="50% advance along with purchase order."
                      className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                    />
                  </div>

                  {/* Remove */}

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() =>
                        removeCommercialTerm(
                          term.id
                        )
                      }
                      className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                      title="Remove commercial term"
                    >
                      <Trash2 size={15} />
                    </button>
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

export default QuotationCommercialTerms;