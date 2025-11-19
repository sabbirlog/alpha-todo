"use client";

import { Todo } from "@/api/todos";
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
    task: Todo;
    onUpdate: (formData: FormData) => void;
    onDelete?: (id: number) => void;
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

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Todo>();

    useEffect(() => {
        if (isOpen && task) {
            reset({
                title: task.title,
                todo_date: task?.todo_date,
                priority: task.priority,
                description: task.description,
            });
        }
    }, [isOpen, task, reset]);

    const onSubmit = (data: Todo) => {
        const formData = new FormData();

        formData.append("title", data.title);
        formData.append("todo_date", data?.todo_date);
        formData.append("priority", data.priority);
        formData.append("description", data.description);

        onUpdate(formData);
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
                            <div className="flex flex-col gap-1">
                                <h2 className=" text-background-dark font-semibold text-2xl">Edit Task</h2>
                                <div className="h-0.5 w-20 bg-brand-primary"></div>
                            </div>
                            <Button variant="secondary" onClick={onClose} className="bg-transparent underline underline-offset-4 border-0 shadow-none! decoration-1 decoration-background-dark">
                                Go Back
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <InputField
                                label="Title"
                                defaultValue={task?.title}
                                placeholder="Task title"
                                register={register("title", { required: "Title is required" })}
                                error={errors.title?.message}
                            />

                            <InputField
                                label="Date"
                                defaultValue={task?.todo_date}
                                type="date"
                                register={register("todo_date", { required: "Date is required" })}
                                error={errors.todo_date?.message}
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
                                                <span className="mr-2 text-sm text-gray-700 flex items-center">
                                                    <span
                                                        className={`inline-block w-2.5 h-2.5 rounded-full ${colorMap[level]} mr-1`}
                                                    ></span>
                                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                                </span>
                                                <input
                                                    type="radio"
                                                    value={level}
                                                    {...register("priority", { required: true })}
                                                    className="form-radio border-gray-300 focus:ring-2"
                                                />
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <InputField
                                label="Task Description"
                                defaultValue={task?.description}
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
                                            reset();
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
