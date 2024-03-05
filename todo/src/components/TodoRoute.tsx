import { useParams } from "react-router-dom"
import { todoType } from "../App"
import Todo from "./Todo";
function TodoRoute({todoArr, handleCheck, removeTask}:{todoArr:todoType[], handleCheck:(id:number)=>void, removeTask:(id: number)=>void }){
 const params = useParams();
 const id = Number(params.id) 
 return(
    <Todo task={todoArr[id].task} dueDate={todoArr[id].dueDate} completed={todoArr[id].completed} handleCheck={handleCheck} idx={id} removeTask={removeTask}/>
 )
    }
    export default TodoRoute
