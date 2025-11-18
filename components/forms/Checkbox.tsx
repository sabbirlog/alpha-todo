"use client";

import React from "react";

interface CheckBoxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  id,
  label,
  checked,
  onChange,
  className = "",
}) => {
  return (
    <label htmlFor={id} className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-blue-600"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
};

export default CheckBox;
