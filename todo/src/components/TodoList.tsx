import Todo from "./Todo"
import { todoType } from "../App"

const TodoList = ({ todoArr, handleCheck, type, removeTask }: { todoArr: todoType[], handleCheck: (id: number) => void, type: string, removeTask: (idx: number) => void }) => {
    return (
        <div id="todoList" className="mx-auto">
            <div id="heading" className="w-2/5 m-auto">
                <h1 className="text-xl font-bold">{type}</h1>
            </div>
            {todoArr.map((todoTask,idx) => {
                if(type === "Completed"){
                    if(todoTask.completed)
                        return <Todo task={todoTask.task} dueDate={todoTask.dueDate} completed={todoTask.completed} handleCheck={handleCheck} idx={idx} key={idx} removeTask={removeTask} />
                }
                else{
                    if(!todoTask.completed)
                        return <Todo task={todoTask.task} dueDate={todoTask.dueDate} completed={todoTask.completed} handleCheck={handleCheck} idx={idx} key={idx} removeTask={removeTask}/>
                }
            })}
        </div>
    )
}

export default TodoList

