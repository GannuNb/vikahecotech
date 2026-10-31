import React from "react";
import { Route } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";

import Dashboard from "../pages/Dashboard";
import SpecificationRequests from "../pages/SpecificationRequests";
import QuotationRequests from "../pages/QuotationRequests";
import Enquiries from "../../Pages/Admin/Enquiries";

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

      <Route
        path="/admin/enquiries"
        element={
          <AdminLayout>
            <Enquiries />
          </AdminLayout>
        }
      />
    </>
  );
};

export default AdminRoutes;