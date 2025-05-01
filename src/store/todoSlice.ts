import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string | null;
  tags: string[];
  createdAt: string;
}

interface TodoState {
  todos: Todo[];
  filter: {
    status: "all" | "active" | "completed";
    priority: "all" | "low" | "medium" | "high";
    search: string;
    tags: string[];
  };
  tags: string[];
}

const initialState: TodoState = {
  todos: [],
  filter: {
    status: "all",
    priority: "all",
    search: "",
    tags: [],
  },
  tags: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Omit<Todo, "id" | "createdAt">>) => {
      const newTodo: Todo = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);

      // Add new tags to the tags list
      action.payload.tags.forEach((tag) => {
        if (!state.tags.includes(tag)) {
          state.tags.push(tag);
        }
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<Partial<Todo> & { id: string }>
    ) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...action.payload };

        // Update tags list
        const allTags = new Set(state.todos.flatMap((todo) => todo.tags));
        state.tags = Array.from(allTags);
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);

      // Update tags list
      const allTags = new Set(state.todos.flatMap((todo) => todo.tags));
      state.tags = Array.from(allTags);
    },
    setFilter: (state, action: PayloadAction<Partial<TodoState["filter"]>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { addTodo, toggleTodo, updateTodo, deleteTodo, setFilter } =
  todoSlice.actions;
export default todoSlice.reducer;
