import React from 'react'
import Header from './Header'
import Task from './Task'
import  toast  from 'react-hot-toast'
import { useDrag, useDrop } from 'react-dnd'

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "task",
      drop: (item)=> addItemToSection(item.id),
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
      setTasks(prev=>{
        const modifiedTask = prev.map(t=>{
          if(t.id===id){
            return {...t,status:status}
          }
          return t
        })
  
        localStorage.setItem("tasks",JSON.stringify(modifiedTask))
        toast(`Task status changed to "${text}"`,{icon:"👍"})
        return modifiedTask
      })
    }
  
    return (
      <div ref={drop} className={`w-64 min-h-[350px] rounded-md p-2 ${isOver ? "bg-slate-200":"bg-slate-100"}`}>
        <Header text={text} bg={bg} count={tasksToMap.length} />
  
        {tasksToMap.length > 0 && tasksToMap.map(task => {
          return(
            <Task
            key={task.id}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
          />
          )
        })}
      </div>
    )
  }

export default Section