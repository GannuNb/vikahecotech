import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";
import Dashboard from "../pages/Dashboard";

const AdminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />
    </>
  );
};

export default AdminRoutes;