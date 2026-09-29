import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSpecificationRequests,
  updateSpecificationRequestStatus,
} from "../../redux/slices/specificationRequestSlice";

const SpecificationRequests = () => {
  const dispatch = useDispatch();

  const {
    requests,
    pagination,
    counts,
    loading,
    updating,
    error,
  } = useSelector(
    (state) => state.specificationRequest
  );

  const [activeStatus, setActiveStatus] =
    useState("all");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [selectedRequest, setSelectedRequest] =
    useState(null);

  // =========================================
  // FETCH REQUESTS
  // =========================================

  useEffect(() => {
    dispatch(
      fetchSpecificationRequests({
        page: currentPage,
        limit: 10,
        status: activeStatus,
        search,
      })
    );
  }, [
    dispatch,
    currentPage,
    activeStatus,
    search,
  ]);

  // =========================================
  // STATUS CHANGE
  // =========================================

  const handleStatusChange = async (
    requestId,
    status
  ) => {
    await dispatch(
      updateSpecificationRequestStatus({
        requestId,
        status,
      })
    );

    dispatch(
      fetchSpecificationRequests({
        page: currentPage,
        limit: 10,
        status: activeStatus,
        search,
      })
    );
  };

  // =========================================
  // SEARCH
  // =========================================

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // =========================================
  // STATUS CARD
  // =========================================

  const statusCards = [
    {
      key: "all",
      label: "All Requests",
      count: counts?.all || 0,
    },
    {
      key: "requested",
      label: "Requested",
      count: counts?.requested || 0,
    },
    {
      key: "processing",
      label: "Processing",
      count: counts?.processing || 0,
    },
    {
      key: "completed",
      label: "Completed",
      count: counts?.completed || 0,
    },
    {
      key: "failed",
      label: "Failed",
      count: counts?.failed || 0,
    },
  ];

  // =========================================
  // STATUS BADGE
  // =========================================

  const getStatusClass = (status) => {
    switch (status) {
      case "requested":
        return "bg-blue-50 text-blue-700";

      case "processing":
        return "bg-yellow-50 text-yellow-700";

      case "completed":
        return "bg-green-50 text-green-700";

      case "failed":
        return "bg-red-50 text-red-700";

      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  // =========================================
  // FORMAT DATE
  // =========================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Specification Requests
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage customer requests for complete
          product specifications.
        </p>
      </div>

      {/* =====================================
          STATUS CARDS
      ===================================== */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statusCards.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => {
              setActiveStatus(card.key);
              setCurrentPage(1);
            }}
            className={`rounded-xl border bg-white p-5 text-left shadow-sm transition ${
              activeStatus === card.key
                ? "border-gray-900 ring-1 ring-gray-900"
                : "border-gray-200 hover:border-gray-400"
            }`}
          >
            <p className="text-sm font-medium text-gray-500">
              {card.label}
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-900">
              {card.count}
            </p>
          </button>
        ))}
      </div>

      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-md">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search model, email or phone..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-gray-700 focus:ring-1 focus:ring-gray-700"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Clear Search
          </button>
        </div>
      </div>

      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =====================================
          TABLE
      ===================================== */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Model
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  PDF
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    Loading specification requests...
                  </td>
                </tr>
              ) : requests.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center text-sm text-gray-500"
                  >
                    No specification requests found.
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr
                    key={request._id}
                    className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                  >
                    {/* MODEL */}

                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {request.modelName}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {request.product?.application
                            ?.name || "-"}
                        </p>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        {request.email}
                      </p>
                    </td>

                    {/* PHONE */}

                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        {request.phone}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>
                    </td>

                    {/* PDF */}

                    <td className="px-5 py-4 text-center">
                      {request.pdfGenerated ? (
                        <span className="text-sm font-semibold text-green-600">
                          Yes
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          No
                        </span>
                      )}
                    </td>

                    {/* EMAIL SENT */}

                    <td className="px-5 py-4 text-center">
                      {request.emailSent ? (
                        <span className="text-sm font-semibold text-green-600">
                          Yes
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">
                          No
                        </span>
                      )}
                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4">
                      <span className="text-sm text-gray-600">
                        {formatDate(
                          request.createdAt
                        )}
                      </span>
                    </td>

                    {/* ACTION */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <select
                          value={request.status}
                          disabled={updating}
                          onChange={(e) =>
                            handleStatusChange(
                              request._id,
                              e.target.value
                            )
                          }
                          className="rounded-lg border border-gray-300 bg-white px-2 py-2 text-xs outline-none focus:border-gray-700"
                        >
                          <option value="requested">
                            Requested
                          </option>

                          <option value="processing">
                            Processing
                          </option>

                          <option value="completed">
                            Completed
                          </option>

                          <option value="failed">
                            Failed
                          </option>
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedRequest(
                              request
                            )
                          }
                          className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ===================================
            PAGINATION
        =================================== */}

        {!loading &&
          requests.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                Page{" "}
                {pagination?.currentPage || 1}{" "}
                of{" "}
                {pagination?.totalPages || 1}
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={
                    currentPage <= 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page - 1
                    )
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={
                    currentPage >=
                    (pagination?.totalPages || 1)
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page + 1
                    )
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
      </div>

      {/* =====================================
          DETAILS MODAL
      ===================================== */}

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Request Details
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Specification request information
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedRequest(null)
                }
                className="text-2xl leading-none text-gray-400 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="space-y-4 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Model
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {selectedRequest.modelName}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Category
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedRequest.product
                    ?.application?.category
                    ?.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Application
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedRequest.product
                    ?.application?.name || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Email
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedRequest.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Phone
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {selectedRequest.phone}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </p>

                <span
                  className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                    selectedRequest.status
                  )}`}
                >
                  {selectedRequest.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    PDF Generated
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedRequest.pdfGenerated
                      ? "Yes"
                      : "No"}
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs text-gray-500">
                    Email Sent
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedRequest.emailSent
                      ? "Yes"
                      : "No"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Requested On
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {formatDate(
                    selectedRequest.createdAt
                  )}
                </p>
              </div>
            </div>

            {/* MODAL FOOTER */}

            <div className="border-t border-gray-200 px-6 py-4 text-right">
              <button
                type="button"
                onClick={() =>
                  setSelectedRequest(null)
                }
                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
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

export default SpecificationRequests;