"use client";

import InputField from "@/components/forms/InputField";
import useOutsideClick from "@/hooks/useOutsideClick";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: {
        id: string;
        title: string;
        date: string;
        priority: "extreme" | "moderate" | "low";
        description: string;
    };
    onUpdate: (updatedTask: {
        id: string;
        title: string;
        date: string;
        priority: "extreme" | "moderate" | "low";
        description: string;
    }) => void;
    onDelete?: (id: string) => void;
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

const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, task, onUpdate, onDelete }) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    useOutsideClick(modalRef, onClose);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();

    useEffect(() => {
        if (isOpen && task) {
            reset({
                title: task.title,
                date: task.date,
                priority: task.priority,
                description: task.description,
            });
        }
    }, [isOpen, task, reset]);

    const onSubmit = (data: FormValues) => {
        onUpdate({ ...data, id: task.id });
        onClose();
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
                            <h2 className="text-2xl font-bold text-gray-800">Edit Task</h2>
                            <Button variant="secondary" onClick={onClose}>
                                Go Back
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <InputField
                                label="Title"
                                value={task?.title}
                                placeholder="Task title"
                                register={register("title", { required: "Title is required" })}
                                error={errors.title?.message}
                            />

                            <InputField
                                label="Date"
                                value={task?.date}
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
                                value={task?.description}
                                placeholder="Start writing here....."
                                register={register("description", { required: "Description is required" })}
                                error={errors.description?.message}
                            />

                            <div className="flex justify-between items-center mt-8">
                                <Button variant="primary" className="px-8 py-3" type="submit">
                                    Update
                                </Button>
                                {onDelete && (
                                    <Button
                                        variant="icon"
                                        className="bg-red-900 text-white hover:bg-red-600 shadow-md"
                                        onClick={() => {
                                            onDelete(task.id);
                                            onClose();
                                        }}
                                    >
                                        <Trash2 className="text-lg" />
                                    </Button>
                                )}
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditTaskModal;
