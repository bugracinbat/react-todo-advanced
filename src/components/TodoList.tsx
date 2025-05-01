import { useState } from "react";
import { Todo } from "./Todo";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useTodos } from "../hooks/useTodos";
import { useFilters } from "../hooks/useFilters";

export const TodoList = () => {
  const { todos } = useTodos();
  const { filter, tags, updateFilter, filterTodos, toggleTag } = useFilters();
  const [showFilters, setShowFilters] = useState(false);

  const filteredTodos = filterTodos(todos);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Search todos..."
          className="input max-w-md"
          value={filter.search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />
        <button
          className="btn btn-secondary flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FunnelIcon className="w-5 h-5" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="input"
                value={filter.status}
                onChange={(e) => updateFilter("status", e.target.value)}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                className="input"
                value={filter.priority}
                onChange={(e) => updateFilter("priority", e.target.value)}
              >
                <option value="all">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`px-2 py-1 rounded-full text-sm ${
                      filter.tags.includes(tag)
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
        {filteredTodos.length === 0 && (
          <p className="text-center text-gray-500">No todos found</p>
        )}
      </div>
    </div>
  );
};
