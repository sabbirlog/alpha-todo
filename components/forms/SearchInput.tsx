"use client";

import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search your task here...",
}) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pr-12 pl-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-800 shadow-sm"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-brand-primary flex items-center justify-center cursor-pointer">
        <Search className="w-4 h-4 text-white" />
      </div>
    </div>
  );
};

export default SearchInput;
