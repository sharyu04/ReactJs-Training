import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TodoRoute from "./components/TodoRoute";
import useFetch from "./components/useFetch";

export type todoType = {
    task: string;
    dueDate: string;
    completed: boolean;
};

function App() {
    const [todoArr, setTodoArr] = useState<todoType[]>([]);
    const {
        data,
        loading,
        error,
    }: { data: todoType[]; loading: Boolean; error: Error | null } = useFetch(
        "http://localhost:8000/todo"
    );
    useEffect(() => {
        if (error !== null) {
            alert(error)
        } else {
            setTodoArr(data);
        }
    }, [data, error]);
    const handleCheck = (id: number) => {
        const updateArray = [...todoArr];
        updateArray[id].completed = !updateArray[id].completed;
        setTodoArr(updateArray);
    };
    const removeTask = (idx: number) => {
        setTodoArr([
            ...todoArr.slice(0, idx),
            ...todoArr.slice(idx + 1, todoArr.length),
        ]);
    };
    const addTask =  (taskName: string, dueDate: string) => {
        const taskData = {
            id: Math.floor(Math.random() * 100),
            task: taskName,
            dueDate: dueDate,
            completed: false
        }
        const response = axios.post<unknown>("http://localhost:8000/todo", taskData)
        response.then(response => {
            console.log(response)
            setTodoArr([...todoArr, { task: taskName, dueDate: dueDate, completed: false }]);
        }).catch(err => {
                alert(err)
            })
    };
    return (
        <div>
            {(() => {
                if (loading) {
                    return <h1 className="w-2/5 m-auto">Loading...</h1>;
                } else {
                    return (
                        <BrowserRouter>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Home todoArr={todoArr} handleCheck={handleCheck} removeTask={removeTask} />} />
                                <Route path="/addTodo" element={
                                    <AddTodo addTask={addTask} />}
                                />
                                <Route path="/todos/:id" element={<TodoRoute todoArr={todoArr} handleCheck={handleCheck} removeTask={removeTask} />} />
                            </Routes>
                        </BrowserRouter>
                    );
                }
            })()}

        </div>
    );
}

export default App;
