import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react";

import { fetchCategoryById } from "../../redux/slices/categorySlice";
import { fetchApplicationsByCategory } from "../../redux/slices/applicationSlice";

const ProductApplications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryId } = useParams();

  const {
    currentCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state) => state.category);

  const {
    applications,
    loading: applicationLoading,
    error: applicationError,
  } = useSelector((state) => state.application);

  useEffect(() => {
    if (!categoryId) return;

    dispatch(fetchCategoryById(categoryId));
    dispatch(fetchApplicationsByCategory(categoryId));
  }, [dispatch, categoryId]);

  const handleApplicationClick = (applicationId) => {
    navigate(
      `/admin/products/application/${applicationId}`
    );
  };

  const handleBack = () => {
    navigate("/admin/products");
  };

  const loading =
    categoryLoading || applicationLoading;

  const error =
    categoryError || applicationError;

  return (
    <div className="p-4 md:p-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={handleBack}
        className="mb-5 flex items-center gap-2 text-sm text-gray-600 transition hover:text-gray-900"
      >
        <ChevronLeft size={18} />

        Back to Categories
      </button>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {currentCategory?.name || "Applications"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Select an application to manage its models.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-gray-500">
          Loading applications...
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Applications */}
      {!loading && !error && (
        <>
          {applications.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
              <Layers
                size={40}
                className="mx-auto mb-3 text-gray-400"
              />

              <h2 className="text-lg font-medium text-gray-700">
                No applications found
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add an application first before adding
                product models.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((application) => (
                <button
                  key={application._id}
                  type="button"
                  onClick={() =>
                    handleApplicationClick(
                      application._id
                    )
                  }
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                      <Layers
                        size={24}
                        className="text-gray-600"
                      />
                    </div>

                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {application.name}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        Manage models
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={20}
                    className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-700"
                  />
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductApplications;