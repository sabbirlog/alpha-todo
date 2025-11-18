"use client";

import { Calendar, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  label: string;
  type?: "text" | "email" | "password" | "date";
  placeholder?: string;
  disabled?: boolean;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  placeholder,
  disabled,
  register,
  error,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPassword = type === "password";
  const isDate = type === "date";

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <label className="font-medium text-gray-800">{label}</label>

      <div className="relative">
        <input
          {...register}
          disabled={disabled}
          type={
            isPassword ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 pr-12 rounded-xl border outline-none
            text-gray-700 placeholder-gray-400 bg-white
            ${error ? "border-red-900 focus:border-red-900" : "border-gray-300 focus:border-black"}
             transition
            disabled:bg-gray-100 disabled:cursor-not-allowed
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {isDate && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
            <Calendar size={18} />
          </span>
        )}
      </div>

      {error && <p className="text-sm text-red-900">{error}</p>}
    </div>
  );
};

export default InputField;
