import { Plus } from "lucide-react";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { wordFormatter } from "../utils/wordFormatter";

export function TaskInput() {
  const { addTask } = useTasks();
  const [inputTextTask, setInputTextTask] = useState("");

  function handleAddTask() {
    addTask(inputTextTask);

    setInputTextTask("");
  }

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <h1 className="text-5xl text-blue-300">ToDoList</h1>
      <div className="flex items-center justify-center gap-4 py-10">
        <input
          type="text"
          name="nametxt"
          id="idtxt"
          size={40}
          maxLength={20}
          className="bg-white p-1 m-0"
          value={inputTextTask}
          placeholder="Digite sua nova atividade..."
          onChange={(e) => setInputTextTask(wordFormatter(e.target.value))}
        />
        <button
          className="flex items-center justify-center bg-blue-700 text-white text-2xl size-9 hover:bg-blue-800 rounded-2xl"
          type="submit"
          onClick={handleAddTask}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}
