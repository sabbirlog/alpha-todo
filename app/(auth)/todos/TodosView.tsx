"use client";

import { deleteTodo, getTodos, Todo, updateTodo } from "@/api/todos";
import FilterBar from "@/components/ui/FilterBar";
import { DateFilter } from "@/components/ui/FilterDropdown";
import AddTaskModal from "@/components/ui/modals/AddTaskModal";
import ConfirmationModal from "@/components/ui/modals/ConfirmationModal";
import EditTaskModal from "@/components/ui/modals/EditTaskModal";
import TodoCard from "@/components/ui/TodoCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Reorder } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const TodosView = () => {
  const queryClient = useQueryClient();

  const [dateFilter, setDateFilter] = useState<DateFilter>("none");
  const [todosList, setTodosList] = useState<Todo[]>([]);

  const { data: todos = [], isLoading, isError } = useQuery<Todo[]>({
    queryKey: ["todos", dateFilter],
    queryFn: () => getTodos(dateFilter === "none" ? undefined : dateFilter),
    refetchOnWindowFocus: false,
  });

  const allTodos = todos?.results;

  useEffect(() => {
    if (allTodos) setTodosList(allTodos);
  }, [allTodos]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Todo | null>(null);

  const [todoToDelete, setTodoToDelete] = useState<number | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);

  const handleAddTask = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleEditTask = (taskId: number) => {
    const task = allTodos?.find((t: Todo) => t.id === taskId) || null;
    if (task) {
      setSelectedTask(task);
      setIsEditModalOpen(true);
    }
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      updateTodo(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      setIsEditModalOpen(false);
    },
  });


  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
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
      <div className="py-20 text-center text-red-900">
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

      {todosList?.length > 0 ? (
        <Reorder.Group
          axis="x"
          values={todosList}
          onReorder={setTodosList}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {todosList?.map((todo: Todo) => (
            <Reorder.Item key={todo.id} value={todo}>
              <TodoCard
                todo={todo}
                onEdit={() => handleEditTask(todo.id)}
                onDelete={() => handleDeleteClick(todo.id)}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 space-y-4">
          <div className="relative group overflow-hidden">
            <Image
              src="/todo-not-found.svg"
              alt="not-found"
              width={240}
              height={216}
              className="object-cover"
            />
          </div>
          <p>
            No todos yet
          </p>
        </div>
      )}

      <AddTaskModal isOpen={isAddModalOpen} onClose={handleCloseAddModal} />

      {selectedTask && (
        <EditTaskModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          task={selectedTask}
          onUpdate={(formData) => {
            if (selectedTask) {
              updateMutation.mutate({ id: selectedTask.id, formData });
            }
          }}
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
