import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import type { TaskContextType } from "../types/Task";

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de um ProductProvider");
  }
  return context;
};