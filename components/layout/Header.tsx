"use client";

import { Bell, Calendar, Grid3X3, Menu } from "lucide-react";
import React from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md">
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Grid3X3 className="text-white w-5 h-5" />
          </div>
          <div className="leading-tight">
            <h1 className="text-xl font-black text-slate-800 tracking-tighter">DREAMY</h1>
            <p className="text-[0.65rem] font-bold text-slate-500 tracking-[0.2em] uppercase">SOFTWARE</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end mr-4 border-r border-gray-200 pr-6 h-10 justify-center">
          <span className="text-sm font-bold text-slate-800">Friday</span>
          <span className="text-xs font-medium text-slate-500">07/11/2025</span>
        </div>

        <button className="relative p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        <button className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors hidden sm:block">
          <Calendar size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
