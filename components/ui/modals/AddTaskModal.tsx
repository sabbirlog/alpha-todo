"use client";

import React, { useRef } from "react";

import { createTodo } from "@/api/todos";
import InputField from "@/components/forms/InputField";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import Button from "../Button";

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    title: string;
    date: string;
    priority: "extreme" | "moderate" | "low";
    description: string;
}

const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const modalContentVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.95 },
};

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose }) => {
    const queryClient = useQueryClient();

    const modalRef = useRef<HTMLDivElement | null>(null);
    useOutsideClick(modalRef, onClose);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const createMutation = useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            onClose();
        },
    });


    const onSubmit = (data: FormValues) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("todo_date", data.date);
        formData.append("priority", data.priority);
        formData.append("description", data.description);

        createMutation.mutate(formData);

        reset();
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed left-72 top-20 inset-0 bg-black/74 flex justify-center items-center z-50"
                    variants={modalOverlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    <motion.div
                        ref={modalRef}
                        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg mx-4"
                        variants={modalContentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.25 }}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">Add New Task</h2>
                            <Button variant="secondary" onClick={onClose}>
                                Go Back
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <InputField
                                label="Title"
                                placeholder="Task title"
                                register={register("title", { required: "Title is required" })}
                                error={errors.title?.message}
                            />

                            <InputField
                                label="Date"
                                type="date"
                                register={register("date", { required: "Date is required" })}
                                error={errors.date?.message}
                            />

                            <div>
                                <h3 className="text-md font-semibold text-gray-700 mb-2">Priority</h3>
                                <div className="flex space-x-6">
                                    {(["extreme", "moderate", "low"] as const).map((level) => {
                                        const colorMap = {
                                            extreme: "bg-red-600",
                                            moderate: "bg-green-500",
                                            low: "bg-yellow-500",
                                        };
                                        return (
                                            <label key={level} className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    value={level}
                                                    {...register("priority", { required: true })}
                                                    className="form-radio border-gray-300 focus:ring-2"
                                                    defaultChecked={level === "extreme"}
                                                />
                                                <span className="ml-2 text-sm text-gray-700 flex items-center">
                                                    <span
                                                        className={`inline-block w-2.5 h-2.5 rounded-full ${colorMap[level]} mr-1`}
                                                    ></span>
                                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <InputField
                                label="Task Description"
                                placeholder="Start writing here....."
                                register={register("description", { required: "Description is required" })}
                                error={errors.description?.message}
                            />

                            <div className="flex justify-between items-center mt-8">
                                <Button variant="primary" className="px-8 py-3" type="submit">
                                    Done
                                </Button>
                                <Button variant="icon" className="bg-red-900 text-white hover:bg-red-600 shadow-md">
                                    <Trash2 className="text-lg" />
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddTaskModal;
