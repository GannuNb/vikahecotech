import React from "react";
import { CheckCircle2, X } from "lucide-react";

const CustomAlert = ({
  title = "Success",
  message,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
      <div className="flex w-full max-w-md items-center gap-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-4 shadow-lg">

        {/* Logo */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
          <img
            src="/logo_vk.png"
            alt="Vikah Ecotech"
            className="h-10 w-10 object-contain"
          />
        </div>

        {/* Success Icon */}
        <div className="shrink-0">
          <CheckCircle2
            size={26}
            className="text-green-600"
          />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-green-700">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-5 text-gray-700">
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full p-1 text-green-600 transition hover:bg-green-100 hover:text-green-800"
          aria-label="Close alert"
        >
          <X size={20} />
        </button>

      </div>
    </div>
  );
};

export default CustomAlert;