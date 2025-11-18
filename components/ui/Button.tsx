"use client";

import React from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: "bg-brand-primary hover:bg-blue-700 text-white shadow-blue-200",
  secondary: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300",
  ghost: "bg-transparent hover:bg-white/10 text-white",
  outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
  icon: "p-2.5 rounded-lg transition-colors active:scale-95 shadow-sm flex items-center justify-center",
};

const baseStyle =
  "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-sm active:scale-95";

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  children,
  fullWidth = false,
  isLoading = false,
  ...props
}) => {
  const isIcon = variant === "icon";

  return (
    <button
      className={`${isIcon ? variants.icon : `${baseStyle} ${variants[variant]}`} ${
        fullWidth ? "w-full" : ""
      } ${className} ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
