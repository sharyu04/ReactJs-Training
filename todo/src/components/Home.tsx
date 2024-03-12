import { todoType } from "../App";
import { todoListType } from "../constants/task";
import TodoList from "./TodoList";

function Home({todoList, handleCheck, removeTask}:{todoList: todoType[], handleCheck:(id: number)=>void, removeTask: (id: number)=>void}) {

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
