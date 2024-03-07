import { useParams } from "react-router-dom"
import { todoType } from "../App"
import Todo from "./Todo";
function TodoRoute({todoList, handleCheck, removeTask}:{todoList:todoType[], handleCheck:(id:number)=>void, removeTask:(id: number)=>void }){
 const params = useParams();
 const id = Number(params.id) 
 return(
    <Todo task={todoList[id].task} iscompleted={todoList[id].iscompleted} handleCheck={handleCheck} idx={id} removeTask={removeTask}/>
 )
    }
    export default TodoRoute
