import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Edit,
  Eye,
  FilePlus2,
  Search,
  Trash2,
  Power,
  RefreshCw,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const Quotations = () => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // STATE
  // --------------------------------------------------

  const [quotations, setQuotations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);

  const [updatingId, setUpdatingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  // --------------------------------------------------
  // FETCH QUOTATIONS
  // --------------------------------------------------

  const fetchQuotations = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/api/quotations");

      if (response.data?.success) {
        setQuotations(
          response.data.quotations || []
        );
      }
    } catch (error) {
      console.error(
        "Fetch quotations error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch quotations."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    fetchQuotations();
  }, []);

  // --------------------------------------------------
  // FILTER
  // --------------------------------------------------

  const filteredQuotations = useMemo(() => {
    return quotations.filter(
      (quotation) => {
        const search =
          searchTerm
            .trim()
            .toLowerCase();

        const matchesSearch =
          !search ||
          quotation.quotationName
            ?.toLowerCase()
            .includes(search) ||
          quotation.subject
            ?.toLowerCase()
            .includes(search);

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" &&
            quotation.isActive === true) ||
          (statusFilter === "inactive" &&
            quotation.isActive === false);

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    quotations,
    searchTerm,
    statusFilter,
  ]);

  // --------------------------------------------------
  // FORMAT CURRENCY
  // --------------------------------------------------

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);
  };

  // --------------------------------------------------
  // FORMAT DATE
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(
      date
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------------------------
  // TOGGLE STATUS
  // --------------------------------------------------

  const handleToggleStatus = async (
    quotation
  ) => {
    const nextStatus =
      !quotation.isActive;

    const confirmed =
      window.confirm(
        nextStatus
          ? "Activate this quotation?"
          : "Deactivate this quotation?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setUpdatingId(
        quotation._id
      );

      const response =
        await api.patch(
          `/api/quotations/${quotation._id}/status`,
          {
            isActive: nextStatus,
          }
        );

      if (response.data?.success) {
        setQuotations((prev) =>
          prev.map((item) =>
            item._id === quotation._id
              ? response.data.quotation
              : item
          )
        );

        alert(
          nextStatus
            ? "Quotation activated successfully."
            : "Quotation deactivated successfully."
        );
      }
    } catch (error) {
      console.error(
        "Toggle quotation status error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to update quotation status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  const handleDelete = async (
    quotation
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${quotation.quotationName}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(
        quotation._id
      );

      const response =
        await api.delete(
          `/api/quotations/${quotation._id}`
        );

      if (response.data?.success) {
        setQuotations((prev) =>
          prev.filter(
            (item) =>
              item._id !==
              quotation._id
          )
        );

        alert(
          "Quotation deleted successfully."
        );
      }
    } catch (error) {
      console.error(
        "Delete quotation error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete quotation."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="text-sm text-gray-500">
              Loading quotations...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Quotations
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage quotation
            templates.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              "/admin/quotations/create"
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <FilePlus2 size={18} />

          Create Quotation
        </button>
      </div>

      {/* ========================================== */}
      {/* FILTERS */}
      {/* ========================================== */}

      <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              placeholder="Search quotation name or subject..."
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">
              All Status
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>
          </select>

          <button
            type="button"
            onClick={fetchQuotations}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <RefreshCw size={17} />

            Refresh
          </button>
        </div>
      </div>

      {/* ========================================== */}
      {/* SUMMARY */}
      {/* ========================================== */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Quotations
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {quotations.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Quotations
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {
              quotations.filter(
                (quotation) =>
                  quotation.isActive
              ).length
            }
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Inactive Quotations
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-500">
            {
              quotations.filter(
                (quotation) =>
                  !quotation.isActive
              ).length
            }
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* EMPTY STATE */}
      {/* ========================================== */}

      {filteredQuotations.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
          <FilePlus2
            size={42}
            className="mx-auto mb-4 text-gray-300"
          />

          <h2 className="text-lg font-semibold text-gray-800">
            No quotations found
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {quotations.length === 0
              ? "Create your first quotation."
              : "Try changing your search or filter."}
          </p>

          {quotations.length === 0 && (
            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/quotations/create"
                )
              }
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <FilePlus2 size={17} />

              Create Quotation
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* ====================================== */}
          {/* DESKTOP TABLE */}
          {/* ====================================== */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Quotation
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Equipment
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Final Total
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredQuotations.map(
                  (quotation) => (
                    <tr
                      key={quotation._id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {
                            quotation.quotationName
                          }
                        </p>

                        <p className="mt-1 max-w-[300px] truncate text-sm text-gray-500">
                          {
                            quotation.subject
                          }
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {formatDate(
                          quotation.quotationDate
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="text-sm text-gray-700">
                          <span className="font-medium">
                            {
                              quotation.totalEquipmentQty
                            }
                          </span>{" "}
                          Qty
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                          {
                            quotation.totalHp
                          }{" "}
                          HP
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-gray-900">
                        {formatCurrency(
                          quotation.finalTotal ??
                            quotation.grandTotal
                        )}
                      </td>

                      <td className="px-5 py-4">
                        {quotation.isActive ? (
                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                            Inactive
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            title="View"
                            onClick={() =>
                              navigate(
                                `/admin/quotations/${quotation._id}`
                              )
                            }
                            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Eye size={17} />
                          </button>

                          <button
                            type="button"
                            title="Edit"
                            onClick={() =>
                              navigate(
                                `/admin/quotations/${quotation._id}/edit`
                              )
                            }
                            className="rounded-lg p-2 text-blue-500 transition hover:bg-blue-50 hover:text-blue-700"
                          >
                            <Edit size={17} />
                          </button>

                          <button
                            type="button"
                            title={
                              quotation.isActive
                                ? "Deactivate"
                                : "Activate"
                            }
                            disabled={
                              updatingId ===
                              quotation._id
                            }
                            onClick={() =>
                              handleToggleStatus(
                                quotation
                              )
                            }
                            className="rounded-lg p-2 text-amber-500 transition hover:bg-amber-50 hover:text-amber-700 disabled:opacity-50"
                          >
                            <Power size={17} />
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            disabled={
                              deletingId ===
                              quotation._id
                            }
                            onClick={() =>
                              handleDelete(
                                quotation
                              )
                            }
                            className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {/* ====================================== */}
          {/* MOBILE */}
          {/* ====================================== */}

          <div className="divide-y divide-gray-100 md:hidden">
            {filteredQuotations.map(
              (quotation) => (
                <div
                  key={quotation._id}
                  className="p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900">
                        {
                          quotation.quotationName
                        }
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {quotation.subject}
                      </p>
                    </div>

                    {quotation.isActive ? (
                      <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
                        Active
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
                        Inactive
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        Date
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {formatDate(
                          quotation.quotationDate
                        )}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        Equipment
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-800">
                        {
                          quotation.totalEquipmentQty
                        }{" "}
                        Qty
                      </p>
                    </div>

                    <div className="col-span-2 rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        Final Total
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {formatCurrency(
                          quotation.finalTotal ??
                            quotation.grandTotal
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      type="button"
                      title="View"
                      onClick={() =>
                        navigate(
                          `/admin/quotations/${quotation._id}`
                        )
                      }
                      className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      type="button"
                      title="Edit"
                      onClick={() =>
                        navigate(
                          `/admin/quotations/${quotation._id}/edit`
                        )
                      }
                      className="rounded-lg border border-blue-100 p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit size={17} />
                    </button>

                    <button
                      type="button"
                      title={
                        quotation.isActive
                          ? "Deactivate"
                          : "Activate"
                      }
                      disabled={
                        updatingId ===
                        quotation._id
                      }
                      onClick={() =>
                        handleToggleStatus(
                          quotation
                        )
                      }
                      className="rounded-lg border border-amber-100 p-2 text-amber-600 hover:bg-amber-50 disabled:opacity-50"
                    >
                      <Power size={17} />
                    </button>

                    <button
                      type="button"
                      title="Delete"
                      disabled={
                        deletingId ===
                        quotation._id
                      }
                      onClick={() =>
                        handleDelete(
                          quotation
                        )
                      }
                      className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotations;