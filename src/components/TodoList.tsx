import { useState } from "react";
import { Todo } from "./Todo";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useTodos } from "../hooks/useTodos";
import { useFilters } from "../hooks/useFilters";

export const TodoList = () => {
  const { todos } = useTodos();
  const { filters, setFilters, sortBy, setSortBy } = useFilters();
  const [showFilters, setShowFilters] = useState(false);

  const filteredTodos = todos.filter((todo) => {
    if (filters.status === "completed" && !todo.completed) return false;
    if (filters.status === "active" && todo.completed) return false;
    if (filters.priority && todo.priority !== filters.priority) return false;
    if (filters.tag && !todo.tags.includes(filters.tag)) return false;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case "dueDate":
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  const allTags = Array.from(new Set(todos.flatMap((todo) => todo.tags)));

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 [&>option]:bg-gray-900 [&>option]:text-white"
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value as "all" | "active" | "completed",
                })
              }
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <select
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 [&>option]:bg-gray-900 [&>option]:text-white"
              value={filters.priority}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priority: e.target.value as "" | "low" | "medium" | "high",
                })
              }
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 [&>option]:bg-gray-900 [&>option]:text-white"
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            >
              <option value="">All Tags</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <select
              className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 [&>option]:bg-gray-900 [&>option]:text-white"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as "createdAt" | "priority" | "dueDate"
                )
              }
            >
              <option value="createdAt">Sort by Created</option>
              <option value="priority">Sort by Priority</option>
              <option value="dueDate">Sort by Due Date</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
        {sortedTodos.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No todos found. Add some todos to get started!
          </div>
        )}
      </div>
    </div>
  );
};
