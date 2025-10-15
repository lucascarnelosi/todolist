import { Plus, SquareCheckBig, Square, CircleX, Pencil, Check } from 'lucide-react'
import { useState } from 'react'

interface TaskProps {
  id: string,
  name: string,
  done: boolean,
  editing: boolean
}

function wordFormatter(word: String) {
  const wordFormatted = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

  return wordFormatted
}

export default function App() {
  const [tasks, setTasks] = useState<Array<TaskProps>>([])

  function TaskInput() {
    const [inputTextTask, setInputTextTask] = useState('')

    function addTask() {
      const tasksNames = tasks.map(task => task.name).toString()
      
      if(tasksNames.toLowerCase().includes(inputTextTask.toLowerCase())) {
        alert('Não foi possível adicionar a atividade.')
        setInputTextTask('')

        return
      }

      if(inputTextTask) {
        setTasks(prev => [
          ...prev,
          {
            id: crypto.randomUUID(),
            name: wordFormatter(inputTextTask),
            done: false,
            editing: false,
          }
        ])
      }
    }

    return (
      <div className="flex items-center justify-center gap-4 py-10">
        <input
          type="text"
          name="nametxt"
          id="idtxt"
          size={40}
          className="bg-white p-1 m-0"
          value={inputTextTask}
          placeholder="Digite sua nova atividade..."
          onChange={(e) => setInputTextTask(e.target.value)}
        />
        <button
          className="flex items-center justify-center bg-blue-700 text-white text-2xl size-9 hover:bg-blue-800 rounded-2xl"
          type="submit"
          onClick={addTask}
        >
          <Plus />
        </button>
      </div>
    )
  }

  function Task(p: TaskProps) {
    const [check, setCheck] = useState(p.done)
    const [inputTask, setInputTask] = useState(p.name)

    function done() {
      setCheck(prev => !prev)
      setTasks(prev => 
        prev.map(t => 
          t.id === p.id
          ? { ...t, done: !t.done }
          : t
        )
      )
    }

    function removeTask() {
      const newTasksArray = tasks.filter(t => t.name !== p.name)

      setTasks(newTasksArray)
    }

    function editTask() {
      setTasks(prev => 
        prev.map(t => 
          t.id === p.id
          ? { ...t,
              name: inputTask,
              editing: !p.editing
            }
          : t
        )
      )
    }

    return (
      <div className="flex items-center justify-between w-75 m-auto p-2">
        <div className="flex items-center gap-3">
          <button>
            {check
            ? <SquareCheckBig onClick={done} className="rounded-full" cursor="pointer" color="#00ff00" />
            : <Square onClick={done} className="rounded-full" color="#fff" cursor="pointer" />
            }
          </button>
          {p.editing
          ? <input
              type="text"
              name="editTxtName"
              id="editTxtId"
              size={18}
              className="text-white"
              autoFocus
              value={inputTask}
              onChange={e => setInputTask(e.target.value)}
              onBlur={editTask}
            />
          : <div className="text-white">
              {inputTask}
            </div>
          }
        </div>
        <div className="flex gap-4">
          {p.editing
          ? <Check
              color="#ccc"
              cursor="pointer"
              onClick={editTask}
            />
          : <Pencil
              color="#999"
              cursor="pointer"
              onClick={editTask}
            />
          }
          <CircleX
            color="#9f0000"
            cursor="pointer"
            onClick={removeTask}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen min-h-screen bg-zinc-900">
      <div className="flex flex-col items-center justify-center pt-5">
        <h1 className="text-5xl text-blue-300">ToDoList</h1>
        <TaskInput />
      </div>
      
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            done={task.done}
            editing={task.editing}
          />
        )
      })}
    </div>
  );
}