import type { Dispatch, SetStateAction } from "react";

export interface TaskProps {
  id: string,
  name: string,
  done: boolean,
  editing: boolean
}

export interface TaskContextType {
  tasks: TaskProps[];
  setTasks: Dispatch<SetStateAction<TaskProps[]>>;
}