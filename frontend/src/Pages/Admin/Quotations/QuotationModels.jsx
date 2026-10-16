
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Eye,
  Pencil,
  Trash2,
  RefreshCw,
} from "lucide-react";
import api from "../../../services/api";

const QuotationModels = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [category, setCategory] = useState(null);
  const [capacities, setCapacities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchCapacities = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [categoryResponse, modelsResponse] = await Promise.all([
        api.get(`/api/admin/quotation-categories/${categoryId}`),
        api.get("/api/admin/quotation-models", {
          params: { category: categoryId },
        }),
      ]);

      setCategory(
        categoryResponse.data.data ||
          categoryResponse.data.category ||
          categoryResponse.data
      );

      const result = modelsResponse.data;
      const list = Array.isArray(result)
        ? result
        : result.data || result.quotationModels || [];

      if (!Array.isArray(list)) {
        throw new Error("Invalid capacities response.");
      }

      setCapacities(list);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to load capacities."
      );
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCapacities();
  }, [fetchCapacities]);

  const handleDelete = async (capacity) => {
    const confirmed = window.confirm(
      `Delete capacity "${capacity.capacityName}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(capacity._id);
      setError("");

      await api.delete(`/api/admin/quotation-models/${capacity._id}`);
      await fetchCapacities();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete capacity."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const addCapacity = () => {
    navigate(`/admin/quotation-models/new?categoryId=${categoryId}`);
  };

  const getQuantity = (capacity) => {
    const quantity = Number(capacity.quantity);
    return Number.isInteger(quantity) && quantity >= 1 ? quantity : 1;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/quotation-applications/${
                    category?.application?._id ||
                    category?.application ||
                    ""
                  }/categories`
                )
              }
              className="mt-1 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-100"
              aria-label="Back to categories"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Capacities
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {category?.name
                  ? `Manage capacities for ${category.name}.`
                  : "Manage capacities for this category."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchCapacities}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
            >
              <RefreshCw size={16} />
              Refresh
            </button>

            <button
              type="button"
              onClick={addCapacity}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={17} />
              Add Capacity
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Capacities */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              {category?.name || "Category Capacities"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {capacities.length} capacity
              {capacities.length === 1 ? "" : "ies"} found
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">
              Loading capacities...
            </div>
          ) : capacities.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-lg font-semibold text-slate-800">
                No capacities yet
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Add the first capacity for this category.
              </p>
              <button
                type="button"
                onClick={addCapacity}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Add First Capacity
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Capacity Name</th>
                    <th className="px-6 py-4">Quantity</th>
                    <th className="px-6 py-4">Connecting Equipment</th>
                    <th className="px-6 py-4">Equipment Rows</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {capacities.map((capacity) => (
                    <tr key={capacity._id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {capacity.capacityName}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex min-w-10 items-center justify-center rounded-lg bg-blue-50 px-3 py-1.5 font-semibold text-blue-700">
                          {getQuantity(capacity)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {capacity.connectingEquipment === "with"
                          ? "With connecting equipment"
                          : "Without connecting equipment"}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {capacity.pricingTable?.length || 0}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            capacity.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {capacity.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {/* View */}
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/quotation-models/${capacity._id}/view?categoryId=${categoryId}`
                              )
                            }
                            title="View capacity"
                            aria-label={`View ${capacity.capacityName}`}
                            className="rounded-lg border border-blue-200 p-2 text-blue-600 hover:bg-blue-50"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/quotation-models/${capacity._id}/edit?categoryId=${categoryId}`
                              )
                            }
                            title="Edit capacity"
                            aria-label={`Edit ${capacity.capacityName}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Pencil size={16} />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(capacity)}
                            disabled={deletingId === capacity._id}
                            title="Delete capacity"
                            aria-label={`Delete ${capacity.capacityName}`}
                            className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default QuotationModels;
