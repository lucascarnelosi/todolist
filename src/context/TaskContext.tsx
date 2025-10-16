import { createContext, useState, type ReactNode } from "react";
import type { EditTaskProps, TaskContextType, TaskProps } from "../types/Task";
import { wordFormatter } from "../utils/wordFormatter";

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [currentTaskEditing, setCurrentTaskEditing] = useState<
    TaskProps["id"] | null
  >(null);

  function handleActiveTaskEditing(taskId: TaskProps["id"] | null) {
    setCurrentTaskEditing(taskId);
  }

  function addTask(value: string) {
    const tasksNames = tasks.map((task) => task.name);

    const taskAlreadyExists = tasksNames.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    if (taskAlreadyExists) {
      alert("Não foi possível adicionar a atividade.");

      return;
    }

    if (value) {
      setTasks((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: wordFormatter(value),
          done: false,
          editing: false,
        },
      ]);
    }
  }

  function editTask({ taskId, currentValue, newValue }: EditTaskProps) {
    if (currentValue === newValue) return true;

    const tasksNames = tasks.map((task) => task.name);

    const taskAlreadyExists = tasksNames.some(
      (item) => item.toLowerCase() === newValue.toLowerCase()
    );

    if (taskAlreadyExists) {
      alert("Não foi possível editar a atividade.");

      return false;
    }

    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, name: newValue } : task
    );

    setTasks(updatedTasks);

    return true;
  }

  function removeTask(taskId: TaskProps["id"]) {
    const newTasksArray = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasksArray);
  }

  function completeTask(taskId: TaskProps["id"]) {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task
    );

    setTasks(updatedTasks);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        currentTaskEditing,
        addTask,
        completeTask,
        editTask,
        removeTask,
        handleActiveTaskEditing,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
