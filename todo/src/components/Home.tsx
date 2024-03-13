import { todoType } from "../App";
import { todoListType } from "../constants/task";
import TodoList from "./TodoList";

interface IProps{todoList: todoType[], handleCheck:(id: number)=>void, removeTask: (id: number)=>void}
function Home({todoList, handleCheck, removeTask}:IProps) {

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
    export default Home
