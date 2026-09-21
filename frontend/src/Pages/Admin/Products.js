import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Package } from "lucide-react";

import { fetchCategories } from "../../redux/slices/categorySlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    categories,
    loading,
    error,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    navigate(`/admin/products/category/${categoryId}`);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Products
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Select a category to manage its products.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-gray-500">
          Loading categories...
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Categories */}
      {!loading && !error && (
        <>
          {categories.length === 0 ? (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
              <Package
                size={40}
                className="mx-auto mb-3 text-gray-400"
              />

              <h2 className="text-lg font-medium text-gray-700">
                No categories found
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Create a category first before adding products.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() =>
                    handleCategoryClick(category._id)
                  }
                  className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-gray-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                      <Package
                        size={24}
                        className="text-gray-600"
                      />
                    </div>

                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {category.name}
                      </h2>

                      <p className="mt-1 text-xs text-gray-500">
                        Manage products
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

export default Products;