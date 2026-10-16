
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FolderTree,
  Plus,
  Search,
  Pencil,
  Trash2,
  Power,
  RefreshCw,
  X,
  Eye,
} from "lucide-react";
import api from "../../../services/api";

const INITIAL_FORM = {
  name: "",
  isActive: true,
};

const QuotationCategories = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();

  const [application, setApplication] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getErrorMessage = (err) =>
    err.response?.data?.message ||
    err.response?.data?.error ||
    err.message ||
    "Something went wrong. Please try again.";

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [applicationResponse, categoryResponse] = await Promise.all([
        api.get(`/api/admin/quotation-applications/${applicationId}`),
        api.get("/api/admin/quotation-categories", {
          params: { application: applicationId },
        }),
      ]);

      const applicationResult = applicationResponse.data;
      setApplication(
        applicationResult?.data ||
          applicationResult?.application ||
          applicationResult
      );

      const result = categoryResponse.data;
      const list = Array.isArray(result)
        ? result
        : result?.categories || result?.data || [];

      if (!Array.isArray(list)) {
        throw new Error("Invalid categories response.");
      }

      setCategories(list);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await api.put(`/api/admin/quotation-categories/${editingId}`, {
          name: form.name.trim(),
          isActive: form.isActive,
        });
        setSuccess("Category updated successfully.");
      } else {
        await api.post("/api/admin/quotation-categories", {
          name: form.name.trim(),
          application: applicationId,
        });
        setSuccess("Category created successfully.");
      }

      setForm(INITIAL_FORM);
      setEditingId(null);
      await fetchData();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setForm({
      name: category.name || "",
      isActive: category.isActive ?? true,
    });
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleStatus = async (category) => {
    try {
      setActionId(category._id);
      setError("");
      setSuccess("");

      await api.put(`/api/admin/quotation-categories/${category._id}`, {
        isActive: !category.isActive,
      });

      setSuccess(
        `Category ${
          category.isActive ? "deactivated" : "activated"
        } successfully.`
      );

      await fetchData();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Delete "${category.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setActionId(category._id);
      setError("");
      setSuccess("");

      await api.delete(`/api/admin/quotation-categories/${category._id}`);

      if (editingId === category._id) {
        resetForm();
      }

      setSuccess("Category deleted successfully.");
      await fetchData();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setActionId(null);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={() =>
                navigate("/admin/quotation-applications")
              }
              aria-label="Back to applications"
              className="mt-1 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <FolderTree size={23} className="text-slate-700" />
                <h1 className="text-2xl font-bold text-slate-900">
                  Quotation Categories
                </h1>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Manage categories and their capacities.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </header>

        {error && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <span>{error}</span>
            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="flex items-start justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            <span>{success}</span>
            <button
              type="button"
              onClick={() => setSuccess("")}
              aria-label="Dismiss success message"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Selected Application
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {application?.name || "Loading application..."}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Categories created here belong to this application.
          </p>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-900">
            {editingId ? "Edit Category" : "Add Category"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <label
                  htmlFor="quotationCategoryName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category Name *
                </label>

                <input
                  id="quotationCategoryName"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Primary Shredder"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              {editingId && (
                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={form.isActive}
                      onChange={handleChange}
                      className="h-4 w-4 accent-slate-900"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Category active
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving || loading || !application}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={17} />
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Category"
                  : "Add Category"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Categories
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {categories.length} categor
                {categories.length === 1 ? "y" : "ies"} found
              </p>
            </div>

            <div className="w-full sm:max-w-xs">
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search categories..."
                className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">
              Loading categories...
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">
              {search
                ? "No matching categories."
                : "No categories yet. Add the first category above."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Slug</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredCategories.map((category) => (
                    <tr
                      key={category._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {category.name}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {category.slug || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            category.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/admin/quotation-categories/${category._id}/capacities`
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                          >
                            <Eye size={15} />
                            View Capacities
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEdit(category)}
                            title="Edit category"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleStatus(category)}
                            disabled={actionId === category._id}
                            title="Toggle category status"
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 disabled:opacity-50"
                          >
                            <Power size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(category)}
                            disabled={actionId === category._id}
                            title="Delete category"
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

export default QuotationCategories;
