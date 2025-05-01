import { useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTodos } from "../hooks/useTodos";
import { useTodoForm } from "../hooks/useTodoForm";

export const AddTodo = () => {
  const { createTodo } = useTodos();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      createTodo({ ...formState, completed: false });
      resetForm();
      setIsOpen(false);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 cyber-button relative group"
        onClick={() => setIsOpen(true)}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Add New Todo
        </span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-gray-900/30 border border-white/10 rounded-lg shadow-lg p-6 space-y-4 relative group hover:border-purple-500/50 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      <div className="relative z-10 space-y-4">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <XMarkIcon className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
          </button>
        </div>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg cyber-input text-white placeholder-gray-500 focus:outline-none transition-all duration-200"
          value={formState.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Enter todo title"
        />
        <textarea
          className="w-full px-4 py-2 rounded-lg cyber-input text-white placeholder-gray-500 focus:outline-none transition-all duration-200"
          value={formState.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Enter todo description"
          rows={3}
        />
        <select
          className="w-full px-4 py-2 rounded-lg cyber-input text-white placeholder-gray-500 focus:outline-none transition-all duration-200 [&>option]:bg-gray-900 [&>option]:text-white"
          value={formState.priority}
          onChange={(e) => updateField("priority", e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          className="w-full px-4 py-2 rounded-lg cyber-input text-white placeholder-gray-500 focus:outline-none transition-all duration-200"
          value={formState.dueDate || ""}
          onChange={(e) => updateField("dueDate", e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          {formState.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-sm font-medium bg-gray-800/50 text-gray-300 data-tag hover:bg-gray-700/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-2"
            >
              <span className="glitch-text">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-white transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-lg cyber-input text-white placeholder-gray-500 focus:outline-none transition-all duration-200"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tags (press Enter)"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cyber-button relative group ${
              isSubmitting ? "animate-loading" : ""
            }`}
          >
            <span className="relative z-10">
              {isSubmitting ? "Processing..." : "Add Todo"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};
