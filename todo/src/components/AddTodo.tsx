const AddTodo = () => {
    return(
    <div id="addTodo"className="w-2/5 m-auto">
        <input id="input" type="text" placeholder="Add your todo" name="input" className="p-px text-lg"  />
        <button id="addBtn" className="h-8 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white px-4 border border-blue-500 hover:border-transparent rounded m-1">Add</button>
    </div>
    )
}

export default AddTodo
