import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import type { TaskContextType } from "../types/task";

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks deve ser usado dentro de um TaskProvider");
  }
  return context;
};