import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Menu,
  LogOut,
} from "lucide-react";

import { logout } from "../../redux/slices/authSlice";

const AdminNavbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(
    (state) => state.auth.user
  );

  const adminName = user?.name || "Admin";

  const initial =
    adminName.charAt(0).toUpperCase();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <header className="sticky top-0 z-40 h-[86px] border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <div className="flex items-center">

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 lg:hidden"
          >
            <Menu size={21} />
          </button>

          {/* Logo */}

          <div className="flex h-14 w-[165px] items-center sm:h-16 sm:w-[180px]">
            <img
              src="/logo_vk.png"
              alt="Vikah Ecotech"
              className="h-full w-full object-contain object-left"
            />
          </div>

        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div className="flex items-center gap-3 sm:gap-4">

          {/* Admin */}

          <div className="hidden items-center gap-3 sm:flex">

            {/* Avatar */}

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white shadow-sm">
              {initial}
            </div>

            {/* Name */}

            <div className="max-w-[160px]">
              <p className="truncate text-sm font-semibold text-slate-800">
                {adminName}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                Administrator
              </p>
            </div>

          </div>

          {/* Mobile Avatar */}

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white sm:hidden">
            {initial}
          </div>

          {/* Divider */}

          <div className="hidden h-9 w-px bg-slate-200 sm:block" />

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex h-10 items-center justify-center gap-2
              rounded-xl
              bg-slate-900
              px-3.5
              text-sm font-semibold text-white
              shadow-sm
              transition-all duration-200
              hover:bg-slate-700
              hover:shadow-md
              active:scale-[0.98]
              sm:h-11 sm:px-5
            "
          >
            <LogOut size={16} />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;