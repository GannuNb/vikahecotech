
import React, { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import {
  Search,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Globe,
  MapPin,
  CalendarDays,
  Settings,
} from "lucide-react";

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [pagination, setPagination] = useState({
    totalEnquiries: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10,
  });
  const [updatingId, setUpdatingId] = useState(null);

  const fetchEnquiries = async (currentPage = page) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/enquiries", {
        params: {
          page: currentPage,
          limit: 10,
        },
      });

      setEnquiries(response.data.enquiries || []);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error("Fetch enquiries error:", err);
      setError(
        err.response?.data?.message ||
        "Failed to load enquiries. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(page);
  }, [page]);

  const handleStatusChange = async (enquiryId, status) => {
    try {
      setUpdatingId(enquiryId);

      const response = await api.patch(
        `/api/enquiries/${enquiryId}/status`,
        { status }
      );

      const updatedEnquiry = response.data.enquiry;

      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === enquiryId ? updatedEnquiry : item
        )
      );

      setSelectedEnquiry((prev) =>
        prev?._id === enquiryId ? updatedEnquiry : prev
      );
    } catch (err) {
      console.error("Update enquiry status error:", err);
      alert(
        err.response?.data?.message ||
        "Failed to update enquiry status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredEnquiries = useMemo(() => {
    const searchValue = search.toLowerCase();

    return enquiries.filter((item) =>
      [
        item.name,
        item.company,
        item.email,
        item.phone,
        item.machinery,
        item.application,
        item.city,
        item.country,
        item.address,
        item.message,
      ].some((value) =>
        String(value || "").toLowerCase().includes(searchValue)
      )
    );
  }, [enquiries, search]);

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

  const getStatusStyle = (status) => {
    switch (status) {
      case "contacted":
        return "bg-blue-100 text-blue-700";
      case "closed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const handleRefresh = () => {
    setSearch("");
    fetchEnquiries(page);
  };

  const DetailItem = ({ icon: Icon, label, value }) => (
    <div className="flex gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-slate-500 shadow-sm">
        <Icon size={17} />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-medium text-slate-700">
          {value || "-"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Enquiries
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View and manage customer enquiries submitted through the website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRefresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:opacity-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* TOTAL ENQUIRIES */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">
          Total Enquiries
        </p>
        <p className="mt-2 text-2xl font-bold text-slate-800">
          {pagination.totalEnquiries}
        </p>
      </div>

      {/* SEARCH */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search enquiries on this page..."
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-slate-500"
          />
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* ENQUIRIES TABLE */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">
            Loading enquiries...
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium text-slate-700">
              No enquiries found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1450px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Contact</th>
                  <th className="px-5 py-4">Machinery</th>
                  <th className="px-5 py-4">Application</th>
                  <th className="px-5 py-4">Location</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.map((item) => (
                  <tr key={item._id} className="align-top hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {item.name}
                      </p>
                      {item.company && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <Building2 size={12} />
                          {item.company}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <p className="flex items-center gap-2 text-slate-700">
                        <Mail size={14} className="shrink-0 text-slate-400" />
                        {item.email}
                      </p>
                      <p className="mt-2 flex items-center gap-2 text-slate-500">
                        <Phone size={14} className="shrink-0 text-slate-400" />
                        {item.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-700">
                      {item.machinery || "-"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.application || "-"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      <p>{item.city || "-"}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.country || ""}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {formatDate(item.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={item.status || "new"}
                        disabled={updatingId === item._id}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                        className={`rounded-lg border-0 px-3 py-2 text-xs font-semibold capitalize outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 ${getStatusStyle(item.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>

                      {updatingId === item._id && (
                        <p className="mt-1 text-xs text-slate-400">
                          Updating...
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedEnquiry(item)}
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                      >
                        <Eye size={15} />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500">
          Showing {filteredEnquiries.length} of {pagination.totalEnquiries} enquiries
          {" "}· Page {pagination.currentPage || page} of {pagination.totalPages}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1 || loading}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="px-2 text-sm font-medium text-slate-600">
            {page}
          </span>

          <button
            type="button"
            onClick={() =>
              setPage((prev) =>
                Math.min(pagination.totalPages, prev + 1)
              )
            }
            disabled={page >= pagination.totalPages || loading}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ENQUIRY DETAILS MODAL */}
      {selectedEnquiry && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  Enquiry Details
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Complete customer enquiry information
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7">
              {/* CUSTOMER INFORMATION */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <Building2 size={18} className="text-slate-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                    Customer Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <DetailItem
                    icon={Building2}
                    label="Customer Name"
                    value={selectedEnquiry.name}
                  />
                  <DetailItem
                    icon={Building2}
                    label="Company"
                    value={selectedEnquiry.company}
                  />
                  <DetailItem
                    icon={Mail}
                    label="Email Address"
                    value={selectedEnquiry.email}
                  />
                  <DetailItem
                    icon={Phone}
                    label="Phone Number"
                    value={selectedEnquiry.phone}
                  />
                  <DetailItem
                    icon={Globe}
                    label="Website"
                    value={selectedEnquiry.website}
                  />
                  <DetailItem
                    icon={CalendarDays}
                    label="Submitted On"
                    value={formatDate(selectedEnquiry.createdAt)}
                  />
                </div>
              </section>

              {/* ADDRESS INFORMATION */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-slate-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                    Address Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <DetailItem
                    icon={MapPin}
                    label="Address"
                    value={selectedEnquiry.address}
                  />
                  <DetailItem
                    icon={MapPin}
                    label="City"
                    value={selectedEnquiry.city}
                  />
                  <DetailItem
                    icon={Globe}
                    label="Country"
                    value={selectedEnquiry.country}
                  />
                </div>
              </section>

              {/* MACHINERY INFORMATION */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <Settings size={18} className="text-slate-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                    Machinery Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <DetailItem
                    icon={Settings}
                    label="Machinery"
                    value={selectedEnquiry.machinery}
                  />
                  <DetailItem
                    icon={Building2}
                    label="Application"
                    value={selectedEnquiry.application}
                  />
                </div>
              </section>

              {/* CUSTOMER MESSAGE */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <MessageSquare size={18} className="text-slate-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                    Message / Description
                  </h3>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
                    {selectedEnquiry.message || "No message provided."}
                  </p>
                </div>
              </section>

              {/* STATUS */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <Settings size={18} className="text-slate-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-700">
                    Enquiry Status
                  </h3>
                </div>

                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Current Status
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Update the status of this enquiry.
                    </p>
                  </div>

                  <select
                    value={selectedEnquiry.status || "new"}
                    disabled={updatingId === selectedEnquiry._id}
                    onChange={(e) =>
                      handleStatusChange(selectedEnquiry._id, e.target.value)
                    }
                    className={`rounded-lg border-0 px-4 py-2.5 text-sm font-semibold capitalize outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 ${getStatusStyle(selectedEnquiry.status)}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                {updatingId === selectedEnquiry._id && (
                  <p className="mt-2 text-xs text-slate-400">
                    Updating status...
                  </p>
                )}
              </section>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end border-t border-slate-200 px-5 py-4 sm:px-7">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
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

export default Enquiries;
