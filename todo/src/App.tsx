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
         const updateArray = [...todoArr]
         updateArray[id].completed = !updateArray[id].completed
         setTodoArr(updateArray)
     }
 const removeTask = (idx:number)=>{
    setTodoArr([
        ...todoArr.slice(0,idx),
        ...todoArr.slice(idx+1,todoArr.length)
    ]);
 }
 const addTask = (taskName:string) => {
    setTodoArr([...todoArr,{task: taskName, completed: false}])
 }
return (
    <div>
        <AddTodo todoArr = {todoArr} addTask = {addTask}/>
        <TodoList todoArr = {todoArr} handleCheck = {handleCheck} type = {"Scheduled"} removeTask = {removeTask}/>
        <TodoList todoArr = {todoArr} handleCheck = {handleCheck} type = {"Completed"} removeTask = {removeTask}/>
    </div>
);
}

export default App
