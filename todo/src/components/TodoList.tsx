import Todo from "./Todo"
import { todoType } from "../App"
import { todoListType } from "../constants/task"

interface IProps {
    searchInp: string, 
    todoList: todoType[], 
    handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void, 
    type: string, 
    removeTask: (idx: number) => void 
}

const TodoList = ({searchInp, todoList, handleCheck, type, removeTask }: IProps) => {
    return (
        <div id="todoList" className="mx-auto">
            <div id="heading" className="w-2/5 m-auto">
                <h1 className="text-xl font-bold">{type}</h1>
            </div>
            { todoList.filter(todoTask => {
                return searchInp.toLowerCase() === "" ? todoTask : todoTask.task.toLowerCase().includes(searchInp.toLowerCase());
            }).map((todoTask, idx) => {
                return type === todoListType.completed ? (
                    todoTask.iscompleted ?
                    <Todo todoObj={todoTask} handleCheck={handleCheck} key={idx} removeTask={removeTask} /> : <></>
                )
                    :
                   ( !todoTask.iscompleted ?   <Todo todoObj={todoTask} handleCheck={handleCheck} key={idx} removeTask={removeTask} /> : <></> )
            })}
        </div>
    )
}

export default TodoList

