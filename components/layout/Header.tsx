"use client";

import { Bell, Calendar, Menu } from "lucide-react";
import React from "react";
import Logo from "../icons/Logo";
import Button from "../ui/Button";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <Button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md">
          <Menu size={24} />
        </Button>
        <Logo />
      </div>

      <div className="flex items-center gap-6">
        <Button className="relative p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
          <Bell size={20} />
        </Button>

        <Button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors hidden sm:block">
          <Calendar size={20} />
        </Button>
        <div className="hidden md:flex flex-col items-end h-10 justify-center">
          <span className="text-sm font-bold text-slate-800">Friday</span>
          <span className="text-xs font-medium text-slate-500">07/11/2025</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
