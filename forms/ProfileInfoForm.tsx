"use client";

import { getProfileData, UserProfile } from "@/api/account";
import AvatarUpload from "@/components/forms/AvatarUpload";
import InputField from "@/components/forms/InputField";
import Button from "@/components/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type ProfileInfoFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contactNumber: string;
  birthday: string;
  avatar?: File | null;
};

const ProfileInfoForm = () => {
  const { data: ProfileData, isLoading, isError } = useQuery<UserProfile>({
    queryKey: ["me"],
    queryFn: getProfileData,
    refetchOnWindowFocus: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<ProfileInfoFormValues>({
    defaultValues: {
      avatar: null,
    },
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
    setValue("avatar", file);
  };

  const onSubmit: SubmitHandler<ProfileInfoFormValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("address", data.address);
      formData.append("contactNumber", data.contactNumber);
      formData.append("birthday", data.birthday);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await fetch("/api/profile/update", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const result = await response.json();
      console.log("Profile updated successfully:", result);

      reset();
      setAvatarFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-10 p-8 border rounded-2xl bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AvatarUpload value={avatarFile} onChange={handleAvatarChange} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            defaultValue={ProfileData?.first_name}
            placeholder="Enter first name"
            register={register("firstName", { required: "First name is required" })}
            error={errors.firstName?.message}
          />

          <InputField
            label="Last Name"
            defaultValue={ProfileData?.last_name}
            placeholder="Enter last name"
            register={register("lastName", { required: "Last name is required" })}
            error={errors.lastName?.message}
          />
        </div>

        <InputField
          label="Email"
          type="email"
          defaultValue={ProfileData?.email}
          placeholder="Enter your email"
          register={register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Address"
            placeholder="Enter address"
            defaultValue={ProfileData?.address}
            register={register("address", { required: "Address is required" })}
            error={errors.address?.message}
          />

          <InputField
            label="Contact Number"
            placeholder="Enter contact number"
            defaultValue={ProfileData?.contact_number}
            register={register("contactNumber", { required: "Contact number is required" })}
            error={errors.contactNumber?.message}
          />
        </div>

        <InputField
          label="Birthday"
          type="date"
          defaultValue={ProfileData?.birthday}
          register={register("birthday", { required: "Birthday is required" })}
          error={errors.birthday?.message}
        />

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            Save Changes
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              reset();
              setAvatarFile(null);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
