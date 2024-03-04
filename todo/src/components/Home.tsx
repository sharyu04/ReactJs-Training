import { todoType } from "../App";
import TodoList from "./TodoList";

function Home({todoArr, handleCheck, removeTask}:{todoArr: todoType[], handleCheck:(id: number)=>void, removeTask: (id: number)=>void}) {

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
    export default Home
