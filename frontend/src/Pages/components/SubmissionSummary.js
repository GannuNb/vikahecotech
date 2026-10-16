
import React from "react";

export default function SubmissionSummary({
  machineryCount = 0,
  equipmentCount = 0,
  submitting = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            Request Summary
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {machineryCount} machinery selection
            {machineryCount !== 1 ? "s" : ""} and {equipmentCount} optional
            equipment selection{equipmentCount !== 1 ? "s" : ""}.
          </p>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {submitting ? "Submitting Request..." : "Submit Quotation Request"}
        </button>
      </div>
    </div>
  );
}
