import axios from "axios";
import { useEffect, useState } from "react";
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
    const [todoList, setTodoList] = useState<todoType[]>([]);
    const {
        data,
        isFetching,
        error,
    }: { data: todoType[]; isFetching: Boolean; error: Error | null } = useFetch(url.baseUrl);
    const [searchInp, setSearchInp] = useState<string>("")
    useEffect(() => {
        console.log("isFetching: ", isFetching)
        if (error !== null) {
            console.log("error: ", error)
            alert(error)
        } else {
            console.log("data: ", data)
            setTodoList(data);
        }
    }, [data, error]);
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
            id: todoList[todoList.length - 1].id + 1,
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
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchInp(e.target.value)
    }
    const sortByDate = () => {
        const sortedData = [...todoList].sort((a: todoType, b: todoType) => {
            return (new Date(a.dueDate) > new Date(b.dueDate)) ? 1 :
                ((new Date(a.dueDate) < new Date(b.dueDate)) ? -1 :
                    0)
        });
        setTodoList(sortedData)
    }
    const sortByTask = () => {
        const sortedData = [...todoList].sort((a: todoType, b: todoType) => {
            return (a.task > b.task) ? 1 :
                ((a.task < b.task) ? -1 :
                    0)
        });
        setTodoList(sortedData)
    }



    return (
        <>
            {
                (isFetching) ?
                    <h1 className="w-2/5 m-auto">Loading...</h1>
                    :
                    (
                        <BrowserRouter>
                            <Navbar sortByDate={sortByDate} sortByTask={sortByTask} searchInp={searchInp} onSearchChange={onSearchChange} />
                            <Routes>
                                <Route path="/" element={<Home searchInp={searchInp} todoList={todoList} handleCheck={handleCheck} removeTask={removeTask} />} />
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
