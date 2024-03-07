import { todoType } from "../App";
import { todoListType } from "../constants/task";
import TodoList from "./TodoList";

interface IProps {
  searchInp: string,
  todoList: todoType[],
  handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void,
  removeTask: (id: number) => void
}

function Home({ searchInp, todoList, handleCheck, removeTask }: IProps) {

  return (
    <>
      <TodoList
        searchInp={searchInp}
        todoList={todoList}
        handleCheck={handleCheck}
        type={todoListType.scheduled}
        removeTask={removeTask}
      />
      <TodoList
        searchInp={searchInp}
        todoList={todoList}
        handleCheck={handleCheck}
        type={todoListType.completed}
        removeTask={removeTask}
      />
    </>
  );
}
export default Home
