import ClientDashboardLayout from "@/components/layout/ClientDashboardLayout";
import React from "react";

export const metadata = {
  title: "Dashboard",
  description: "Your Todo dashboard",
};

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ClientDashboardLayout>{children}</ClientDashboardLayout>;
};

export default DashboardLayout;
