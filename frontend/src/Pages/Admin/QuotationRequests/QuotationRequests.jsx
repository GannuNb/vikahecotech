
import React, { useCallback, useEffect, useState } from "react";
import api from "../../../services/api";

const PAGE_LIMIT = 10;

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StatusBadge = ({ status }) => {
  const styles = {
    sent: "bg-green-50 text-green-700 ring-green-600/20",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    failed: "bg-red-50 text-red-700 ring-red-600/20",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${
        styles[status] || "bg-gray-100 text-gray-600 ring-gray-500/20"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status || "Unknown"}
    </span>
  );
};

const QuotationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalRequests: 0,
    limit: PAGE_LIMIT,
  });

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/quotation-requests", {
        params: {
          page: pagination.currentPage,
          limit: PAGE_LIMIT,
          ...(search ? { search } : {}),
        },
      });

      setRequests(response.data.requests || []);
      setPagination((previous) => ({
        ...previous,
        ...(response.data.pagination || {}),
      }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load quotation requests. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, search]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPagination((previous) => ({
      ...previous,
      currentPage: 1,
    }));
    setSearch(searchInput.trim());
  };

  const changePage = (page) => {
    if (
      page < 1 ||
      page > pagination.totalPages ||
      page === pagination.currentPage
    ) {
      return;
    }

    setPagination((previous) => ({
      ...previous,
      currentPage: page,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-[#0f4c5c]">
              <span>Admin</span>
              <span className="text-gray-400">/</span>
              <span>Quotations</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Quotation Requests
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage customer requests and track quotation email delivery.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchRequests}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-60"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              aria-hidden="true"
            >
              <path d="M20 7v5h-5M4 17v-5h5" />
              <path d="M5.5 9A7 7 0 0 1 18 6l2 1M4 17l2 1a7 7 0 0 0 12.5-3" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Summary card */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Requests
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {pagination.totalRequests}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0f4c5c]/10 text-[#0f4c5c]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path d="M7 3h7l5 5v13H7z" />
                  <path d="M14 3v5h5M10 13h6M10 17h6" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Customer quotation submissions
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Requests on This Page
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {requests.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
                </svg>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-400">
              Showing the current page of results
            </p>
          </div>
        </div>

        {/* Table card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-gray-900">
                Customer Submissions
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Search by quotation number, customer, company, email, or mobile.
              </p>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex w-full gap-2 sm:max-w-md"
            >
              <div className="relative min-w-0 flex-1">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>

                <input
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search requests..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-[#0f4c5c] focus:bg-white focus:ring-4 focus:ring-[#0f4c5c]/10"
                />
              </div>

              <button
                type="submit"
                className="rounded-xl bg-[#0f4c5c] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#176578]"
              >
                Search
              </button>
            </form>
          </div>

          {error && (
            <div
              role="alert"
              className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <p>{error}</p>
              <button
                type="button"
                onClick={fetchRequests}
                className="mt-2 font-semibold underline"
              >
                Try again
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Quotation</th>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Contact</th>
                  <th className="px-5 py-4 font-semibold">Selected Plant</th>
                  <th className="px-5 py-4 font-semibold">Email Status</th>
                  <th className="px-5 py-4 font-semibold">Requested On</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-5 py-16 text-center">
                      <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#0f4c5c]" />
                      <p className="mt-3 text-sm text-gray-500">
                        Loading quotation requests...
                      </p>
                    </td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-5 py-16 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-7 w-7"
                          aria-hidden="true"
                        >
                          <path d="M7 3h7l5 5v13H7z" />
                          <path d="M14 3v5h5M10 13h6M10 17h4" />
                        </svg>
                      </div>
                      <p className="mt-4 font-semibold text-gray-800">
                        No quotation requests found
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        New customer submissions will appear here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  requests.map((request) => (
                    <tr
                      key={request._id}
                      className="transition hover:bg-gray-50/80"
                    >
                      <td className="px-5 py-4">
                        <p className="font-bold text-[#0f4c5c]">
                          {request.quotationNumber}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          ID: {request._id.slice(-8)}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-gray-900">
                          {request.customerName}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {request.companyName || "Individual customer"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-gray-700">{request.email}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {request.mobile}
                        </p>
                      </td>

                      <td className="max-w-56 px-5 py-4">
                        <p className="truncate font-medium text-gray-800">
                          {request.quotationId?.quotationName || "Unavailable"}
                        </p>
                        <p className="mt-1 truncate text-xs text-gray-500">
                          {request.quotationId?.subject || "-"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={request.emailStatus} />
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                        {formatDate(request.createdAt)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedRequest(request)}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-[#0f4c5c] hover:bg-[#0f4c5c]/5 hover:text-[#0f4c5c]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              {pagination.totalRequests === 0
                ? "No results"
                : `Page ${pagination.currentPage} of ${Math.max(
                    1,
                    pagination.totalPages
                  )} · ${pagination.totalRequests} total requests`}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changePage(pagination.currentPage - 1)}
                disabled={loading || pagination.currentPage <= 1}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={() => changePage(pagination.currentPage + 1)}
                disabled={
                  loading ||
                  pagination.currentPage >= pagination.totalPages
                }
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Request details modal */}
      {selectedRequest && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedRequest(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-details-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-gray-100 p-5 sm:p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0f4c5c]">
                  Quotation Request
                </p>
                <h2
                  id="request-details-title"
                  className="mt-2 text-xl font-bold text-gray-900"
                >
                  {selectedRequest.quotationNumber}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="m18 6-12 12M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <Detail label="Customer Name" value={selectedRequest.customerName} />
              <Detail
                label="Company"
                value={selectedRequest.companyName || "Not provided"}
              />
              <Detail label="Email Address" value={selectedRequest.email} />
              <Detail label="Mobile Number" value={selectedRequest.mobile} />
              <Detail
                label="Quotation Name"
                value={
                  selectedRequest.quotationId?.quotationName || "Unavailable"
                }
              />
              <Detail
                label="Quotation Subject"
                value={selectedRequest.quotationId?.subject || "-"}
              />
              <Detail
                label="Email Status"
                value={<StatusBadge status={selectedRequest.emailStatus} />}
              />
              <Detail
                label="Email Sent At"
                value={formatDate(selectedRequest.emailSentAt)}
              />

              <div className="sm:col-span-2">
                <Detail
                  label="Customer Address"
                  value={selectedRequest.address || "Not provided"}
                />
              </div>

              <div className="sm:col-span-2">
                <Detail
                  label="Request Submitted"
                  value={formatDate(selectedRequest.createdAt)}
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-100 p-5 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="rounded-xl bg-[#0f4c5c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#176578]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="min-w-0">
    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
      {label}
    </p>
    <div className="break-words text-sm leading-6 text-gray-800">{value}</div>
  </div>
);

export default QuotationRequests;
