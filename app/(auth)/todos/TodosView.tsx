"use client";

import { deleteTodos, getTodos, Todo } from "@/api/todos";
import FilterBar from "@/components/ui/FilterBar";
import { DateFilter } from "@/components/ui/FilterDropdown";
import AddTaskModal from "@/components/ui/modals/AddTaskModal";
import ConfirmationModal from "@/components/ui/modals/ConfirmationModal";
import EditTaskModal from "@/components/ui/modals/EditTaskModal";
import TodoCard from "@/components/ui/TodoCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox } from "lucide-react";
import { useState } from "react";

const TodosView = () => {
  const queryClient = useQueryClient();

  const { data: todos = [], isLoading, isError } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
    refetchOnWindowFocus: false,
  });

  const allTodos = todos?.results;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("none");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const handleAddTask = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleEditTask = (taskId: number) => {
    const task = todos.find((t) => t.id === taskId) || null;
    if (task) {
      setSelectedTask(task);
      setIsEditModalOpen(true);
    }
  };

  const deleteMutation = useMutation({
  mutationFn: deleteTodos,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  },
});

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteClick = (id: number) => {
    setTodoToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (todoToDelete) {
      deleteMutation.mutate(todoToDelete);
      setIsConfirmOpen(false);
      setTodoToDelete(null);
    }
  };

  if (isLoading)
    return (
      <div className="py-20 text-center text-slate-500">Loading todos...</div>
    );

  if (isError)
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load todos.
      </div>
    );

  return (
    <div className="space-y-6">
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onAddTask={handleAddTask}
      />

      {allTodos?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {allTodos?.map((todo: Todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
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
            We couldn&apos;t find any tasks.
          </p>
        </div>
      )}

      <AddTaskModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />

      {selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          task={selectedTask}
          onUpdate={() => { }}
          onDelete={() => { }}
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
