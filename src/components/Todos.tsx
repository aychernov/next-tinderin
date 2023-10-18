'use client'

import {useEffect, useRef, useState} from "react";
import Icon from "@/components/ui/Icon";

type Todo = {
    id: number;
    text: string;
    completed: boolean;
}

export const Todos = () => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

    const initialRender = useRef(true);

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, {id: Date.now(), text: newTodo, completed: false}]);
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleToggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    };

    const handleCopyText = (text: string): void => {
        navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        const filtered = todos.filter((todo) =>
            todo.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTodos(filtered);
    }, [todos, searchQuery]);


    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            console.log(storedTodos)
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
            return;
        }
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <div className="container mx-auto p-4 text-center flex flex-col">
           <div className='w-full mx-auto flex flex-col justify-center items-center'>
               <input
                   type="text"
                   className="border border-gray-300 rounded py-2 mt-2 mb-2"
                   placeholder="Search"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
               />
               <input
                   type="text"
                   className="border border-gray-300 rounded py-2 mt-2 mb-2"
                   placeholder="Add Todo"
                   value={newTodo}
                   onChange={(e) => setNewTodo(e.target.value)}
               />
               <button
                   className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                   onClick={handleAddTodo}
               >
                   Add
               </button>

           </div>

            <ul className="mt-4">
                {filteredTodos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between border-b border-gray-300 py-2"
                    >
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => handleToggleTodo(todo.id)}
                            />
                            <span className="ml-2">{todo.text}</span>
                            <button
                                className=" ml-2 py-1 px-1 rounded"
                                onClick={() => handleCopyText(todo.text)}
                            >
                                <Icon name='copy' width={24} height={24}></Icon>
                            </button>
                        </label>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handleDeleteTodo(todo.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};