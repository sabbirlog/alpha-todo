"use client";

import { Todo } from "@/api/todos";
import { Grid3X3, Pencil, Trash2 } from "lucide-react";
import React from "react";
import Button from "./Button";

export type TodoPriority = "extreme" | "moderate" | "low";

export interface TodoCardProps {
  todo: Todo;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  onEdit,
  onDelete
}) => {
  const { id, priority, title, description, todo_date } = todo;

  const styles: Record<TodoPriority, { border: string; bg: string; badge: string; wrapper: string }> = {
    extreme: {
      border: "border-red-100",
      bg: "bg-white",
      badge: "bg-red-100 text-red-600",
      wrapper: "hover:shadow-red-100"
    },
    moderate: {
      border: "border-green-100",
      bg: "bg-white",
      badge: "bg-green-100 text-green-600",
      wrapper: "hover:shadow-green-100"
    },
    low: {
      border: "border-yellow-100",
      bg: "bg-white",
      badge: "bg-yellow-100 text-yellow-600",
      wrapper: "hover:shadow-yellow-100"
    }
  };

  const currentStyle = styles[priority] || styles.low;

  return (
    <div
      className={`
        relative p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between gap-6 h-full
        ${currentStyle.border} ${currentStyle.bg} ${currentStyle.wrapper}
      `}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-bold text-slate-800 leading-tight">{title}</h3>
            <span
              className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${currentStyle.badge}`}
            >
              {priority}
            </span>
          </div>
        </div>
        <button className="text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing p-1">
          <Grid3X3 size={20} />
        </button>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed">{description}</p>

      <div className="flex items-center justify-between pt-2 mt-auto">
        <div className="text-sm font-medium text-slate-500">
          <span className="block text-xs text-slate-400 mb-0.5">Due Date</span>
          {todo_date}
        </div>

        <div className="flex gap-2">
          <Button
            variant="icon"
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
            onClick={onEdit}
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="icon"
            className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
