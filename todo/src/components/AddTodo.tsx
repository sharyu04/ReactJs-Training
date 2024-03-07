import { useState } from "react"
import { todoType } from "../App"

interface IProps { todoList: todoType[], addTask: (taskName: string) => void }
const AddTodo = ({ todoList, addTask }: IProps) => {
    const [str, setStr] = useState<string>('')
    const btnClickHandler = () => {
        if (str !== "") {
            addTask(str)
            setStr('')
        }
    }
    const handleChange = (e: any) => {
        setStr(e.target.value);
        console.log(e.target.value)
    }
    return (
        <div id="addTodo" className="w-2/5 m-auto">
            <input id="input" type="text" placeholder="Add your todo" name="input" className="p-px text-lg" value={str} onChange={handleChange} />
            <button id="addBtn" className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-4 border border-blue-500 hover:border-transparent rounded m-1" onClick={btnClickHandler}>Add</button>
        </div>
    )
}

export default AddTodo
