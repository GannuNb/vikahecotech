import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";

import Dashboard from "../pages/Dashboard";
import SpecificationRequests from "../pages/SpecificationRequests";

const AdminRoutes = () => {
  return (
    <>
      {/* ================================
          DASHBOARD
      ================================= */}

      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />

      {/* ================================
          SPECIFICATION REQUESTS
      ================================= */}

      <Route
        path="/admin/specification-requests"
        element={
          <AdminLayout>
            <SpecificationRequests />
          </AdminLayout>
        }
      />
    </>
  );
};

export default AdminRoutes;