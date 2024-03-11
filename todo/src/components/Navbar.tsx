import { useState } from "react";
import { Link } from "react-router-dom";

interface IProps { sortByDate: () => void, sortByTask: () => void, searchInp: string, onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
function Navbar({ sortByDate, sortByTask, searchInp, onSearchChange }: IProps) {
    const [dropdown, setDropdown] = useState<Boolean>(false)
    return (

        <nav className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center">
            <Link to="/" className="block px-4 py-2 text-lg text-gray-700">Home</Link>
            <Link to="/addTodo" className="block px-4 py-2 text-lg text-gray-700">Add Todo</Link>
            <div className="items-center w-full md:flex md:w-auto md:order-1" id="navbar-search">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="text" id="search-navbar" name="search-navbar" value={searchInp} onChange={onSearchChange} className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                </div>
            </div>
            <button onClick={() => { setDropdown(!dropdown) }} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded md:border-0 md:p-0 md:w-auto">Dropdown <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg></button>
            <div id="dropdownNavbar" className={`z-10 ${!dropdown ? "hidden" : ""} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
                <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownLargeButton">
                    <li onClick={sortByDate} style={{ cursor: "pointer" }} >
                        <p className="block px-4 py-2 hover:bg-gray-100" >Date</p>
                    </li>
                    <li onClick={sortByTask} style={{ cursor: "pointer" }} >
                        <p className="block px-4 py-2 hover:bg-gray-100" >Task Name</p>
                    </li>
                </ul>
            </div>

        </nav>
    )
}
export default Navbar
