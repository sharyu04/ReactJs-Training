import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

export type todoType = {
    id: number;
    task: string;
    dueDate: string;
    iscompleted: boolean;
};
function App() {
   return (
        <>
                        <BrowserRouter>
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/addTodo" element={
                                    <AddTodo />}
                                />
                            </Routes>
                        </BrowserRouter>

        </>
    );
}

export default App;


 // <Route path="/todos/:id" element={<TodoRoute handleCheck={handleCheck} removeTask={removeTask} />} />
