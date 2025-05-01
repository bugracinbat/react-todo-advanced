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

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <input
          type="text"
          className="input mb-2"
          value={formState.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <textarea
          className="input mb-2"
          value={formState.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
        <select
          className="input mb-2"
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
          className="input mb-2"
          value={formState.dueDate || ""}
          onChange={(e) => updateField("dueDate", e.target.value)}
        />
        <div className="flex gap-2">
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
          <button onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-4 bg-white rounded-lg shadow-md ${
        todo.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={handleToggle}>
            {todo.completed ? (
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            ) : (
              <XCircleIcon className="w-6 h-6 text-gray-400" />
            )}
          </button>
          <h3
            className={`text-lg font-medium ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <PencilIcon className="w-5 h-5 text-gray-500" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <TrashIcon className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-600">{todo.description}</p>
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span
          className={`px-2 py-1 rounded text-sm ${
            priorityColors[todo.priority]
          }`}
        >
          {todo.priority}
        </span>
        {todo.dueDate && (
          <span className="text-sm text-gray-500">
            Due: {format(new Date(todo.dueDate), "MMM d, yyyy")}
          </span>
        )}
        {todo.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
