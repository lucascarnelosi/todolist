import {
  Check,
  CircleX,
  Pencil,
  Square,
  SquareCheckBig,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import type { TaskProps } from "../types/Task";
import { wordFormatter } from "../utils/wordFormatter";

type TaskItemProps = {
  task: TaskProps;
};

export function Task({ task }: TaskItemProps) {
  const {
    completeTask,
    editTask,
    removeTask,
    currentTaskEditing,
    handleActiveTaskEditing,
  } = useTasks();
  const [inputTask, setInputTask] = useState(task.name);

  const isEditing = currentTaskEditing === task.id;

  function handleEditTask() {
    const isSuccess = editTask({
      taskId: task.id,
      currentValue: task.name,
      newValue: inputTask,
    });

    if (isSuccess) handleActiveTaskEditing(null);
  }

  function cancelEditing() {
    handleActiveTaskEditing(null);
    setInputTask(task.name);
  }

  return (
    <div className="flex items-center justify-between w-75 m-auto p-2">
      <div className="flex items-center gap-3">
        <button>
          {task.done ? (
            <SquareCheckBig
              onClick={() => completeTask(task.id)}
              className="rounded-full"
              cursor="pointer"
              color="#00ff00"
            />
          ) : (
            <Square
              onClick={() => completeTask(task.id)}
              color="#fff"
              cursor="pointer"
            />
          )}
        </button>
        {isEditing ? (
          <input
            type="text"
            name="editTxtName"
            id="editTxtId"
            size={18}
            maxLength={20}
            className="text-white"
            autoFocus
            value={inputTask}
            onChange={(e) => setInputTask(wordFormatter(e.target.value))}
          />
        ) : (
          <span className="text-white">{task.name}</span>
        )}
      </div>
      <div className="flex gap-4">
        {isEditing ? (
          <>
            <Check color="#ccc" cursor="pointer" onClick={handleEditTask} />

            <CircleX color="#9f0000" cursor="pointer" onClick={cancelEditing} />
          </>
        ) : (
          <>
            <Pencil
              color="#999"
              cursor="pointer"
              onClick={() => {
                setInputTask(task.name)
                handleActiveTaskEditing(task.id)
              }}
            />

            <Trash2
              color="#9f0000"
              cursor="pointer"
              onClick={() => removeTask(task.id)}
            />
          </>
        )}
      </div>
    </div>
  );
}
