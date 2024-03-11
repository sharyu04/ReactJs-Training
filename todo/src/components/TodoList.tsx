import Todo from "./Todo"
import { todoType } from "../App"
import { todoListType } from "../constants/task"
import React from "react"

interface IProps {
    searchInp: string,
    todoList: todoType[],
    handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void,
    type: string,
    removeTask: (idx: number) => void
}

const TodoList = ({ searchInp, todoList, handleCheck, type, removeTask }: IProps) => {
    return (
        <div id="todoList" className="mx-auto">
            <div id="heading" className="w-2/5 m-auto">
                <h1 className="text-xl font-bold">{type}</h1>
            </div>
            {todoList.filter(todoTask => {
                return searchInp.toLowerCase() === "" ? todoTask : todoTask.task.toLowerCase().includes(searchInp.toLowerCase());
            }).map((todoTask, idx) => {
                switch(type){
                    case todoListType.completed:
                        return todoTask.iscompleted ? <Todo key={idx} todoObj={todoTask} handleCheck={handleCheck} removeTask={removeTask} /> : <></>
                    case todoListType.scheduled:
                        return !todoTask.iscompleted ? <Todo key={idx} todoObj={todoTask} handleCheck={handleCheck} removeTask={removeTask} /> : <></>
                    default: 
                        return <Todo key={idx} todoObj={todoTask} handleCheck={handleCheck} removeTask={removeTask} />
                }
            })}
        </div>
    )
}

export default TodoList


