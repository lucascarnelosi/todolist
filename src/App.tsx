import { Task } from "./components/Task";
import { TaskInput } from "./components/TaskInput";
import { useTasks } from "./hooks/useTasks";

export default function App() {
  const { tasks } = useTasks();

  return (
    <div className="w-screen min-h-screen bg-zinc-900">
      <TaskInput />

      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
