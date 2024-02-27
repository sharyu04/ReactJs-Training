import Todo from "./Todo"
import { todoType } from "../App"

const TodoList = ({ todoArr, handleCheck, type }: { todoArr: todoType[], handleCheck: (id: number) => void, type: string }) => {
    return (
        <div id="todoList" className="mx-auto">
            <div id="heading" className="w-2/5 m-auto">
                <h1 className="text-xl font-bold">{type}</h1>
            </div>
            {todoArr.map(todoTask => {
                return <Todo task={todoTask.task} completed={todoTask.completed} />
            })}
        </div>
    )
}

export default TodoList
