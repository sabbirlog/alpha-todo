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
        className={`fixed lg:sticky top-0 left-0 z-50 h-full lg:h-screen w-72 bg-background-dark text-white flex flex-col transition-transform duration-300 shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-8 flex flex-col items-center border-b border-slate-800">
          <div className="relative group w-21.5 h-21.5 cursor-pointer overflow-hidden">
            <div className="w-full h-full rounded-full p-0.5 border border-white group-hover:border-brand-primary transition-colors">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=86&q=80"
                alt="User"
                width={86}
                height={86}
                className="rounded-full object-cover h-full"
              />
            </div>
          </div>
          <h3 className="text-base font-semibold text-white">Amanuel</h3>
          <p className="text-xs text-white font-normal mt-.5">amanuel@gmail.com</p>
        </div>

        <nav className="flex-1 py-6 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-200 justify-start rounded-none ${
                activeTab === item.label
                  ? "bg-linear-to-r from-[#5272FF]/15 to-[#0D224A]/15 text-white"
                  : "border-transparent text-slate-400 hover:text-white hover:bg-brand-primary"
              }`}
              onClick={() => handleNavigation(item)}
            >
              <item.icon
                size={22}
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
