
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const adminName = user?.name || "Admin";

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalApplications: 0,
    totalSpecificationRequests: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/api/admin/dashboard/stats");

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Dashboard statistics error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load dashboard statistics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      description: "Products / Models",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      description: "Product Categories",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      description: "Product Applications",
    },
    {
      title: "Specification Requests",
      value: stats.totalSpecificationRequests,
      description: "Customer Requests",
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">DASHBOARD</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {adminName}!
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">
              {stat.title}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-800">
              {loading ? "..." : stat.value.toLocaleString("en-IN")}
            </h2>
            <p className="mt-2 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button
            onClick={() => navigate("/admin/products")}
            className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-800">Add Product</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add a new product or model
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/categories")}
            className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-800">
              Manage Categories
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              View and manage product categories
            </p>
          </button>

          <button
            onClick={() => navigate("/admin/applications")}
            className="rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
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
      <div className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-6">
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
