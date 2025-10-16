import { useState } from "react"
import { useTasks } from '../hooks/useTasks'
import type { TaskProps } from '../types/Task'
import { wordFormatter } from '../utils/wordFormatter'
import { SquareCheckBig, Square, CircleX, Pencil, Check } from 'lucide-react'

export function Task(p: TaskProps) {
  const { tasks, setTasks } = useTasks()
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
    // const tasksNamesArray = tasks.map(task => task.name)
    // const othersTasksNames = tasksNamesArray.filter(tasksNames => tasksNames !== inputTask)
    
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
          ? <SquareCheckBig
              onClick={done}
              className="rounded-full"
              cursor="pointer"
              color="#00ff00"
            />
          : <Square
              onClick={done}
              color="#fff"
              cursor="pointer"
            />
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
            onChange={e => setInputTask(wordFormatter(e.target.value))}
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