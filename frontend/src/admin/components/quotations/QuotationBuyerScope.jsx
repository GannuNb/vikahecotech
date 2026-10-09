import React from "react";
import { Plus, Trash2 } from "lucide-react";

const createId = () =>
  `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

const createScopeItem = () => ({
  id: createId(),
  label: "",
  value: "",
});

const QuotationBuyerScope = ({
  formData,
  setFormData,
}) => {
  const buyerScope = formData.buyerScope || [];

  // --------------------------------------------------
  // Add Scope Item
  // --------------------------------------------------

  const addScopeItem = () => {
    setFormData((prev) => ({
      ...prev,

      buyerScope: [
        ...(prev.buyerScope || []),
        createScopeItem(),
      ],
    }));
  };

  // --------------------------------------------------
  // Remove Scope Item
  // --------------------------------------------------

  const removeScopeItem = (itemId) => {
    setFormData((prev) => ({
      ...prev,

      buyerScope: (prev.buyerScope || []).filter(
        (item) => item.id !== itemId
      ),
    }));
  };

  // --------------------------------------------------
  // Update Scope Item
  // --------------------------------------------------

  const updateScopeItem = (
    itemId,
    field,
    value
  ) => {
    setFormData((prev) => ({
      ...prev,

      buyerScope: (prev.buyerScope || []).map(
        (item) =>
          item.id === itemId
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
      {/* Header */}

      <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-sm font-semibold text-white">
            9
          </div>

          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Buyer Scope
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              Define the items, responsibilities and scope applicable to the buyer.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={addScopeItem}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-semibold text-white hover:bg-gray-800"
        >
          <Plus size={15} />
          Add Scope Item
        </button>
      </div>

      {/* Content */}

      <div className="p-5">
        {buyerScope.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-5 py-10 text-center">
            <p className="text-sm font-medium text-gray-700">
              No buyer scope added
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Add scope items to include them in the quotation.
            </p>

            <button
              type="button"
              onClick={addScopeItem}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
            >
              <Plus size={15} />
              Add Scope Item
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {buyerScope.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 md:grid-cols-[1fr_2fr_auto]"
              >
                {/* Label */}

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Scope / Item {index + 1}
                  </label>

                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) =>
                      updateScopeItem(
                        item.id,
                        "label",
                        e.target.value
                      )
                    }
                    placeholder="Civil Work"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                {/* Value */}

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">
                    Description
                  </label>

                  <textarea
                    rows="2"
                    value={item.value}
                    onChange={(e) =>
                      updateScopeItem(
                        item.id,
                        "value",
                        e.target.value
                      )
                    }
                    placeholder="Civil foundation and required site preparation are in buyer scope."
                    className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-100"
                  />
                </div>

                {/* Remove */}

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={() =>
                      removeScopeItem(item.id)
                    }
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
                    title="Remove scope item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuotationBuyerScope;