"use client";

import { User, userRegister } from "@/api/auth";
import InputField from "@/components/forms/InputField";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type SignUpFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignUpFormValues>();

    const router = useRouter();


    const passwordValue = watch("password");

    const signUpMutation = useMutation<User, Error, { formData: FormData; }>({
        mutationFn: ({ formData }) => userRegister(formData),
        onSuccess: (data) => {
            toast.success("Account Create successfully!");

            router.push("/login");
        },
        onError: (err) => {
            toast.error(err.message || "Invalid credentials");
        },
    });

    const onSubmit = (form: SignUpFormValues) => {
        const formData = new FormData();
        formData.append("first_name", form?.firstName);
        formData.append("last_name", form?.lastName);
        formData.append("email", form.email);
        formData.append("password", form?.confirmPassword);

        signUpMutation.mutate({ formData });
    };

    return (
        <div className="w-full h-dvh flex flex-col justify-center max-w-[448px] mx-auto space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-background-dark">
                    Create your account
                </h1>
                <p className=" text-gray-900 font-normal text-base">
                    Start managing your tasks efficiently
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-9 flex flex-col gap-4"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                        label="First Name"
                        placeholder="Enter first name"
                        register={register("firstName", {
                            required: "First name is required",
                        })}
                        error={errors.firstName?.message}
                    />

                    <InputField
                        label="Last Name"
                        placeholder="Enter last name"
                        register={register("lastName", {
                            required: "Last name is required",
                        })}
                        error={errors.lastName?.message}
                    />
                </div>

                <InputField
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    register={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email",
                        },
                    })}
                    error={errors.email?.message}
                />

                <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    register={register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 4,
                            message: "Password must be at least 4 characters",
                        },
                    })}
                    error={errors.password?.message}
                />

                <InputField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm password"
                    register={register("confirmPassword", {
                        required: "Confirm your password",
                        validate: (value) =>
                            value === passwordValue || "Passwords do not match",
                    })}
                    error={errors.confirmPassword?.message}
                />

                <button
                    type="submit"
                    className="
            w-full bg-brand-primary text-white py-2 h-10 cursor-pointer rounded-xl 
            font-medium text-base hover:bg-blue-700
            transition
          "
                >
                    Sign Up
                </button>
            </form>
            <p className="text-center text-gray-900 text-sm">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="text-brand-primary font-medium"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
};

export default SignUpForm;
