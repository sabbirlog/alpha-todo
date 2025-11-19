"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { Calendar } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import Button from "./Button";

export type DateFilter = "none" | "today" | "5d" | "10d" | "30d";

interface FilterDropdownProps {
  dateFilter: DateFilter | string;
  setDateFilter: (val: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ dateFilter, setDateFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const dateFilterOptions: { label: string; value: DateFilter }[] = [
    { label: "No Filter", value: "none" },
    { label: "Deadline Today", value: "today" },
    { label: "Expires in 5 days", value: "5d" },
    { label: "Expires in 10 days", value: "10d" },
    { label: "Expires in 30 days", value: "30d" },
  ];

  const calculateDate = (value: DateFilter) => {
    const today = new Date();
    let targetDate: Date | null = null;

    switch (value) {
      case "today":
        targetDate = today;
        break;
      case "5d":
        targetDate = new Date(today.setDate(today.getDate() + 5));
        break;
      case "10d":
        targetDate = new Date(today.setDate(today.getDate() + 10));
        break;
      case "30d":
        targetDate = new Date(today.setDate(today.getDate() + 30));
        break;
      default:
        targetDate = null;
    }

    if (!targetDate) return ""; // no filter

    // format as YYYY-MM-DD
    const yyyy = targetDate.getFullYear();
    const mm = String(targetDate.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const dd = String(targetDate.getDate()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd}`;
  };

  const handleFilterChange = useCallback(
    (value: DateFilter) => {
      const formattedDate = calculateDate(value);
      setDateFilter(formattedDate); // pass formatted date string to parent
      setIsOpen(false);
    },
    [setDateFilter]
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        type="button"
        className="inline-flex items-center justify-between w-full sm:w-auto h-full gap-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="filter-menu"
        aria-haspopup="true"
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="text-slate-700 font-medium">Filter</span>
        </div>
      </Button>

      {isOpen && (
        <div
          id="filter-menu"
          className="absolute right-0 mt-2 w-72 origin-top-right bg-white border border-slate-200 rounded-xl shadow-xl z-20 p-4 animate-in fade-in-0 zoom-in-95 duration-200"
          role="menu"
          aria-orientation="vertical"
        >
          <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4 text-blue-500" /> Date Filter
          </h3>
          <div className="flex flex-col space-y-2">
            {dateFilterOptions.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`inline-flex items-center justify-start w-full px-3 py-2 rounded-lg text-sm transition-colors ${
                  calculateDate(value) === dateFilter
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
                onClick={() => handleFilterChange(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
