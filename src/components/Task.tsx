import { useState } from "react"
import { useTasks } from '../hooks/useTasks'
import type { TaskProps } from '../types/task'
import { wordFormatter } from '../utils/wordFormatter'
import { SquareCheckBig, Square, CircleX, Pencil, Check, Trash2 } from 'lucide-react'

export function Task(p: TaskProps) {
  const { tasks, setTasks } = useTasks()
  const [inputTask, setInputTask] = useState(p.name)
  const [isEditing, setIsEditing] = useState(false)

  function completeTask() {
    setTasks(prev => 
      prev.map(task => 
        task.id === p.id
        ? { ...task, done: !task.done }
        : task
      )
    )
  }

  function removeTask() {
    const newTasksArray = tasks.filter(task => task.name !== p.name)

    setTasks(newTasksArray)
  }

  function editTask() {
    const tasksNames = tasks.map(task => task.name)
    const isTaskExist = tasksNames.some(task => task == inputTask)

    setIsEditing(prev => !prev)
    
    if (isTaskExist || !inputTask.trim()) {
      alert('Não foi possível editar a atividade.')
      
      return;
    }

    setTasks(prev => 
      prev.map(task => 
        task.id === p.id
        ? { ...task,
            name: inputTask,
          }
        : task
      )
    )
  }

  return (
    <div className="flex items-center justify-between w-75 m-auto p-2">
      <div className="flex items-center gap-3">
        <button>
          {p.done
          ? <SquareCheckBig
              onClick={completeTask}
              className="rounded-full"
              cursor="pointer"
              color="#00ff00"
            />
          : <Square
              onClick={completeTask}
              color="#fff"
              cursor="pointer"
            />
          }
        </button>
        {isEditing
        ? <input
            type="text"
            name="editTxtName"
            id="editTxtId"
            size={18}
            maxLength={20}
            className="text-white"
            autoFocus
            value={inputTask}
            onChange={e => setInputTask(wordFormatter(e.target.value))}
          />
        : <div className="text-white">
            {p.name}
          </div>
        }
      </div>
      <div className="flex gap-4">
        {isEditing
        ? <>
            <Check
              color="#ccc"
              cursor="pointer"
              onClick={editTask}
            />
            <CircleX
              color="#9f0000"
              cursor="pointer"
              onClick={() => {
                setInputTask(p.name)
                setIsEditing(prev => !prev)
              }}
            />
          </>
        : <>
            <Pencil
              color="#999"
              cursor="pointer"
              onClick={() => {
                setInputTask(p.name)
                setIsEditing(prev => !prev)
              }}
            />
            <Trash2
              color="#9f0000"
              cursor="pointer"
              onClick={removeTask}
            />
          </>
        }
      </div>
    </div>
  )
}