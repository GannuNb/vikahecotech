
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Image as ImageIcon,
  FileText,
  IndianRupee,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";
import api from "../../../services/api";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const QuotationModelView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const [capacity, setCapacity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchCapacity = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/api/admin/quotation-models/${id}`
        );

        if (!cancelled) {
          setCapacity(response.data.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Failed to load capacity details."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCapacity();

    return () => {
      cancelled = true;
    };
  }, [id]);


const goBack = () => {
  const savedCategoryId =
    categoryId || capacity?.category?._id || capacity?.category;

  if (savedCategoryId) {
    navigate(
      `/admin/quotation-categories/${savedCategoryId}/capacities`
    );
  } else {
    navigate("/admin/quotation-categories");
  }
};


  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-slate-500">
        <LoaderCircle className="animate-spin" size={22} />
        Loading capacity details...
      </div>
    );
  }

  if (error || !capacity) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={goBack}
            className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft size={17} />
            Back to Capacities
          </button>

          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-5 text-red-700"
          >
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">
                Unable to load capacity
              </p>
              <p className="mt-1 text-sm">
                {error || "Capacity not found."}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const pricingTable = Array.isArray(capacity.pricingTable)
    ? capacity.pricingTable
    : [];

  const specifications = Array.isArray(
    capacity.technicalSpecifications
  )
    ? capacity.technicalSpecifications
    : [];

  const images = Array.isArray(capacity.images)
    ? capacity.images
    : [];

  const referencePhotos = Array.isArray(capacity.referencePhotos)
    ? capacity.referencePhotos
    : [];

  const totalQty = pricingTable.reduce(
    (total, row) => total + (Number(row.qty) || 0),
    0
  );

  const totalHp = pricingTable.reduce(
    (total, row) =>
      total +
      (Number(row.hp) || 0) * (Number(row.qty) || 0),
    0
  );

  const grandTotal = pricingTable.reduce(
    (total, row) =>
      total +
      (Number(row.totalPrice) ||
        (Number(row.qty) || 0) * (Number(row.unitPrice) || 0)),
    0
  );

  const quantity = Number(capacity.quantity);

  const ImageSection = ({ title, items, icon: Icon }) => (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
          <Icon size={20} />
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            {title}
          </h2>
          <p className="text-sm text-slate-500">
            {items.length} {items.length === 1 ? "image" : "images"}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
          No images uploaded.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((image, index) => (
            <article
              key={image._id || image.key || `${title}-${index}`}
              className="overflow-hidden rounded-xl border border-slate-200"
            >
              {image.url ? (
                <a
                  href={image.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block bg-slate-50"
                  title="Open full-size image in a new tab"
                >
                  <img
                    src={image.url}
                    alt={image.description || `${title} ${index + 1}`}
                    loading="lazy"
                    className="h-52 w-full object-contain p-3"
                  />
                </a>
              ) : (
                <div className="flex h-52 items-center justify-center bg-slate-50 text-sm text-slate-400">
                  Image unavailable
                </div>
              )}

              <div className="border-t border-slate-100 p-3">
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Image {index + 1}
                </p>
                <p className="mt-1 break-words text-sm text-slate-700">
                  {image.description || "No description provided."}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={goBack}
              className="mt-1 rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 hover:bg-slate-100"
              aria-label="Back to capacities"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                View Capacity
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Complete capacity information in read-only mode.
              </p>
            </div>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-semibold ${
              capacity.isActive
                ? "bg-green-100 text-green-700"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            {capacity.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Basic details */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
              <Package size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Capacity Details
              </h2>
              <p className="text-sm text-slate-500">
                Basic model information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Category</p>
              <p className="mt-1 font-semibold text-slate-900">
                {capacity.category?.name || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Capacity Name</p>
              <p className="mt-1 font-semibold text-slate-900">
                {capacity.capacityName || "—"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Default Quantity
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {Number.isInteger(quantity) && quantity >= 1
                  ? quantity
                  : 1}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Connecting Equipment
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {capacity.connectingEquipment === "with"
                  ? "With connecting equipment"
                  : "Without connecting equipment"}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Equipment Rows</p>
              <p className="mt-1 font-semibold text-slate-900">
                {pricingTable.length}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-1 font-semibold text-slate-900">
                {capacity.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-5">
            <p className="text-sm text-slate-500">Description</p>
            <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
              {capacity.description || "No description provided."}
            </p>
          </div>
        </section>

        {/* Equipment pricing */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
              <IndianRupee size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Equipment Pricing Table
              </h2>
              <p className="text-sm text-slate-500">
                Saved equipment and pricing details
              </p>
            </div>
          </div>

          {pricingTable.length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
              No equipment pricing rows available.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[1000px] border-collapse text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-3 py-3">S.No.</th>
                    <th className="px-3 py-3">Equipment Description</th>
                    <th className="px-3 py-3">Model No.</th>
                    <th className="px-3 py-3">Power</th>
                    <th className="px-3 py-3">HP</th>
                    <th className="px-3 py-3">Qty</th>
                    <th className="px-3 py-3">Unit Price</th>
                    <th className="px-3 py-3">Total Price</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {pricingTable.map((row, index) => (
                    <tr key={row._id || index}>
                      <td className="px-3 py-3 text-slate-500">
                        {index + 1}
                      </td>
                      <td className="px-3 py-3 font-medium text-slate-900">
                        {row.equipmentDescription || "—"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {row.modelNo || "—"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {row.power || "—"}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {Number(row.hp) || 0}
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {Number(row.qty) || 0}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-slate-600">
                        {formatCurrency(row.unitPrice)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 font-semibold text-slate-900">
                        {formatCurrency(
                          Number(row.qty) * Number(row.unitPrice)
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Total Equipment Quantity
              </p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {totalQty}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total HP</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {totalHp.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 p-4">
              <p className="text-sm text-blue-700">Grand Total</p>
              <p className="mt-1 text-xl font-bold text-blue-800">
                {formatCurrency(grandTotal)}
              </p>
            </div>
          </div>
        </section>

        {/* Technical specifications */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-700">
              <FileText size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Technical Specifications
              </h2>
              <p className="text-sm text-slate-500">
                Saved specification details
              </p>
            </div>
          </div>

          {specifications.length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
              No technical specifications added.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[450px] text-left text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-4 py-3">S.No.</th>
                    <th className="px-4 py-3">Specification</th>
                    <th className="px-4 py-3">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {specifications.map((spec, index) => (
                    <tr key={spec._id || index}>
                      <td className="px-4 py-3 text-slate-500">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {spec.label || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {spec.value || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Images */}
        <ImageSection
          title="Machinery Images"
          items={images}
          icon={ImageIcon}
        />

        <ImageSection
          title="Reference Photos"
          items={referencePhotos}
          icon={ImageIcon}
        />

        {/* Bottom back button */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            <ArrowLeft size={17} />
            Back to Capacities
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationModelView;
