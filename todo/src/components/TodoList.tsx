import Todo from "./Todo"
import { todoType } from "../App"
import { todoListType } from "../constants/task"

interface IProps { todoList: todoType[], handleCheck: (id: number) => void, type: string, removeTask: (idx: number) => void }

const TodoList = ({ todoList, handleCheck, type, removeTask }: IProps) => {
    return (
        <div id="todoList" className="mx-auto">
            <div id="heading" className="w-2/5 m-auto">
                <h1 className="text-xl font-bold">{type}</h1>
            </div>
            {todoList.map((todoTask, idx) => {
                console.log(todoTask)
                return type === todoListType.completed ? (
                    todoTask.iscompleted ?
                        <Todo task={todoTask.task} dueDate={todoTask.dueDate} iscompleted={todoTask.iscompleted} handleCheck={handleCheck} idx={idx} key={idx} removeTask={removeTask} /> : <></>
                )
                    :
                   ( !todoTask.iscompleted ?  < Todo task={todoTask.task} dueDate={todoTask.dueDate} iscompleted={todoTask.iscompleted} handleCheck={handleCheck} idx={idx} key={idx} removeTask={removeTask} /> : <></> )
            })}
        </div>
    )
}

export default TodoList

