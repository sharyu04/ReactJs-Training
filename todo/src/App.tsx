import axios from "axios";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TodoRoute from "./components/TodoRoute";
import useFetch from "./components/useFetch";
import { url } from "./constants/task";
import { useQueryClient } from "@tanstack/react-query";

export type todoType = {
    id: number;
    task: string;
    dueDate: string;
    iscompleted: boolean;
};
function App() {
    const queryClient = useQueryClient()
    const [page, setPage] = useState<number>(0)
    const [sortBy, setSortBy] = useState<string>(url.baseUrl)
    const {
        data,
        isFetching
    }: { data: todoType[]; isFetching: Boolean} = useFetch(sortBy);

    const handleCheck = async (id: number, task: string, dueDate: string, status: Boolean) => {
        const newData = {
            id: id,
            task: task,
            dueDate: dueDate,
            iscompleted: status
        }
        await axios.put<unknown>(`${url.baseUrl}/${id}`, newData).then(res => {
            queryClient.refetchQueries({
                queryKey: ["todoList"],
            })
        }).catch(err => { alert(err) })
    };
    const removeTask = async (id: number) => {
        await axios.delete(`${url.baseUrl}/${id}`).then(res => {
            queryClient.refetchQueries({
                queryKey: ["todoList"],
            })
        }).catch(err => alert(err))
    };
    const addTask = (taskName: string, dueDate: string) => {
        const taskData = {
            id: data[data.length - 1].id + 1,
            task: taskName,
            dueDate: dueDate,
            iscompleted: false
        }
        const response = axios.post<unknown>(url.baseUrl, taskData)
        response.then(response => {
            queryClient.refetchQueries({
                queryKey: ["todoList"],
            })
        }).catch(err => {
            alert(err)
        })
    };
    const sortByDate = () => {
        setSortBy("Date")
    }
    const sortByTask = () => {
        setSortBy("Name")
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const prevPage = () => {
        setPage(page-1)
    }

    return (
        <>
            {
                (isFetching) ?
                    <h1 className="w-2/5 m-auto">Loading...</h1>
                    :
                    (
                        <BrowserRouter>
                            <Navbar/>
                            <Routes>
                                <Route path="/" element={<Home todoList={data} handleCheck={handleCheck} removeTask={removeTask} sortByDate={sortByDate} sortByTask={sortByTask}/>} />
                                <Route path="/addTodo" element={
                                    <AddTodo addTask={addTask} />}
                                />
                                <Route path="/todos/:id" element={<TodoRoute handleCheck={handleCheck} removeTask={removeTask} />} />
                            </Routes>
                        </BrowserRouter>
                    )
            }

        </>
    );
}

export default App;
