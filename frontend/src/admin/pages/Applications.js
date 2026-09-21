import React, {
  useEffect,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import {
  fetchApplications,
  fetchApplicationsByCategory,
  createApplication,
  updateApplication,
  deleteApplication,
  clearApplicationError,
} from "../../redux/slices/applicationSlice";

import {
  fetchCategories,
} from "../../redux/slices/categorySlice";

const Applications = () => {
  const dispatch = useDispatch();

  const {
    applications,
    loading,
    creating,
    updating,
    deleting,
    error,
  } = useSelector(
    (state) => state.application
  );

  const { categories } = useSelector(
    (state) => state.category
  );

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [applicationName, setApplicationName] =
    useState("");

  const [editingApplication, setEditingApplication] =
    useState(null);

  const [editName, setEditName] =
    useState("");

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchApplications());

    return () => {
      dispatch(clearApplicationError());
    };
  }, [dispatch]);

  // =========================
  // CATEGORY FILTER
  // =========================
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;

    setSelectedCategory(categoryId);

    if (!categoryId) {
      dispatch(fetchApplications());
    } else {
      dispatch(
        fetchApplicationsByCategory(
          categoryId
        )
      );
    }
  };

  // =========================
  // CREATE
  // =========================
  const handleCreate = async (e) => {
    e.preventDefault();

    const name = applicationName.trim();

    if (!selectedCategory || !name) {
      return;
    }

    const result = await dispatch(
      createApplication({
        category: selectedCategory,
        name,
      })
    );

    if (
      createApplication.fulfilled.match(
        result
      )
    ) {
      setApplicationName("");
    }
  };

  // =========================
  // START EDIT
  // =========================
  const handleEditStart = (
    application
  ) => {
    setEditingApplication(application);
    setEditName(application.name);

    dispatch(clearApplicationError());
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const handleEditCancel = () => {
    setEditingApplication(null);
    setEditName("");

    dispatch(clearApplicationError());
  };

  // =========================
  // UPDATE
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    const name = editName.trim();

    if (
      !name ||
      !editingApplication
    ) {
      return;
    }

    const result = await dispatch(
      updateApplication({
        applicationId:
          editingApplication._id,
        name,
      })
    );

    if (
      updateApplication.fulfilled.match(
        result
      )
    ) {
      setEditingApplication(null);
      setEditName("");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (
    application
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${application.name}"?`
    );

    if (!confirmed) {
      return;
    }

    await dispatch(
      deleteApplication(
        application._id
      )
    );
  };

  return (
    <div>
      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Applications
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage applications for each
          product category
        </p>
      </div>

      {/* =========================
          ADD APPLICATION
      ========================= */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Add Application
        </h2>

        <p className="mt-1 text-sm text-gray-500 mb-5">
          Create a new application under
          a category.
        </p>

        <form
          onSubmit={handleCreate}
          className="space-y-4"
        >
          {/* CATEGORY */}
          <div>
            <label
              htmlFor="applicationCategory"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Category
            </label>

            <select
              id="applicationCategory"
              value={selectedCategory}
              onChange={
                handleCategoryChange
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-white outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            >
              <option value="">
                Select category
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>
          </div>

          {/* APPLICATION NAME */}
          <div>
            <label
              htmlFor="applicationName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Application Name
            </label>

            <input
              id="applicationName"
              type="text"
              value={applicationName}
              onChange={(e) =>
                setApplicationName(
                  e.target.value
                )
              }
              placeholder="Enter application name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <button
            type="submit"
            disabled={
              creating ||
              !selectedCategory ||
              !applicationName.trim()
            }
            className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {creating
              ? "Adding..."
              : "Add Application"}
          </button>
        </form>
      </div>

      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =========================
          APPLICATION LIST
      ========================= */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Existing Applications
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {applications.length}{" "}
            {applications.length === 1
              ? "application"
              : "applications"}
          </p>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-gray-500">
            Loading applications...
          </div>
        ) : applications.length ===
          0 ? (
          <div className="p-6 text-sm text-gray-500">
            No applications found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {applications.map(
              (application) => (
                <div
                  key={application._id}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  {/* DETAILS */}
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {application.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Category:{" "}
                      {application.category
                        ?.name ||
                        "Unknown"}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Created{" "}
                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleEditStart(
                          application
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                      <Pencil size={15} />

                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          application
                        )
                      }
                      disabled={deleting}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 size={15} />

                      Delete
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* =========================
          EDIT MODAL
      ========================= */}
      {editingApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit Application
              </h2>

              <button
                type="button"
                onClick={
                  handleEditCancel
                }
                className="text-gray-400 hover:text-gray-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleUpdate}
            >
              <div className="p-6">
                {/* CATEGORY DISPLAY */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>

                  <div className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                    {editingApplication
                      .category?.name ||
                      "Unknown"}
                  </div>
                </div>

                {/* APPLICATION NAME */}
                <div>
                  <label
                    htmlFor="editApplicationName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Application Name
                  </label>

                  <input
                    id="editApplicationName"
                    type="text"
                    value={editName}
                    onChange={(e) =>
                      setEditName(
                        e.target.value
                      )
                    }
                    autoFocus
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={
                    handleEditCancel
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    updating ||
                    !editName.trim()
                  }
                  className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updating
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;