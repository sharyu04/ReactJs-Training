import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useReducer, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { todoType } from "../App";
import { todoListType, url } from "../constants/task";
import TodoList from "./TodoList";
import useFetch from "./useFetch";
import 'react-toastify/dist/ReactToastify.css';

function Home() {

    const [searchInp, setSearchInp] = useState<string>("")
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSearchInp(e.target.value)
    }
    const [dropdownSort, setDropdownSort] = useState<Boolean>(false)
    const [dropdownFilter, setDropdownFilter] = useState<Boolean>(false)
    const [type, setType] = useState<string>(todoListType.all)

    const queryClient = useQueryClient()
    function reducer(page: number, action: string) {
        if (action === "Increment") {
            return page < 3 ?
                page + 1 :
                page;
        }
        else if (action === "Decrement") {
            return page > 1 ? page - 1 : page;
        }
        throw Error('Unknown action');
    }
    const [page, dispatch] = useReducer(reducer, 1)


    const [sortBy, setSortBy] = useState<string>(url.baseUrl)
    const {
        data,
        isFetching
    }: { data: todoType[]; isFetching: Boolean } = useFetch(sortBy, page, type);

    const handleCheck = async (id: number, task: string, dueDate: string, status: Boolean) => {
        const newData = {
            id: id,
            task: task,
            dueDate: dueDate,
            iscompleted: status
        }
        await axios.put<unknown>(`${url.baseUrl}/${id}`, newData).then(res => {
            queryClient.refetchQueries({
                queryKey: ["todoList"],
            })
        }).catch(err => toast(err))
    };
    const removeTask = async (id: number) => {
        await axios.delete(`${url.baseUrl}/${id}`).then(res => {
            queryClient.refetchQueries({
                queryKey: ["todoList"],
            })
        }).catch(err => alert(err))
    };
    const sortByDate = () => {
        setSortBy("Date")
    }
    const sortByTask = () => {
        setSortBy("Name")
    }

    return (
        <>
            <form className="w-2/5 mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search task ..." required value={searchInp} onChange={onSearchChange} />
                </div>
            </form>


            <div className="flex justify-end w-2/5 m-auto my-2.5">

                <div>

                    <button onClick={() => { setDropdownSort(!dropdownSort) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Sort By <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>

                    <div id="dropdown" className={`z-10 ${!dropdownSort ? "hidden" : ""} bg-white divide-y divide-gray-100 rounded-lg shadow absolute`}>
                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                            <li onClick={sortByDate} style={{ cursor: "pointer" }} >
                                <p className="block px-4 py-2 hover:bg-gray-100" >Date</p>
                            </li>
                            <li onClick={sortByTask} style={{ cursor: "pointer" }} >
                                <p className="block px-4 py-2 hover:bg-gray-100" >Task Name</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>

                    <button onClick={() => { setDropdownFilter(!dropdownFilter) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Filter<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    </button>

                    <div id="dropdown" className={`z-10 ${!dropdownFilter ? "hidden" : ""} bg-white divide-y divide-gray-100 rounded-lg shadow absolute`}>
                        <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                            <li onClick={() => {
                                setType(todoListType.all)
                                setDropdownFilter(!dropdownFilter)
                            }} style={{ cursor: "pointer" }} >
                                <p className="block px-4 py-2 hover:bg-gray-100" >All</p>
                            </li>
                            <li onClick={() => {
                                setType(todoListType.completed)
                                setDropdownFilter(!dropdownFilter)
                            }} style={{ cursor: "pointer" }} >
                                <p className="block px-4 py-2 hover:bg-gray-100" >Completed</p>
                            </li>
                            <li onClick={() => {
                                setType(todoListType.scheduled)
                                setDropdownFilter(!dropdownFilter)
                            }} style={{ cursor: "pointer" }} >
                                <p className="block px-4 py-2 hover:bg-gray-100" >Scheduled</p>
                            </li>
                        </ul>
                    </div>
                </div>



            </div>


            {
                (isFetching) ?
                    <h1 className="w-2/5 m-auto">Loading...</h1>
                    :
                    (
                        <TodoList
                            searchInp={searchInp}
                            todoList={data}
                            handleCheck={handleCheck}
                            type={type}
                            removeTask={removeTask}
                        />


                    )
            }
            <nav aria-label="Page navigation example" className="w-2/5 my-6 mx-auto">
                <ul className="flex items-center -space-x-px h-8 text-sm justify-end">
                    <li>
                        <button onClick={() => { dispatch("Decrement") }} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                            <span className="sr-only">Previous</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">{page}</button>
                    </li>
                    <li>
                        <button onClick={() => { dispatch("Increment") }} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                            <span className="sr-only">Next</span>
                            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
            <ToastContainer />
        </>
    );
}
export default Home
