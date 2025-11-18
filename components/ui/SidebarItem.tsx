"use client";

import { LucideProps } from "lucide-react";
import React from "react";
import Button from "./Button";

interface SidebarItemProps {
  icon: React.ComponentType<LucideProps>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active = false, onClick }) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-6 py-4 border-l-4 transition-all duration-200
        ${active ? "bg-blue-800/50 border-blue-500 text-white" : "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50"}
      `}
    >
      <Icon size={22} className={active ? "text-blue-400" : "text-current"} />
      <span className="font-medium tracking-wide">{label}</span>
    </Button>
  );
};

export default SidebarItem;
