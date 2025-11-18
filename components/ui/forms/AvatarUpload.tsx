"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface AvatarUploadProps {
  fallback?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  register?: UseFormRegisterReturn;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  fallback = "/avatar-placeholder.png",
  value,
  onChange,
  error,
  register,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>(fallback);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onChange(file);
    } else {
      setPreview(fallback);
      onChange(null);
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();

  return (
    <div className="flex items-center gap-6 p-4 bg-white rounded-xl border">
      <div className="relative">
        <Image
          src={preview}
          alt="Avatar preview"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full object-cover bg-gray-300"
        />

        <button
          type="button"
          onClick={openFilePicker}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-600 text-white grid place-items-center shadow-md"
        >
          📷
        </button>
      </div>

      <button
        type="button"
        onClick={openFilePicker}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
      >
        ⬆️ Upload New Photo
      </button>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        {...register}
        ref={(e) => {
          fileInputRef.current = e;
          register?.ref?.(e);
        }}
        onChange={(e) => {
          register?.onChange?.(e);
          handleFileChange(e);
        }}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default AvatarUpload;
