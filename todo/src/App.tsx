import { useState } from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { todoListType } from './constants/task';

export type todoType = {
    task: string;
    iscompleted: boolean
}

const initialState: todoType[] = [
    {
        task: "Task1",
        iscompleted: false
    },
    {
        task: "Task2",
        iscompleted: false
    },
    {
        task: "Task3",
        iscompleted: true
    }
]
function App() {
    const [todoList, setTodoList] = useState<todoType[]>(initialState)

    const handleCheck = (id: number) => {
        const updateArray = [...todoList]
        updateArray[id].iscompleted = !updateArray[id].iscompleted
        setTodoList(updateArray)
    }
    const removeTask = (idx: number) => {
        setTodoList([
            ...todoList.slice(0, idx),
            ...todoList.slice(idx + 1, todoList.length)
        ]);
    }
    const addTask = (taskName: string) => {
        setTodoList([...todoList, { task: taskName, iscompleted: false }])
    }
    return (
        <div>
            <AddTodo todoList={todoList} addTask={addTask} />
            <TodoList todoList={todoList} handleCheck={handleCheck} type={todoListType.completed} removeTask={removeTask} />
            <TodoList todoList={todoList} handleCheck={handleCheck} type={todoListType.scheduled} removeTask={removeTask} />
        </div>
    );
}

export default App
