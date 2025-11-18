"use client";

import FilterBar from "@/components/ui/FilterBar";
import { DateFilter } from "@/components/ui/FilterDropdown";
import TodoCard from "@/components/ui/TodoCard";
import { Inbox } from "lucide-react";
import { useState } from "react";

const TodosView = () => {
  const todos = [
    {
      id: 1,
      title: "Backend Infrastructure",
      priority: "Extreme" as const,
      description: "Upgrading backend infrastructure for better performance.",
      dueDate: "Apr 15, 2025",
    },
    {
      id: 2,
      title: "Mobile App Redesign",
      priority: "Moderate" as const,
      description: "Redesigning the mobile app interface.",
      dueDate: "Mar 25, 2025",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilter>("none");

  const handleAddTask = () => {
    console.log("Add New Task clicked");
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
      {/* Filter Bar */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        onAddTask={handleAddTask}
      />

      {/* Todos Grid */}
      {filteredTodos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTodos.map((todo) => (
            <TodoCard
              key={todo.id}
              {...todo}
              onEdit={() => console.log("Edit", todo.id)}
              onDelete={() => console.log("Delete", todo.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 space-y-4">
          <Inbox className="w-12 h-12 text-slate-300" />
          <h2 className="text-xl font-semibold text-slate-700">No Todos Found</h2>
          <p className="text-slate-400 max-w-sm">
            We couldn't find any tasks matching your search or filter. Try adjusting the search term or date filter.
          </p>
        </div>
      )}
    </div>
  );
};

export default TodosView;
