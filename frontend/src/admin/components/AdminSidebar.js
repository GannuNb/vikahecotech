import React from "react";
import { NavLink } from "react-router-dom";

import {
  X,
  Mail,
  LayoutDashboard,
  Package,
  FolderTree,
  Layers3,
  FileText,
} from "lucide-react";

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Categories",
      path: "/admin/categories",
      icon: FolderTree,
    },
    {
      name: "Applications",
      path: "/admin/applications",
      icon: Layers3,
    },
    {
      name: "Specification Requests",
      path: "/admin/specification-requests",
      icon: FileText,
    },
  ];

  const adminUser = JSON.parse(
    localStorage.getItem("adminUser") || "null"
  );

  const adminName =
    adminUser?.name || "Admin";

  const adminEmail =
    adminUser?.email || "";

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-64
          flex-shrink-0 flex-col
          bg-slate-900 text-white
          shadow-xl
          transition-transform duration-300

          lg:sticky
          lg:top-[86px]
          lg:z-30
          lg:h-[calc(100vh-86px)]
          lg:shadow-none

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* =================================================
            SIDEBAR HEADER
        ================================================== */}

        <div className="flex items-start justify-between border-b border-slate-700 px-5 py-5">

          <div>
            <h2 className="text-base font-semibold text-white">
              Admin Panel
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Manage Vikah Ecotech
            </p>
          </div>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X size={19} />
          </button>

        </div>

        {/* =================================================
            LOGGED-IN ADMIN
        ================================================== */}

        <div className="border-b border-slate-700 px-5 py-4">

          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Signed in as
          </p>

          <div className="mt-3 flex items-center gap-3">

            {/* Avatar */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-bold text-white">
              {adminName
                .charAt(0)
                .toUpperCase()}
            </div>

            {/* Admin Details */}

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-slate-200">
                {adminName}
              </p>

              {adminEmail && (
                <div className="mt-1 flex items-center gap-1.5">

                  <Mail
                    size={12}
                    className="shrink-0 text-slate-500"
                  />

                  <p className="truncate text-xs text-slate-400">
                    {adminEmail}
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* =================================================
            NAVIGATION
        ================================================== */}

        <nav className="flex-1 overflow-y-auto px-3 py-5">

          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
            Management
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={({ isActive }) =>
                    `
                    group flex items-center gap-3
                    rounded-xl px-3.5 py-3
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={
                          isActive ? 2.2 : 1.9
                        }
                        className={
                          isActive
                            ? "text-slate-900"
                            : "text-slate-400 group-hover:text-white"
                        }
                      />

                      <span className="truncate">
                        {item.name}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}

          </div>

        </nav>

        {/* =================================================
            SIDEBAR FOOTER
        ================================================== */}

        <div className="border-t border-slate-700 px-5 py-4">

          <p className="text-center text-[11px] text-slate-500">
            Vikah Ecotech Admin
          </p>

        </div>

      </aside>
    </>
  );
};

export default AdminSidebar;