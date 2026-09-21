import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import { logout } from "../../redux/slices/authSlice";

const AdminNavbar = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const adminName = user?.name || "Admin";
  const adminEmail = user?.email || "";
  const initial = adminName.charAt(0).toUpperCase();

  const handleLogout = () => {
    dispatch(logout());

    navigate("/admin/login", {
      replace: true,
    });
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6">
      
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-semibold text-gray-800">
            Vikah Ecotech
          </h1>

          <p className="text-xs text-gray-500">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* User Info */}
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-800">
            {adminName}
          </p>

          <p className="text-xs text-gray-500">
            {adminEmail}
          </p>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold">
          {initial}
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="hidden sm:block text-sm font-medium text-red-600 hover:text-red-700 transition"
        >
          Logout
        </button>

        {/* Mobile Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="sm:hidden text-xs font-medium text-red-600 hover:text-red-700 transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default AdminNavbar;