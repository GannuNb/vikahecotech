import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    ChevronLeft,
    Pencil,
    ExternalLink,
} from "lucide-react";

import {
    fetchProductById,
    clearCurrentProduct,
} from "../../redux/slices/productSlice";

const ProductView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        applicationId,
        productId,
    } = useParams();

    const {
        currentProduct,
        loading,
        error,
    } = useSelector((state) => state.product);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(productId));
        }

        return () => {
            dispatch(clearCurrentProduct());
        };
    }, [dispatch, productId]);

    const handleBack = () => {
        navigate(
            `/admin/products/application/${applicationId}`
        );
    };

    const handleEdit = () => {
        navigate(
            `/admin/products/application/${applicationId}/edit/${productId}`
        );
    };

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading product...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 md:p-6">
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            </div>
        );
    }

    if (!currentProduct) {
        return (
            <div className="p-4 md:p-6">
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                    <h2 className="text-lg font-medium text-gray-700">
                        Product not found
                    </h2>

                    <button
                        type="button"
                        onClick={handleBack}
                        className="mt-4 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white"
                    >
                        Back to Models
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-6">
            {/* Back */}
            <button
                type="button"
                onClick={handleBack}
                className="mb-5 flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
            >
                <ChevronLeft size={18} />

                Back to Models
            </button>

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">
                        {currentProduct.modelName}
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Read-only product details
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleEdit}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    <Pencil size={17} />

                    Edit Product
                </button>
            </div>

            <div className="space-y-6">
                {/* Basic Information */}
                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-5 text-lg font-semibold text-gray-800">
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Model Name
                            </p>

                            <p className="mt-1 text-sm text-gray-800">
                                {currentProduct.modelName}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Slug
                            </p>

                            <p className="mt-1 text-sm text-gray-800">
                                /{currentProduct.slug}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Application
                            </p>

                            <p className="mt-1 text-sm text-gray-800">
                                {currentProduct.application?.name ||
                                    "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                Category
                            </p>

                            <p className="mt-1 text-sm text-gray-800">
                                {currentProduct.application?.category
                                    ?.name || "-"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Description
                        </p>

                        <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-700">
                            {currentProduct.description || "-"}
                        </p>
                    </div>

                    <div className="mt-5">
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            Public URL
                        </p>

                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-sm text-gray-700">
                                /{currentProduct.slug}
                            </span>

                            <ExternalLink size={15} className="text-gray-400" />
                        </div>
                    </div>
                </section>

                {/* SEO */}
                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-5 text-lg font-semibold text-gray-800">
                        SEO Information
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                SEO Title
                            </p>

                            <p className="mt-1 text-sm text-gray-800">
                                {currentProduct.seo?.title || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                SEO Description
                            </p>

                            <p className="mt-1 text-sm leading-6 text-gray-700">
                                {currentProduct.seo?.description || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                SEO Keywords
                            </p>

                            <p className="mt-1 text-sm text-gray-700">
                                {currentProduct.seo?.keywords || "-"}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Technical Specifications */}
                <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-5 text-lg font-semibold text-gray-800">
                        Technical Specifications
                    </h2>

                    {currentProduct.sections?.length > 0 ? (
                        <div className="space-y-6">
                            {currentProduct.sections.map(
                                (section, sectionIndex) => (
                                    <div
                                        key={sectionIndex}
                                        className="rounded-lg border border-gray-200"
                                    >
                                        <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                                            <h3 className="font-medium text-gray-800">
                                                {section.heading}
                                            </h3>
                                        </div>

                                        <div className="divide-y divide-gray-100">
                                            {section.fields?.map(
                                                (
                                                    field,
                                                    fieldIndex
                                                ) => (
                                                    <div
                                                        key={fieldIndex}
                                                        className="grid grid-cols-1 gap-2 px-4 py-3 sm:grid-cols-2"
                                                    >
                                                        <div className="text-sm font-medium text-gray-600">
                                                            {field.name}
                                                        </div>

                                                        <div className="text-sm text-gray-800 sm:text-right">
                                                            {field.value}

                                                            {field.isPublic && (
                                                                <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                                                    Public
                                                                </span>
                                                            )}

                                                            {!field.isPublic && (
                                                                <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                                                                    Private
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
                            No technical specifications added.
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProductView;