import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify";
import { todoType } from "../App"
import Todo from "./Todo";
import 'react-toastify/dist/ReactToastify.css';

interface IProps { handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void, removeTask: (id: number) => void }
function TodoRoute({ handleCheck, removeTask }: IProps) {
    const [todoObj, setTodoObj] = useState<todoType>({
        id: 0,
        task: "",
        dueDate: "",
        iscompleted: false
    })
    const params = useParams();
    const id = Number(params.id)
    useEffect(() => {
        axios.get(`http://localhost:8000/todo/${id}`).then(res => {
            setTodoObj(res.data)
        }).catch(err => toast(err))
    }, [])
    return (
        <>
            <Todo todoObj={todoObj} handleCheck={handleCheck} key={todoObj?.id} removeTask={removeTask} />
            <ToastContainer />
        </>
    )
}
export default TodoRoute
