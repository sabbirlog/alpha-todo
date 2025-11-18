"use client";

import CheckBox from "@/components/forms/Checkbox";
import InputField from "@/components/forms/InputField";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="w-full h-dvh flex flex-col justify-center max-w-[448px] mx-auto">

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-background-dark">Log in to your account</h2>
        <p className="text-gray-900 text-base font-normal">
          Start managing your tasks efficiently
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-9 mb-4">
        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          error={errors.email?.message}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between mt-2">
          <CheckBox
            id="rememberMe"
            label="Remember me"
            checked={rememberMe}
            onChange={(checked) => setValue("rememberMe", checked)}
          />

          <Link href="/forgot-password" className="text-brand-primary text-sm font-medium">
            Forgot your password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full text-base h-10 font-medium bg-brand-primary hover:bg-blue-700 text-white py-2 rounded-lg transition cursor-pointer"
        >
          Log In
        </button>
      </form>

      <p className="text-center text-gray-900 text-sm">
        Don’t have an account?{" "}
        <Link href="/sign-up" className="text-brand-primary">
          Register now
        </Link>
      </p>

    </div>
  );
};

export default LoginForm;
