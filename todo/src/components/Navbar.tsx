import { Link } from "react-router-dom";

function Navbar() {
    return (

        <nav className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center">
            <Link to="/" className="block px-4 py-2 text-lg text-gray-700">Home</Link>
            <Link to="/addTodo" className="block px-4 py-2 text-lg text-gray-700">Add Todo</Link>
        </nav>
    )
}
export default Navbar
