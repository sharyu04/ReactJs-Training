import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TodoRoute from "./components/TodoRoute";
import useFetch from "./components/useFetch";

export type todoType = {
    id: number;
    task: string;
    dueDate: string;
    iscompleted: boolean;
};
function App() {
    const [todoList, setTodoList] = useState<todoType[]>([]);
    const {
        data,
        loading,
        error,
    }: { data: todoType[]; loading: Boolean; error: Error | null } = useFetch(
        "http://localhost:8000/todo"
    );
    const [searchInp, setSearchInp] = useState<string>("")
    useEffect(() => {
        if (error !== null) {
            alert(error)
        } else {
          setTodoList(data);
        }
    }, [data, error]);
    const handleCheck = async (id: number, task: string, dueDate: string, status: Boolean) => {
        const newData = {
            id: id,
            task: task,
            dueDate: dueDate,
            iscompleted: status 
        }
        await axios.put<unknown>(`http://localhost:8000/todo/${id}`, newData).then(res => {
            let newArr: todoType[] = []
            todoList.forEach(todo => {
                    if(todo.id === id){
                            todo.iscompleted = !todo.iscompleted
                        }
                        newArr.push(todo)
                })
                setTodoList(newArr)
        }).catch(err => { alert(err) })
    };
    const removeTask = async (id: number) => {
        await axios.delete(`http://localhost:8000/todo/${id}`).then(res => {
            console.log(res)
            let filteredTasks = todoList.filter((todoTask)=>{
    return todoTask.id !== id
                })
                setTodoList(filteredTasks);
        }).catch(err => alert(err))
    };
    const addTask = (taskName: string, dueDate: string) => {
        const taskData = {
            id: todoList[todoList.length-1].id + 1,
            task: taskName,
            dueDate: dueDate,
            iscompleted: false
        }
        const response = axios.post<unknown>("http://localhost:8000/todo", taskData)
        response.then(response => {
            console.log(response)
            setTodoList([...todoList, {id: todoList[todoList.length-1].id+1, task: taskName, dueDate: dueDate, iscompleted: false }]);
        }).catch(err => {
            alert(err)
        })
    };
    const onSearchChange = (e: any) => {
        e.preventDefault()
        setSearchInp(e.target.value)
    }
    const sortByDate = () =>{
        console.log("In sorting data ")
        const sortedData = [...todoList].sort((a:todoType,b: todoType) => {
            if(new Date(a.dueDate) > new Date(b.dueDate)) return 1;
            if(new Date(a.dueDate) < new Date(b.dueDate)) return -1;
            return 0;
        });
        setTodoList(sortedData)
    }
    const sortByTask = () =>{
        const sortedData = [...todoList].sort((a:todoType,b: todoType) => {
            if(a.task > b.task) return 1;
            if(a.task < b.task) return -1;
            return 0;
        });
       setTodoList(sortedData)
    }
    return (
        <div>
            {(() => {
                if (loading) {
                    return <h1 className="w-2/5 m-auto">Loading...</h1>;
                } else {
                    return (
                        <BrowserRouter>
                            <Navbar sortByDate={sortByDate} sortByTask={sortByTask} searchInp={searchInp} onSearchChange={onSearchChange}/>
                            <Routes>
                                <Route path="/" element={<Home searchInp={searchInp} todoList={todoList} handleCheck={handleCheck} removeTask={removeTask} />} />
                                <Route path="/addTodo" element={
                                    <AddTodo addTask={addTask} />}
                                />
                                <Route path="/todos/:id" element={<TodoRoute handleCheck={handleCheck} removeTask={removeTask} />} />
                            </Routes>
                        </BrowserRouter>
                    );
                }
            })()}

    </div>
  );
}

export default App;
