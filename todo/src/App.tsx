import { useState } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

export type todoType = {
        task: string;
        completed : boolean
    }
    
function App() {
    const [todoArr, setTodoArr] = useState<todoType[]>([
        {
            task: "Task1",
            completed: false
        },
        {
            task: "Task2",
            completed: false
        },
        {
            task: "Task3",
            completed: true
        }
        ])

 const handleCheck = (id: number) => {
         const updateArray = {...todoArr}
         updateArray[id].completed = !updateArray[id].completed
         setTodoArr(updateArray)
     }
return (
    <div>
        <AddTodo />
        <TodoList todoArr = {todoArr} handleCheck = {handleCheck} type = {"Scheduled"} />
        <TodoList todoArr = {todoArr} handleCheck = {handleCheck} type = {"Completed"} />
    </div>
);
}

export default App
