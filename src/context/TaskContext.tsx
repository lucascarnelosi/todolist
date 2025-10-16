import { createContext } from "react";
import type { TaskContextType } from "../types/task";

export const TaskContext = createContext<TaskContextType | undefined>(undefined);