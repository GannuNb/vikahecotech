import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const adminName = user?.name || "Admin";

  const stats = [
    {
      title: "Total Products",
      value: "0",
      description: "Products / Models",
    },
    {
      title: "Categories",
      value: "0",
      description: "Product Categories",
    },
    {
      title: "Applications",
      value: "0",
      description: "Product Applications",
    },
    {
      title: "Specification Requests",
      value: "0",
      description: "Customer Requests",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back, {adminName}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-800">
              {stat.value}
            </h2>

            <p className="mt-2 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add Product */}
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-gray-400 hover:shadow-sm transition"
          >
            <h3 className="font-semibold text-gray-800">
              Add Product
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add a new machine model
            </p>
          </button>

          {/* Manage Categories */}
          <button
            type="button"
            onClick={() => navigate("/admin/categories")}
            className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-gray-400 hover:shadow-sm transition"
          >
            <h3 className="font-semibold text-gray-800">
              Manage Categories
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View and manage product categories
            </p>
          </button>

          {/* Manage Applications */}
          <button
            type="button"
            onClick={() => navigate("/admin/applications")}
            className="bg-white border border-gray-200 rounded-xl p-5 text-left hover:border-gray-400 hover:shadow-sm transition"
          >
            <h3 className="font-semibold text-gray-800">
              Manage Applications
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View and manage applications
            </p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h2>
        </div>

        <div className="p-6 text-sm text-gray-500">
          No recent activity.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;