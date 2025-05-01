import { useState } from "react";
import { Todo } from "../store/todoSlice";

interface TodoFormState {
  title: string;
  description: string;
  priority: Todo["priority"];
  dueDate: string;
  tags: string[];
  completed: boolean;
}

const initialFormState: TodoFormState = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
  tags: [],
  completed: false,
};

export const useTodoForm = (initialState: Partial<TodoFormState> = {}) => {
  const [formState, setFormState] = useState<TodoFormState>({
    ...initialFormState,
    ...initialState,
  });
  const [newTag, setNewTag] = useState("");

  const updateField = <K extends keyof TodoFormState>(
    field: K,
    value: TodoFormState[K]
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
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
    return formState.title.trim().length > 0;
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
