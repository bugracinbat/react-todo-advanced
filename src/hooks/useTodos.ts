import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
} from "../store/todoSlice";
import { Todo } from "../store/todoSlice";

export const useTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);

  const createTodo = (todo: Omit<Todo, "id" | "createdAt">) => {
    dispatch(addTodo(todo));
  };

  const toggleTodoStatus = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const editTodo = (todo: Partial<Todo> & { id: string }) => {
    dispatch(updateTodo(todo));
  };

  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return {
    todos,
    createTodo,
    toggleTodoStatus,
    editTodo,
    removeTodo,
  };
};
