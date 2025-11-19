"use client";

import { userLogin } from "@/api/auth";
import CheckBox from "@/components/forms/Checkbox";
import InputField from "@/components/forms/InputField";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginResponse = {
  access: string;
  refresh: string;
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
  const router = useRouter();

  const loginMutation = useMutation<LoginResponse, Error, { formData: FormData; rememberMe: boolean }>({
    mutationFn: ({ formData }) => userLogin(formData),
    onSuccess: (data, variables) => {
      toast.success("Login successful!");

      if (data) {
        Cookies.set("auth_token", data.access, { expires: variables.rememberMe ? 7 : undefined });
      }

      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Invalid credentials");
    },
  });

  const onSubmit = (form: LoginFormValues) => {
    const formData = new FormData();
    formData.append("email", form.email);
    formData.append("password", form.password);

    loginMutation.mutate({ formData, rememberMe: form.rememberMe });
  };

  return (
    <div className="w-full h-dvh flex flex-col justify-center max-w-[448px] mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-background-dark">Log in to your account</h2>
        <p className="text-gray-900 text-base font-normal">Start managing your tasks efficiently</p>
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
            minLength: { value: 4, message: "Password must be at least 4 characters" },
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
          disabled={loginMutation?.isPending}
          className="w-full text-base h-10 font-medium bg-brand-primary hover:bg-blue-700 text-white py-2 rounded-lg transition cursor-pointer disabled:opacity-60"
        >
          {loginMutation.isPending ? "Logging in..." : "Log In"}
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
