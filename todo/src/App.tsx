import { useEffect, useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import useFetch from "./components/useFetch";

export type todoType = {
  task: string;
  completed: boolean;
};

function App() {
  const [todoArr, setTodoArr] = useState<todoType[]>([]);
  const {
    data,
    loading,
    error,
  }: { data: todoType[]; loading: Boolean; error: Error | null } = useFetch(
    "http://localhost:8000/todo"
  );
  useEffect(() => {
    if (error !== null) {
      console.log(error);
    } else {
      console.log("Data: ", data);
      setTodoArr(data);
    }
  }, [data, error]);
  const handleCheck = (id: number) => {
    const updateArray = [...todoArr];
    updateArray[id].completed = !updateArray[id].completed;
    setTodoArr(updateArray);
  };
  const removeTask = (idx: number) => {
    setTodoArr([
      ...todoArr.slice(0, idx),
      ...todoArr.slice(idx + 1, todoArr.length),
    ]);
  };
  const addTask = (taskName: string) => {
    setTodoArr([...todoArr, { task: taskName, completed: false }]);
  };
  return (
    <div>
      <AddTodo todoArr={todoArr} addTask={addTask} />
      {(() => {
        if (loading) {
          return <h1 className="w-2/5 m-auto">Loading...</h1>;
        } else {
          return (
            <>
              <TodoList
                todoArr={todoArr}
                handleCheck={handleCheck}
                type={"Scheduled"}
                removeTask={removeTask}
              />
              <TodoList
                todoArr={todoArr}
                handleCheck={handleCheck}
                type={"Completed"}
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
