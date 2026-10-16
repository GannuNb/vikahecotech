
import React, { useEffect, useState } from "react";
import { FolderTree } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Power,
    RefreshCw,
    Layers3,
    X,
} from "lucide-react";

const INITIAL_FORM = {
    name: "",
    isActive: true,
};

const QuotationManagement = () => {
    const [applications, setApplications] = useState([]);
    const [form, setForm] = useState(INITIAL_FORM);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const getErrorMessage = (err) =>
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Please try again.";

    // Fetch quotation applications
    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/api/admin/quotation-applications"
            );

            const result = response.data;

            const list = Array.isArray(result)
                ? result
                : result?.applications ||
                result?.quotationApplications ||
                result?.data ||
                [];

            if (!Array.isArray(list)) {
                throw new Error("Invalid applications response");
            }

            setApplications(list);
        } catch (err) {
            setError(
                getErrorMessage(err) ===
                    "Something went wrong. Please try again."
                    ? err.message === "Invalid applications response"
                        ? err.message
                        : getErrorMessage(err)
                    : getErrorMessage(err)
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const resetForm = () => {
        setForm(INITIAL_FORM);
        setEditingId(null);
        setError("");
    };

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Create or update an application
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!form.name.trim()) {
            setError("Please enter an application name.");
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editingId) {
                await api.put(
                    `/api/admin/quotation-applications/${editingId}`,
                    {
                        name: form.name.trim(),
                        isActive: form.isActive,
                    }
                );

                setSuccess("Quotation application updated successfully.");
            } else {
                await api.post(
                    "/api/admin/quotation-applications",
                    {
                        name: form.name.trim(),
                    }
                );

                setSuccess("Quotation application created successfully.");
            }

            resetForm();
            await fetchApplications();
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setSaving(false);
        }
    };

    // Load an application into the form
    const handleEdit = (application) => {
        setEditingId(application._id);
        setForm({
            name: application.name || "",
            isActive: application.isActive ?? true,
        });

        setError("");
        setSuccess("");

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Activate or deactivate an application
    const handleToggleStatus = async (application) => {
        const nextStatus = !application.isActive;

        try {
            setError("");
            setSuccess("");

            await api.put(
                `/api/admin/quotation-applications/${application._id}`,
                {
                    isActive: nextStatus,
                }
            );

            setSuccess(
                `Application ${nextStatus ? "activated" : "deactivated"} successfully.`
            );

            await fetchApplications();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    // Delete an application
    const handleDelete = async (application) => {
        const confirmed = window.confirm(
            `Delete "${application.name}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setError("");
            setSuccess("");

            await api.delete(
                `/api/admin/quotation-applications/${application._id}`
            );

            if (editingId === application._id) {
                resetForm();
            }

            setSuccess("Quotation application deleted successfully.");
            await fetchApplications();
        } catch (err) {
            setError(getErrorMessage(err));
        }
    };

    const filteredApplications = applications.filter((application) =>
        application.name
            ?.toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-6">
                {/* Page heading */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                                <Layers3 size={24} />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    Quotation Management
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Manage applications for quotation requests.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={fetchApplications}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>

                {/* Notifications */}
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

                {/* Application form */}
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                {editingId
                                    ? "Edit Quotation Application"
                                    : "Add Quotation Application"}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Application names and slugs are managed separately from products.
                            </p>
                        </div>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                            >
                                Cancel edit
                            </button>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="md:col-span-2">
                                <label
                                    htmlFor="quotationApplicationName"
                                    className="mb-2 block text-sm font-semibold text-slate-700"
                                >
                                    Application Name
                                </label>

                                <input
                                    id="quotationApplicationName"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Tyre, Plastic, E-waste"
                                    maxLength={100}
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
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
                                            Application active
                                        </span>
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Plus size={17} />
                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Application"
                                        : "Add Application"}
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

                {/* Applications list */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:p-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">
                                Quotation Applications
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {applications.length} total application
                                {applications.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                        <div className="relative w-full sm:max-w-xs">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search applications..."
                                className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-sm text-slate-500">
                            Loading quotation applications...
                        </div>
                    ) : filteredApplications.length === 0 ? (
                        <div className="p-12 text-center">
                            <Layers3
                                size={36}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-3 font-semibold text-slate-800">
                                {search
                                    ? "No matching applications"
                                    : "No quotation applications yet"}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                {search
                                    ? "Try a different search term."
                                    : "Add your first quotation application using the form above."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px] text-left text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Application</th>
                                        <th className="px-6 py-4 font-semibold">Slug</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 text-right font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-slate-100">
                                    {filteredApplications.map((application) => (
                                        <tr
                                            key={application._id}
                                            className="transition hover:bg-slate-50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">
                                                    {application.name}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-slate-500">
                                                {application.slug || "-"}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${application.isActive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-slate-100 text-slate-600"
                                                        }`}
                                                >
                                                    {application.isActive
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/quotation-applications/${application._id}/categories`
                                                            )
                                                        }
                                                        title="Manage categories"
                                                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-50"
                                                    >
                                                        <FolderTree size={16} />
                                                        <span>Categories</span>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(application)}
                                                        title="Edit application"
                                                        aria-label={`Edit ${application.name}`}
                                                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                                                    >
                                                        <Pencil size={16} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleToggleStatus(application)
                                                        }
                                                        title={
                                                            application.isActive
                                                                ? "Deactivate application"
                                                                : "Activate application"
                                                        }
                                                        aria-label={`${application.isActive
                                                            ? "Deactivate"
                                                            : "Activate"
                                                            } ${application.name}`}
                                                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100"
                                                    >
                                                        <Power size={16} />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(application)}
                                                        title="Delete application"
                                                        aria-label={`Delete ${application.name}`}
                                                        className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
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

export default QuotationManagement;
