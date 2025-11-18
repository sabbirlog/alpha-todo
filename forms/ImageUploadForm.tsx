"use client";

import AvatarUpload from "@/components/ui/forms/AvatarUpload";
import { useForm } from "react-hook-form";

type ProfileFormValues = {
  avatar: File | null;
};

const ImageUploadForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<ProfileFormValues>({
    defaultValues: { avatar: null },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();

    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    const res = await fetch("/api/profile", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log("Server Response:", result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto mt-10"
    >
      <AvatarUpload
        fallback="/default-avatar.png"
        value={watch("avatar")}
        error={errors.avatar?.message}
        register={register("avatar", {
          validate: {
            required: (file) => (file ? true : "Please upload a photo"),
            fileSize: (file) =>
              file && file.size > 2 * 1024 * 1024
                ? "File must be less than 2MB"
                : true,
            type: (file) =>
              file &&
              !["image/jpeg", "image/png", "image/webp"].includes(file.type)
                ? "Only JPEG, PNG, WEBP allowed"
                : true,
          },
        })}
        onChange={(file) => setValue("avatar", file)}
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Save Profile
      </button>
    </form>
  );
}

export default ImageUploadForm;
