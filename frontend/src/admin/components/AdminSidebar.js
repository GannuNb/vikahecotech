import React from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      path: "/admin/products",
    },
    {
      name: "Categories",
      path: "/admin/categories",
    },
    {
      name: "Applications",
      path: "/admin/applications",
    },
  ];

  const adminUser = JSON.parse(
    localStorage.getItem("adminUser") || "null"
  );

  const adminName = adminUser?.name || "Admin";

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50 lg:z-auto
          w-64
          h-screen lg:min-h-[calc(100vh-4rem)]
          bg-gray-900
          text-white
          flex-shrink-0
          transform transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-700 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Admin Panel
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Manage Vikah Ecotech
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white transition"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Logged-in Admin */}
        <div className="px-4 py-4 border-b border-gray-700">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            Signed in as
          </p>

          <p className="mt-1 text-sm font-medium text-white truncate">
            {adminName}
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <p className="px-3 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Management
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-gray-900"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;