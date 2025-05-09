import { useState } from "react";
import { Todo as TodoType } from "../store/todoSlice";
import { format } from "date-fns";
import {
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useTodos } from "../hooks/useTodos";
import { useTodoForm } from "../hooks/useTodoForm";

interface TodoProps {
  todo: TodoType;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { toggleTodoStatus, editTodo, removeTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const { formState, updateField } = useTodoForm(todo);

  const handleToggle = () => {
    toggleTodoStatus(todo.id);
  };

  const handleDelete = () => {
    removeTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo({ ...formState, id: todo.id });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const priorityStyles = {
    low: "bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]",
    medium:
      "bg-yellow-500/20 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]",
    high: "bg-red-500/20 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]",
  };

  if (isEditing) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-4 sm:p-6 space-y-4">
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200"
          value={formState.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Enter todo title"
        />
        <textarea
          className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200"
          value={formState.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Enter todo description"
          rows={3}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 [&>option]:bg-gray-900 [&>option]:text-white"
            value={formState.priority}
            onChange={(e) =>
              updateField("priority", e.target.value as TodoType["priority"])
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200"
            value={formState.dueDate || ""}
            onChange={(e) => updateField("dueDate", e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-white bg-white text-black hover:bg-gray-100"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-gray-800 bg-transparent text-white hover:bg-gray-900"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`backdrop-blur-md bg-gray-900/30 border border-white/10 rounded-lg shadow-lg p-4 sm:p-6 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300 ${
        todo.completed ? "opacity-50" : ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 border-2 border-transparent rounded-lg">
        <div className="absolute inset-0 border-2 border-purple-500/30 rounded-lg animate-scan" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative">
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggle}
            className="hover:opacity-80 transition-opacity hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
          >
            {todo.completed ? (
              <CheckCircleIcon className="w-6 h-6 text-green-400" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-gray-500" />
            )}
          </button>
          <h3
            className={`text-lg font-medium ${
              todo.completed ? "line-through text-gray-500" : "text-white"
            }`}
          >
            {todo.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <PencilIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
          >
            <TrashIcon className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-400">{todo.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            priorityStyles[todo.priority]
          }`}
        >
          {todo.priority}
        </span>
        {todo.dueDate && (
          <span className="text-sm text-gray-400">
            Due: {format(new Date(todo.dueDate), "MMM d, yyyy")}
          </span>
        )}
        {todo.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
