import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, X } from "lucide-react";

import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  clearCategoryError,
} from "../../redux/slices/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();

  const {
    categories,
    loading,
    creating,
    updating,
    deleting,
    error,
  } = useSelector((state) => state.category);

  const [categoryName, setCategoryName] = useState("");

  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());

    return () => {
      dispatch(clearCategoryError());
    };
  }, [dispatch]);

  // =========================
  // CREATE
  // =========================
  const handleCreate = async (e) => {
    e.preventDefault();

    const name = categoryName.trim();

    if (!name) {
      return;
    }

    const result = await dispatch(createCategory(name));

    if (createCategory.fulfilled.match(result)) {
      setCategoryName("");
    }
  };

  // =========================
  // START EDIT
  // =========================
  const handleEditStart = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    dispatch(clearCategoryError());
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const handleEditCancel = () => {
    setEditingCategory(null);
    setEditName("");
    dispatch(clearCategoryError());
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = editName.trim();

    if (!name || !editingCategory) {
      return;
    }

    const result = await dispatch(
      updateCategory({
        categoryId: editingCategory._id,
        name,
      })
    );

    if (updateCategory.fulfilled.match(result)) {
      setEditingCategory(null);
      setEditName("");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${category.name}"?`
    );

    if (!confirmed) {
      return;
    }

    await dispatch(deleteCategory(category._id));
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Categories
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage product categories for Vikah Ecotech
        </p>
      </div>

      {/* Add Category */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Add Category
        </h2>

        <p className="mt-1 text-sm text-gray-500 mb-5">
          Create a new product category.
        </p>

        <form
          onSubmit={handleCreate}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
          />

          <button
            type="submit"
            disabled={creating || !categoryName.trim()}
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Existing Categories
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {categories.length}{" "}
            {categories.length === 1
              ? "category"
              : "categories"}
          </p>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-gray-500">
            Loading categories...
          </div>
        ) : categories.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">
            No categories found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {categories.map((category) => (
              <div
                key={category._id}
                className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* Category Info */}
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {category.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Created{" "}
                    {category.createdAt
                      ? new Date(
                          category.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEditStart(category)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(category)}
                    disabled={deleting}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit Category
              </h2>

              <button
                type="button"
                onClick={handleEditCancel}
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUpdate}>
              <div className="p-6">
                <label
                  htmlFor="editCategoryName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category Name
                </label>

                <input
                  id="editCategoryName"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={updating || !editName.trim()}
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;