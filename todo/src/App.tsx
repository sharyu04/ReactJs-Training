import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
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
      <AddTodo todoList={todoList} addTask={addTask} />
      {(() => {
        if (loading) {
          return <h1 className="w-2/5 m-auto">Loading...</h1>;
        } else {
          return (
            <>
              <TodoList
                todoList={todoList}
                handleCheck={handleCheck}
                type={todoListType.scheduled}
                removeTask={removeTask}
              />
              <TodoList
                todoList={todoList}
                handleCheck={handleCheck}
                type={todoListType.completed}
                removeTask={removeTask}
              />
            </>
          );
        }
      })()}
    </div>
  );
}

export default App;
