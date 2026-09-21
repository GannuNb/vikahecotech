import React from "react";

const FormActions = ({
  handleBack,
  saving,
  isEditMode,
}) => {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      {/* Cancel */}
      <button
        type="button"
        onClick={handleBack}
        className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>

      {/* Submit */}
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving
          ? "Saving..."
          : isEditMode
          ? "Update Model"
          : "Create Model"}
      </button>
    </div>
  );
};

export default FormActions;