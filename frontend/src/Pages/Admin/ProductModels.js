import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    Package,
} from "lucide-react";

import {
    fetchProductsByApplication,
    deleteProduct,
} from "../../redux/slices/productSlice";

import { fetchApplicationById } from "../../redux/slices/applicationSlice";

const ProductModels = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { applicationId } = useParams();

    const {
        products,
        loading: productLoading,
        deleting,
        error: productError,
    } = useSelector((state) => state.product);

    const {
        currentApplication,
        loading: applicationLoading,
        error: applicationError,
    } = useSelector((state) => state.application);

    useEffect(() => {
        if (!applicationId) return;

        dispatch(fetchApplicationById(applicationId));
        dispatch(fetchProductsByApplication(applicationId));
    }, [dispatch, applicationId]);

    const handleBack = () => {
        if (currentApplication?.category?._id) {
            navigate(
                `/admin/products/category/${currentApplication.category._id}`
            );
        } else {
            navigate("/admin/products");
        }
    };

    const handleAddModel = () => {
        navigate(
            `/admin/products/application/${applicationId}/new`
        );
    };

    const handleView = (productId) => {
        navigate(
            `/admin/products/application/${applicationId}/view/${productId}`
        );
    };

    const handleEdit = (productId) => {
        navigate(
            `/admin/products/application/${applicationId}/edit/${productId}`
        );
    };

    const handleDelete = async (productId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product model?"
        );

        if (!confirmed) return;

        dispatch(deleteProduct(productId));
    };

    const loading =
        productLoading || applicationLoading;

    const error =
        productError || applicationError;

    return (
        <div className="p-4 md:p-6">
            {/* Back Button */}
            <button
                type="button"
                onClick={handleBack}
                className="mb-5 flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
            >
                <ChevronLeft size={18} />

                Back to Applications
            </button>

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {currentApplication?.name || "Models"}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage product models for this application.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAddModel}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    <Plus size={18} />

                    Add New Model
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <div className="py-10 text-center text-gray-500">
                    Loading models...
                </div>
            )}

            {/* Error */}
            {error && !loading && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Models */}
            {!loading && !error && (
                <>
                    {products.length === 0 ? (
                        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
                            <Package
                                size={42}
                                className="mx-auto mb-3 text-gray-400"
                            />

                            <h2 className="text-lg font-medium text-gray-700">
                                No models found
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Add the first model for this application.
                            </p>

                            <button
                                type="button"
                                onClick={handleAddModel}
                                className="mx-auto mt-5 flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                            >
                                <Plus size={18} />

                                Add New Model
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                            {/* Desktop Header */}
                            <div className="hidden grid-cols-12 border-b border-gray-200 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 md:grid">
                                <div className="col-span-5">
                                    Model
                                </div>

                                <div className="col-span-4">
                                    Slug
                                </div>

                                <div className="col-span-3 text-right">
                                    Actions
                                </div>
                            </div>

                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="border-b border-gray-100 px-5 py-4 last:border-b-0"
                                >
                                    {/* Desktop */}
                                    <div className="hidden items-center md:grid md:grid-cols-12">
                                        <div className="col-span-5">
                                            <div className="font-medium text-gray-800">
                                                {product.modelName}
                                            </div>
                                        </div>

                                        <div className="col-span-4">
                                            <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                                                /{product.slug}
                                            </span>
                                        </div>

                                        <div className="col-span-3 flex justify-end gap-2">
                                            {/* View */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleView(product._id)
                                                }
                                                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                                                title="View Product"
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* Edit */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(product._id)
                                                }
                                                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                                                title="Edit"
                                            >
                                                <Pencil size={17} />
                                            </button>

                                            {/* Delete */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(product._id)
                                                }
                                                disabled={deleting}
                                                className="rounded-lg border border-red-200 p-2 text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <Trash2 size={17} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Mobile */}
                                    <div className="flex flex-col gap-3 md:hidden">
                                        <div>
                                            <div className="font-medium text-gray-800">
                                                {product.modelName}
                                            </div>

                                            <div className="mt-1 text-xs text-gray-500">
                                                /{product.slug}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {/* View */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleView(product._id)
                                                }
                                                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                                            >
                                                <Eye size={16} />

                                                View
                                            </button>

                                            {/* Edit */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleEdit(product._id)
                                                }
                                                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-gray-50"
                                            >
                                                <Pencil size={16} />

                                                Edit
                                            </button>

                                            {/* Delete */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(product._id)
                                                }
                                                disabled={deleting}
                                                className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <Trash2 size={16} />

                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductModels;