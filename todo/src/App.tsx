import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TodoRoute from "./components/TodoRoute";
import useFetch from "./components/useFetch";
import { todoListType } from "./constants/task";

export type todoType = {
  task: string;
  iscompleted: boolean;
};
function App() {
  const [todoList, setTodoArr] = useState<todoType[]>([]);
  const {
    data,
    loading,
    error,
  }: { data: todoType[]; loading: Boolean; error: Error | null } = useFetch(
    "http://localhost:8000/todo"
  );
  useEffect(() => {
    if (error !== null) {
      alert(error)
      console.log(error);
    } else {
      console.log("Data: ", data);
      setTodoArr(data);
    }
  }, [data, error]);
  const handleCheck = (id: number) => {
    const updateArray = [...todoList];
    updateArray[id].iscompleted = !updateArray[id].iscompleted;
    setTodoArr(updateArray);
  };
  const removeTask = (idx: number) => {
    setTodoArr([
      ...todoList.slice(0, idx),
      ...todoList.slice(idx + 1, todoList.length),
    ]);
  };


  const addTask = (taskName: string) => {
    setTodoArr([...todoList, { task: taskName, iscompleted: false }]);
  };

  return (
    <div>
      {(() => {
        if (loading) {
          return <h1 className="w-2/5 m-auto">Loading...</h1>;
        } else {
          return (
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home todoList={todoList} handleCheck={handleCheck} removeTask={removeTask} />} />
                <Route path="/addTodo" element={
                  <AddTodo todoList={todoList} addTask={addTask} />}
                />
                <Route path="/todos/:id" element={<TodoRoute todoList={todoList} handleCheck={handleCheck} removeTask={removeTask} />} />
              </Routes>
            </BrowserRouter>
          );
        }
      })()}

    </div>
  );
}

export default App;
