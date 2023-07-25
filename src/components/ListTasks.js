import React, { useEffect, useState } from 'react'
import Section from './card/Section'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ListTasks = ({ tasks, setTasks }) => {

  const [todos, setTodos] = useState([])
  const [inProgress, setInProgress] = useState([])
  const [closed, setClosed] = useState([])

  const [statuses] = useState(["todo", "inprogress","closed"]);

  useEffect(() => {
    const filter_Todos = tasks.filter(task => task.status === "todo");
    const filter_InProgress = tasks.filter(task => task.status === "inprogress");
    const filter_Closed = tasks.filter(task => task.status === "closed");

    setTodos(filter_Todos);
    setInProgress(filter_InProgress);
    setClosed(filter_Closed);

  }, [tasks])
  
  const handleClick = () => {
    
  };
  

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
     <button className='w-64 rounded-md p-2 bg-slate-50 hover:bg-slate-100' onClick={handleClick}>
     <FontAwesomeIcon icon="fa-regular fa-square-plus" size='3x' color='#e5e5e5'/>
     </button>
    </div>
  )
}

export default ListTasks