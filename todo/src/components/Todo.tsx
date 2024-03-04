import { Link } from "react-router-dom"

const Todo = ({task, completed, handleCheck, idx, removeTask}: {task: string, completed: boolean, handleCheck: (id: number) => void, idx: number, removeTask: (id: number) => void}) => {
    return (
        <div id="todoDiv" className="flex w-2/5 text-lg justify-between m-auto">
            <input type="checkbox" name="completed" id="completed" className="w-8 h-8 border-2 border-blue-500 rounded-sm m-1" checked = {completed} onChange={()=>{handleCheck(idx)}}/>
            <div id="task" className="w-full m-1">
                <Link to={`/todos/${idx}`} id="task">{task}</Link>
            </div>
            <button id="delete" className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-4 border border-blue-500 hover:border-transparent rounded m-1" onClick={()=>{removeTask(idx)}}>Delete</button>
        </div>
    )
}

export default Todo
