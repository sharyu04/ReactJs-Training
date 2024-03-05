import { Link } from "react-router-dom"
import { todoType } from "../App"

const Todo = ({todoObj, handleCheck, removeTask }: { todoObj:todoType ,handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void, removeTask: (id: number) => void }) => {
    return (
        <div id="todoDiv" className="flex w-2/5 text-lg justify-between m-auto">
            <input type="checkbox" name="completed" id="completed" className="w-8 h-8 border-2 border-blue-500 rounded-sm m-1" checked={todoObj.completed} onChange={() => { handleCheck(todoObj.id, todoObj.task, todoObj.dueDate, !todoObj.completed) }} />
            <div id="task" className="w-full m-1">
                <Link to={`/todos/${todoObj.id}`} id="task">{todoObj.task}</Link>
            </div>
            <div id="dueDate" className="w-full m-1">
                <p id="task">{`Due Date: ${todoObj.dueDate}`}</p>
            </div>
            <button id="delete" className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-4 border border-blue-500 hover:border-transparent rounded m-1" onClick={() => { removeTask(todoObj.id) }}>Delete</button>
        </div>
    )
}

export default Todo
