import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setFilter } from "../store/todoSlice";
import { Todo } from "../store/todoSlice";

export const useFilters = () => {
  const dispatch = useDispatch();
  const { filter, tags } = useSelector((state: RootState) => state.todos);

  const updateFilter = (key: string, value: any) => {
    dispatch(setFilter({ [key]: value }));
  };

  const filterTodos = (todos: Todo[]) => {
    return todos.filter((todo) => {
      const matchesStatus =
        filter.status === "all" ||
        (filter.status === "completed" && todo.completed) ||
        (filter.status === "active" && !todo.completed);

      const matchesPriority =
        filter.priority === "all" || todo.priority === filter.priority;

      const matchesSearch =
        filter.search === "" ||
        todo.title.toLowerCase().includes(filter.search.toLowerCase()) ||
        todo.description.toLowerCase().includes(filter.search.toLowerCase());

      const matchesTags =
        filter.tags.length === 0 ||
        filter.tags.every((tag) => todo.tags.includes(tag));

      return matchesStatus && matchesPriority && matchesSearch && matchesTags;
    });
  };

  const toggleTag = (tag: string) => {
    const newTags = filter.tags.includes(tag)
      ? filter.tags.filter((t) => t !== tag)
      : [...filter.tags, tag];
    updateFilter("tags", newTags);
  };

  return {
    filter,
    tags,
    updateFilter,
    filterTodos,
    toggleTag,
  };
};
