import { useState } from "react";

interface Filters {
  status: "all" | "active" | "completed";
  priority: "" | "low" | "medium" | "high";
  tag: string;
}

type SortBy = "createdAt" | "priority" | "dueDate";

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    status: "all",
    priority: "",
    tag: "",
  });

  const [sortBy, setSortBy] = useState<SortBy>("createdAt");

  return {
    filters,
    setFilters,
    sortBy,
    setSortBy,
  };
};
