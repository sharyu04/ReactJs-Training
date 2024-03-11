import { useState } from "react";
import { todoType } from "../App";
import { todoListType } from "../constants/task";
import TodoList from "./TodoList";

interface IProps {
  todoList: todoType[],
  handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void,
  removeTask: (id: number) => void
  sortByDate: () => void,
  sortByTask: () => void,

}

function Home({ todoList, handleCheck, removeTask, sortByDate, sortByTask }: IProps) {

  const [searchInp, setSearchInp] = useState<string>("")
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInp(e.target.value)
  }
  const [dropdownSort, setDropdownSort] = useState<Boolean>(false)
  const [dropdownFilter, setDropdownFilter] = useState<Boolean>(false)
  const [type, setType] = useState<string>(todoListType.all)

  return (
    <>
      <form className="max-w-md mx-auto">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Mockups, Logos..." required value={searchInp} onChange={onSearchChange} />
        </div>
      </form>

      <button onClick={() => { setDropdownSort(!dropdownSort) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Sort By <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
      </svg>
      </button>

      <div id="dropdown" className={`z-10 ${!dropdownSort ? "hidden" : ""} bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
          <li onClick={sortByDate} style={{ cursor: "pointer" }} >
            <p className="block px-4 py-2 hover:bg-gray-100" >Date</p>
          </li>
          <li onClick={sortByTask} style={{ cursor: "pointer" }} >
            <p className="block px-4 py-2 hover:bg-gray-100" >Task Name</p>
          </li>
        </ul>
      </div>

      <button onClick={() => { setDropdownFilter(!dropdownFilter) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Filter<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
      </svg>
      </button>

      <div id="dropdown" className={`z-10 ${!dropdownFilter ? "hidden" : ""} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
          <li onClick={()=>{
            setType(todoListType.all)
            setDropdownFilter(!dropdownFilter)}} style={{ cursor: "pointer" }} >
            <p className="block px-4 py-2 hover:bg-gray-100" >All</p>
          </li>
          <li onClick={()=>{
            setType(todoListType.completed)
            setDropdownFilter(!dropdownFilter)}} style={{ cursor: "pointer" }} >
            <p className="block px-4 py-2 hover:bg-gray-100" >Completed</p>
          </li>
          <li onClick={()=>{
            setType(todoListType.scheduled)
            setDropdownFilter(!dropdownFilter)}} style={{ cursor: "pointer" }} >
            <p className="block px-4 py-2 hover:bg-gray-100" >Scheduled</p>
          </li>
        </ul>
      </div>

      <TodoList
        searchInp={searchInp}
        todoList={todoList}
        handleCheck={handleCheck}
        type={type}
        removeTask={removeTask}
      />
      
    </>
  );
}
export default Home
