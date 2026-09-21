import React from "react";

const SeoInformation = ({ seo, handleSeoChange }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-800">
        SEO
      </h2>

      <div className="space-y-5">
        {/* SEO Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            SEO Title
          </label>

          <input
            type="text"
            name="title"
            value={seo.title}
            onChange={handleSeoChange}
            placeholder="SEO title"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
          />
        </div>

        {/* SEO Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            SEO Description
          </label>

          <textarea
            name="description"
            value={seo.description}
            onChange={handleSeoChange}
            rows={3}
            placeholder="SEO description"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
          />
        </div>

        {/* SEO Keywords */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            SEO Keywords
          </label>

          <input
            type="text"
            name="keywords"
            value={seo.keywords}
            onChange={handleSeoChange}
            placeholder="baler, tyre baler, scrap baler"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SeoInformation;