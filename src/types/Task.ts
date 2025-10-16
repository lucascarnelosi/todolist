export interface TaskProps {
  id: string;
  name: string;
  done: boolean;
}

export interface EditTaskProps {
  taskId: TaskProps["id"];
  currentValue: string;
  newValue: string;
}

export interface TaskContextType {
  tasks: TaskProps[];
  currentTaskEditing: TaskProps["id"] | null;
  addTask: (newValue: string) => void;
  editTask: (props: EditTaskProps) => boolean;
  removeTask: (id: TaskProps["id"]) => void;
  completeTask: (id: TaskProps["id"]) => void;
  handleActiveTaskEditing: (id: TaskProps["id"] | null) => void;
}
