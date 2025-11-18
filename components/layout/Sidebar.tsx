"use client";

import { CheckSquare, LayoutDashboard, LogOut, LucideIcon, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Button from "../ui/Button";

interface MenuItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems?: MenuItem[];
}

const defaultMenu: MenuItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Todos", icon: CheckSquare, path: "/todos" },
  { label: "Account Information", icon: User, path: "/account" },
];

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
  menuItems = defaultMenu,
}) => {
  const router = useRouter();

  const handleNavigation = (item: MenuItem) => {
    setActiveTab(item.label);
    setIsOpen(false);
    router.push(item.path);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-full lg:h-screen w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-8 flex flex-col items-center border-b border-slate-800">
          <div className="relative mb-4 group cursor-pointer">
            <div className="w-24 h-24 rounded-full p-1 border-2 border-slate-700 group-hover:border-blue-500 transition-colors">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                alt="User"
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <h3 className="text-lg font-bold text-white">Amanuel</h3>
          <p className="text-sm text-slate-400">amanuel@gmail.com</p>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 border-l-4 justify-start ${
                activeTab === item.label
                  ? "bg-blue-800/50 border-blue-500 text-white"
                  : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
              onClick={() => handleNavigation(item)}
            >
              <item.icon
                size={22}
                className={activeTab === item.label ? "text-blue-400" : "text-current"}
              />
              <span className="font-medium tracking-wide">{item.label}</span>
            </Button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <Button
            variant="ghost"
            className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 w-full px-4 py-3 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
