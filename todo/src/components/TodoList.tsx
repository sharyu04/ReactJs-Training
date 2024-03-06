import Todo from "./Todo"
import { todoType } from "../App"

const TodoList = ({ searchInp, todoArr, handleCheck, type, removeTask }: { searchInp: string, todoArr: todoType[], handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void, type: string, removeTask: (idx: number) => void }) => {
    return (
        <div id="todoList" className="mx-auto">
            <div id="heading" className="w-2/5 m-auto">
                <h1 className="text-xl font-bold">{type}</h1>
            </div>
            {todoArr.filter(todoTask => {
                return searchInp.toLowerCase() === "" ? todoTask : todoTask.task.toLowerCase().includes(searchInp.toLowerCase());
            }).map((todoTask, idx) => {
                if (type === "Completed") {
                    if (todoTask.completed)
                        return <Todo todoObj={todoTask} handleCheck={handleCheck} key={idx} removeTask={removeTask} />
                }
                else {
                    if (!todoTask.completed)
                        return <Todo todoObj={todoTask} handleCheck={handleCheck} key={idx} removeTask={removeTask} />
                }
            })}
        </div>
    )
}

export default TodoList

