
import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="relative min-h-[calc(100vh-86px)]">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="min-w-0 p-4 sm:p-6 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
