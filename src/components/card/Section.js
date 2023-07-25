import React from 'react'
import Header from './Header'
import Task from './Task'
import toast from 'react-hot-toast'
import { useDrop } from 'react-dnd'

import './Section.css'

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  let text = "Todo";
  let bg = "bg-slate-500";
  let tasksToMap = todos

  if (status === "inprogress") {
    text = "In Progress"
    bg = "bg-purple-500"
    tasksToMap = inProgress
  }
  if (status === "closed") {
    text = "Closed"
    bg = "bg-green-500"
    tasksToMap = closed
  }

  const addItemToSection = (id) => {
    setTasks(prev => {
      const modifiedTask = prev.map(t => {
        if (t.id === id) {
          return { ...t, status: status }
        }
        return t
      })

      localStorage.setItem("tasks", JSON.stringify(modifiedTask))
      toast(`Task status changed to "${text}"`, { icon: "👍" })
      return modifiedTask
    })
  }

  return (
    <div>
      <div><Header text={text} bg={bg} count={tasksToMap.length} /></div>
      <div
        ref={drop}
        className={`w-64 min-h-[350px] max-h-[350px] overflow-y-auto rounded-md p-2 ${isOver ? "bg-slate-300" : "bg-slate-200"} custom-scrollbar`}
        //Change min or max h for adjusting box height
      > 
      
      
        {tasksToMap.length > 0 && tasksToMap.map(task => {
          return (
            <Task
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          )
        })}
      </div>
    </div>

  )
}

export default Section