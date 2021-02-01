import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import AccountView from "./views/account/AccountView";
import CustomerListView from "./views/customer/CustomerListView";
import DashboardView from "./views/reports/DashboardView";
import LoginView from "./views/auth/LoginView";
import NotFoundView from "./views/errors/NotFoundView";
import ServiceListView from "./views/service";
import BookingListView from "./views/Booking";
import RegisterView from "./views/auth/RegisterView";
import SettingsView from "./views/settings/SettingsView";
import VendorListView from "./views/vendor";

const routes = [
  {
    path: "partners",
    element: <DashboardLayout />,
    children: [
      { path: "account", element: <AccountView /> },
      { path: "customers", element: <CustomerListView /> },
      { path: "vendors", element: <VendorListView /> },
      { path: "vendors/:vendorId", element: <SettingsView /> },
      { path: "dashboard", element: <DashboardView /> },
      { path: "services", element: <ServiceListView /> },
      { path: "bookings", element: <BookingListView /> },
      { path: "settings", element: <SettingsView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "register", element: <RegisterView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/partners/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
