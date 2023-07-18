import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDrag, useDrop } from 'react-dnd'
import  toast  from 'react-hot-toast'

const Task = ({task,tasks,setTasks}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
      type: "task",
      item: {id: task.id},
      collect: (monitor) => ({
        isDragging
        : !!monitor.isDragging()
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

export default Task