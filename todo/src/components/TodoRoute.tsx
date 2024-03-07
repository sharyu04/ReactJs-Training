import { useParams } from "react-router-dom"
import { todoType } from "../App"
import Todo from "./Todo";

interface IProps{ todoList: todoType[], handleCheck: (id: number) => void, removeTask: (id: number) => void }
function TodoRoute({ todoList, handleCheck, removeTask }:IProps ) {
    const params = useParams();
    const id = Number(params.id)
    return (
        <Todo task={todoList[id].task} dueDate={todoList[id].dueDate} iscompleted={todoList[id].iscompleted} handleCheck={handleCheck} idx={id} removeTask={removeTask} />
    )
}
export default TodoRoute
