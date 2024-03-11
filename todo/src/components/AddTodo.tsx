import { useState } from "react"

interface IProps { addTask: (taskName: string, dueDate: string) => void }
const AddTodo = ({ addTask }: IProps) => {
    const [task, setTask] = useState<string>('')
    const[success,setSuccess] = useState<Boolean>(false)
    const [dueDate, setDueDate] = useState<string>("")
    const btnClickHandler = () => {
        if (task !== "" && dueDate !== "") {
            addTask(task, dueDate)
            setTask('')
           setSuccess(true)
            setTimeout(() => { setSuccess(false) }, 1000)
        }
    }
    const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    }
    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    }

    return (
        <div id="addTodo" className="w-2/5 m-auto">
            <input id="input" type="text" placeholder="Add your todo" name="input" className="p-px text-lg" value={task} onChange={handleChangeTask} />
            <input type="date" placeholder="Due date" name="dueDate" id="dueDate" className="p-px text-lg" value={dueDate} onChange={handleChangeDate} />
            <button id="addBtn" className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-4 border border-blue-500 hover:border-transparent rounded m-1" onClick={btnClickHandler}>Add</button>
            {success ? <h3> Todo added successfully </h3> : <></>}
        </div>
    )
}

export default AddTodo
