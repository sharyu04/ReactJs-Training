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
    const addTask = (taskName: string) => {
        setTodoArr([...todoArr, { task: taskName, completed: false }]);
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
                                    <AddTodo todoArr={todoArr} addTask={addTask} />}
                                />
                                <Route path="/todos/:id" element={<TodoRoute todoArr={todoArr} handleCheck={handleCheck} removeTask={removeTask}/>} />
                            </Routes>
                        </BrowserRouter>
                    );
                }
            })()}

        </div>
    );
}

export default App;
