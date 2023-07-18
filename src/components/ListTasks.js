import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  toast  from 'react-hot-toast'
import { useDrag, useDrop } from 'react-dnd'

const ListTasks = ({ tasks, setTasks }) => {

  const [todos, setTodos] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [closed, setClosed] = useState([])

  useEffect(() => {
    const filter_Todos = tasks.filter(task => task.status === "todo");
    const filter_InProgress = tasks.filter(task => task.status === "inprogress");
    const filter_Closed = tasks.filter(task => task.status === "closed");

    setTodos(filter_Todos);
    setInProgress(filter_InProgress);
    setClosed(filter_Closed);

  }, [tasks])

  const statuses = ["todo", "inprogress", "closed"]

  return (
    <div className='flex gap-16'>
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed} />
      ))}
    </div>
  )
}

export default ListTasks

//Components CARD

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

const Header = ({ text, bg, count }) => {
  return (
    <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
      {text}
      <div className="ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  )
}

const Task = ({task,tasks,setTasks}) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: {id: task.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  console.log(isDragging)

  const handleRemove = (id) =>{
    const filter_task = tasks.filter(t=> t.id !== id)

    localStorage.setItem("tasks",JSON.stringify(filter_task))
    setTasks(filter_task)
    toast.success("Task removed")
  }
  return (
    <div 
    ref={drag} 
    className= {`relative p-1 mt-2 bg-slate-50 shadow-md rounded-md cursor-grab flex items-center ${
      isDragging ? "opacity-25" : "opacity-100"
    }`}
    >
  <p className='flex-grow'>{task.name}</p>
  <button 
  className='ml-auto' 
  onClick={()=>{handleRemove(task.id)}}>
    <FontAwesomeIcon icon="fa-regular fa-square-minus" size='lg' color='grey'/>
  </button>
</div>
  )
}