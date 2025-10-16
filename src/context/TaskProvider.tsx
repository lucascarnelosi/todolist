import { TaskContext } from "./TaskContext";
import type { TaskProps } from "../types/task";
import { useState, type ReactNode } from "react";

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};