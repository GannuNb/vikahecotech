
import React, { useEffect, useState } from "react";
import { RefreshCw, Search, X, Users } from "lucide-react";
import api from "../../services/api";
import { parsePhoneNumber } from "libphonenumber-js";

const QuotationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/api/admin/quotation-requests");
      setRequests(response.data?.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to load quotation requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((request) => {
    const customer = request.customer || {};
    const searchText = [
      request.quotationNumber,
      customer.name,
      customer.email,
      customer.phone,
      customer.company,
      customer.address,
      request.application?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchText.includes(search.trim().toLowerCase());
  });

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusClass = (status) => {
    if (status === "completed") {
      return "bg-green-100 text-green-700";
    }
    if (status === "processing") {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-amber-100 text-amber-700";
  };

  const formatPhoneNumber = (phone) => {
  if (!phone) return "-";

  try {
    const parsedPhone = parsePhoneNumber(phone);

    if (parsedPhone) {
      return parsedPhone.formatInternational();
    }

    return phone;
  } catch {
    return phone;
  }
};

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Quotation Requests
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                View customer details and submitted quotation requests.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchRequests}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
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

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Customer Requests
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {requests.length} total request
                {requests.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="relative w-full sm:max-w-sm">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, phone, company..."
                className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">
              Loading quotation requests...
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500">
              {search
                ? "No matching quotation requests found."
                : "No quotation requests have been submitted yet."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Quotation No.</th>
                    <th className="px-5 py-4 font-semibold">Customer</th>
                    <th className="px-5 py-4 font-semibold">Contact</th>
                    <th className="px-5 py-4 font-semibold">Company & Address</th>
                    <th className="px-5 py-4 font-semibold">Application</th>
                    <th className="px-5 py-4 font-semibold">Request Date</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request._id}
                      className="align-top transition hover:bg-slate-50"
                    >
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-slate-900">
                        {request.quotationNumber || "-"}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {request.customer?.name || "-"}
                      </td>
                      <td className="px-5 py-4">
                        <a
                          href={`mailto:${request.customer?.email || ""}`}
                          className="block text-blue-700 hover:underline"
                        >
                          {request.customer?.email || "-"}
                        </a>
                        <a
                          href={
                            request.customer?.phone
                              ? `tel:${request.customer.phone}`
                              : undefined
                          }
                          className="mt-1 block text-slate-600 hover:underline"
                        >
                          {formatPhoneNumber(request.customer?.phone)}
                        </a>
                      </td>
                      <td className="max-w-xs whitespace-normal px-5 py-4">
                        <div className="font-medium text-slate-800">
                          {request.customer?.company || "-"}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          {request.customer?.address || "-"}
                        </div>
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {request.application?.name || "-"}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass(request.requestStatus)}`}
                        >
                          {request.requestStatus || "pending"}
                        </span>
                        <div className="mt-2 text-xs text-slate-500">
                          Email: {request.emailStatus || "pending"}
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

export default QuotationRequests;
