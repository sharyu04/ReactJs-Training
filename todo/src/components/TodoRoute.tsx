import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { todoType } from "../App"
import Todo from "./Todo";
function TodoRoute({ handleCheck, removeTask }: { handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void, removeTask: (id: number) => void }) {
    const [todoObj, setTodoObj] = useState<todoType>({
        id: 0,
        task: "",
        dueDate: "",
        completed: false
    })
    const params = useParams();
    const id = Number(params.id)
    useEffect(() => {
        axios.get(`http://localhost:8000/todo/${id}`).then(res => {
            console.log(res.data)
            setTodoObj(res.data)
        }).catch(err => alert(err))
    },[])
    return (
        <Todo todoObj={todoObj} handleCheck={handleCheck} key={todoObj?.id} removeTask={removeTask} />
    )
}
export default TodoRoute
