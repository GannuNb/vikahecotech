import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";

import Dashboard from "../pages/Dashboard";
import SpecificationRequests from "../pages/SpecificationRequests";
import QuotationRequests from "../pages/QuotationRequests";

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
      <Route
        path="/admin/quotation-requests"
        element={
          <AdminLayout>
            <QuotationRequests />
          </AdminLayout>
        }
      />
    </>
  );
};

export default AdminRoutes;