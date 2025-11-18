"use client";

import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface ClientDashboardLayoutProps {
  children: React.ReactNode;
}

const ClientDashboardLayout: React.FC<ClientDashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const activeTabMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/todos": "Todos",
    "/account": "Account Information",
  };

  const activeTab = activeTabMap[pathname] || "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={() => {}}
      />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="p-6 bg-background-light flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default ClientDashboardLayout;
