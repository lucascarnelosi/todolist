import { Task } from './components/Task'
import { useTasks } from './hooks/useTasks';
import { TaskInput } from './components/TaskInput'

export default function App() {
  const { tasks } = useTasks();

  return (
    <div className="w-screen min-h-screen bg-zinc-900">
      <TaskInput />
      
      {tasks.map(task => 
        <Task
          key={task.id}
          id={task.id}
          name={task.name}
          done={task.done}
        />
      )}
    </div>
  );
}