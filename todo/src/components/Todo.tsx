
const Todo = ({task, completed}: {task: string, completed: boolean}) => {
    return (
        <div id="todoDiv" className="flex w-2/5 text-lg justify-between m-auto">
            <input type="checkbox" id="completed" className="w-8 h-8 border-2 border-blue-500 rounded-sm m-1" />
            <div id="task" className="w-full m-1">
                <h1 id="task">Task 1</h1>
            </div>
            <button id="delete" className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-4 border border-blue-500 hover:border-transparent rounded m-1">Delete</button>
        </div>
    )
}

export default Todo

