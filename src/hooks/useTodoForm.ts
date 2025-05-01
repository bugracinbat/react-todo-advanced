import { useState } from "react";
import { Todo } from "../store/todoSlice";

export interface TodoFormState {
  title: string;
  description: string;
  priority: Todo["priority"];
  dueDate: string | null;
  tags: string[];
}

const initialFormState: TodoFormState = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: null,
  tags: [],
};

export const useTodoForm = (initialState?: Partial<TodoFormState>) => {
  const [formState, setFormState] = useState<TodoFormState>({
    title: initialState?.title || "",
    description: initialState?.description || "",
    priority: initialState?.priority || "medium",
    dueDate: initialState?.dueDate || null,
    tags: initialState?.tags || [],
  });
  const [newTag, setNewTag] = useState("");

  const updateField = (field: keyof TodoFormState, value: any) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      if (!formState.tags.includes(newTag.trim())) {
        updateField("tags", [...formState.tags, newTag.trim()]);
      }
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateField(
      "tags",
      formState.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setNewTag("");
  };

  const validateForm = () => {
    return formState.title.trim() !== "";
  };

  return {
    formState,
    newTag,
    setNewTag,
    updateField,
    handleAddTag,
    removeTag,
    resetForm,
    validateForm,
  };
};
