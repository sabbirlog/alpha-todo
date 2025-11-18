"use client";

import InputField from "@/components/ui/forms/InputField";
import { SubmitHandler, useForm } from "react-hook-form";

type ProfileInfoFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contactNumber: string;
  birthday: string;
};

const ProfileInfoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInfoFormValues>();

  const onSubmit: SubmitHandler<ProfileInfoFormValues> = (data) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="mx-auto mt-10 p-8 border rounded-2xl bg-white">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            placeholder="Enter first name"
            register={register("firstName", { required: "First name is required" })}
            error={errors.firstName?.message}
          />

          <InputField
            label="Last Name"
            placeholder="Enter last name"
            register={register("lastName", { required: "Last name is required" })}
            error={errors.lastName?.message}
          />
        </div>

        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Address"
            placeholder="Enter address"
            register={register("address", { required: "Address is required" })}
            error={errors.address?.message}
          />

          <InputField
            label="Contact Number"
            placeholder="Enter contact number"
            register={register("contactNumber", { required: "Contact number is required" })}
            error={errors.contactNumber?.message}
          />
        </div>

        <InputField
          label="Birthday"
          type="date"
          register={register("birthday", { required: "Birthday is required" })}
          error={errors.birthday?.message}
        />

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-10 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-400 text-white px-10 py-3 rounded-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInfoForm;
