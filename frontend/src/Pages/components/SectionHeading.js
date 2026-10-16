
import React from "react";

export default function SectionHeading({
  number,
  title,
  description,
}) {
  return (
    <div className="mb-6 flex items-start gap-3 sm:gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700">
        {number}
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}
