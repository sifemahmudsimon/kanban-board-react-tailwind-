import React, { useEffect, useState } from 'react'
import Section from './card/Section'


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