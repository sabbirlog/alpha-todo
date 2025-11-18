"use client";

import FilterBar from "@/components/ui/FilterBar";
import { DateFilter } from "@/components/ui/FilterDropdown";
import AddTaskModal from "@/components/ui/modals/AddTaskModal";
import ConfirmationModal from "@/components/ui/modals/ConfirmationModal";
import EditTaskModal from "@/components/ui/modals/EditTaskModal";
import TodoCard from "@/components/ui/TodoCard";
import { Inbox } from "lucide-react";
import { useState } from "react";

type Todo = {
  id: string;
  title: string;
  priority: "extreme" | "moderate" | "low";
  description: string;
  dueDate: string;
};

const TodosView = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Backend Infrastructure",
      priority: "extreme",
      description: "Upgrading backend infrastructure for better performance.",
      dueDate: "2025-04-15",
    },
    {
      id: "2",
      title: "Mobile App Redesign",
      priority: "moderate",
      description: "Redesigning the mobile app interface.",
      dueDate: "2025-03-25",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("none");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const handleAddTask = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleEditTask = (taskId: string) => {
    const task = todos.find((t) => t.id === taskId) || null;
    if (task) {
      setSelectedTask(task);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateTask = (updatedTask: Todo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleDeleteClick = (id: string) => {
    setTodoToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (todoToDelete) {
      setTodos((prev) => prev.filter((t) => t.id !== todoToDelete));
      setTodoToDelete(null);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      todo.title.toLowerCase().includes(query) ||
      todo.description.toLowerCase().includes(query);

    const today = new Date();
    const dueDate = new Date(todo.dueDate);
    let matchesDate = true;

    switch (dateFilter) {
      case "today":
        matchesDate = dueDate.toDateString() === today.toDateString();
        break;
      case "5d":
        matchesDate =
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 5 &&
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) >= 0;
        break;
      case "10d":
        matchesDate =
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 10 &&
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) >= 0;
        break;
      case "30d":
        matchesDate =
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) <= 30 &&
          (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24) >= 0;
        break;
      default:
        matchesDate = true;
    }

    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onAddTask={handleAddTask}
      />

      {filteredTodos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              {...todo}
              onEdit={() => handleEditTask(todo.id)}
              onDelete={() => handleDeleteClick(todo.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 space-y-4">
          <Inbox className="w-12 h-12 text-slate-300" />
          <h2 className="text-xl font-semibold text-slate-700">No Todos Found</h2>
          <p className="text-slate-400 max-w-sm">
            We couldn&apos;t find any tasks matching your search or filter. Try adjusting the search term or date filter.
          </p>
        </div>
      )}

      <AddTaskModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />

      {selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          task={selectedTask}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteClick}
        />
      )}

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this task?"
      />
    </div>
  );
};

export default TodosView;
