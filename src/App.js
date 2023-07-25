import { useEffect, useState } from 'react';
import './App.css';
import CreateTask from './components/CreateTask';
import ListTasks from './components/ListTasks';
import { Toaster } from 'react-hot-toast';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSquareMinus,faSquarePlus } from '@fortawesome/free-regular-svg-icons';

// Add the icon to the library
library.add(faSquareMinus,faSquarePlus);

function App() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")))
  }, [])

  console.log("Tasks", tasks)
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="bg-white w-screen h-screen flex flex-col items-center p-3 pt-32 gap-16">
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider >
  );
}

export default App;
