import { todoType } from "../App";
import TodoList from "./TodoList";

function Home({ searchInp, todoArr, handleCheck, removeTask }: { searchInp: string, todoArr: todoType[], handleCheck: (id: number, task: string, dueDate: string, status: Boolean) => void, removeTask: (id: number) => void }) {

    return (
        <>
            <TodoList
                searchInp={searchInp}
                todoArr={todoArr}
                handleCheck={handleCheck}
                type={"Scheduled"}
                removeTask={removeTask}
            />
            <TodoList
                searchInp={searchInp}
                todoArr={todoArr}
                handleCheck={handleCheck}
                type={"Completed"}
                removeTask={removeTask}
            />
        </>
    );
}
export default Home
