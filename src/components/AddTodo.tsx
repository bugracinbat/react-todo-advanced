import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTodos } from "../hooks/useTodos";
import { useTodoForm } from "../hooks/useTodoForm";

export const AddTodo = () => {
  const { createTodo } = useTodos();
  const [isOpen, setIsOpen] = useState(false);
  const {
    formState,
    newTag,
    setNewTag,
    updateField,
    handleAddTag,
    removeTag,
    resetForm,
    validateForm,
  } = useTodoForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createTodo({ ...formState, completed: false });
      resetForm();
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-white bg-white text-black hover:bg-gray-100 flex items-center justify-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon className="w-5 h-5" />
        Add New Todo
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-6 space-y-4 relative"
    >
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 hover:bg-white/5 rounded-lg transition-colors"
      >
        <XMarkIcon className="w-5 h-5 text-gray-400" />
      </button>
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
      <select
        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200 [&>option]:bg-gray-900 [&>option]:text-white"
        value={formState.priority}
        onChange={(e) => updateField("priority", e.target.value)}
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
      <div className="flex flex-wrap gap-2">
        {formState.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-200"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add tags (press Enter)"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg font-medium transition-all duration-200 border border-white bg-white text-black hover:bg-gray-100"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};
