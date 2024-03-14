import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { url } from "../constants/task"
import "react-toastify/dist/ReactToastify.css";

const AddTodo = () => {
    const queryClient = useQueryClient()
    const [task, setTask] = useState<string>('')
    const [dueDate, setDueDate] = useState<string>("")
    const btnClickHandler = () => {
        if (task !== "" && dueDate !== "") {
            addTask(task, dueDate)
            setTask('')
        }
    }
    const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    }
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    }
    const addTask = (taskName: string, dueDate: string) => {
        const taskData = {
            task: taskName,
            dueDate: dueDate,
            iscompleted: false
        }
        const response = axios.post<unknown>(url.baseUrl, taskData)
        response.then(response => {
            queryClient.refetchQueries({
                queryKey: ["todoList"],
            })
            return toast("Todo added successfully!");
        }).catch(err => {
            return toast(err);
        })
    };

    return (
        <div id="addTodo" className="w-2/5 m-auto">
            <input id="input" type="text" placeholder="Add your todo" name="input" className="p-2 mr-5 rounded-2xl border-2 border-slate-400 text-lg" value={task} onChange={handleChangeTask} />
            <input type="date" placeholder="Due date" name="dueDate" id="dueDate" className="p-px text-lg" value={dueDate} onChange={handleChangeDate} />
            <button id="addBtn" className="h-8 mx-5 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-4 border border-blue-500 hover:border-transparent rounded m-1" onClick={btnClickHandler}>Add</button>
            <ToastContainer/>
        </div>
    )
}

export default AddTodo

