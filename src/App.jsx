import { useEffect, useState } from "react";
import "./App.css";
import CreateTodo from "./components/CreateTodo";

function App() {
   const [todos, setTodos] = useState(() => {
      const localValue = localStorage.getItem("ITEMS");
      if (localValue == null) return [];
      return JSON.parse(localValue);
   });

   function toggleTodo(id, completed) {
      setTodos((currentTodos) => {
         return currentTodos.map((todo) => {
            if (todo.id === id) {
               return { ...todo, completed };
            }
            return todo;
         });
      });
   }

   function deleteTodo(id) {
      setTodos((currentTodos) => {
         return currentTodos.filter((todo) => {
            return todo.id !== id;
         });
      });
   }

   function addTodo(newItem) {
      setTodos((currentTodos) => {
         return [
            ...currentTodos,
            { id: Date.now(), title: newItem, completed: false },
         ];
      });
   }

   useEffect(() => {
      localStorage.setItem("ITEMS", JSON.stringify(todos));
   }, [todos]);

   return (
      <>
         <div className="container">
            {/* Add TODO */}
            <CreateTodo addTodo={addTodo} />

            <h1 className="header">Todo List</h1>

            <ul className="list">
               {todos.length === 0 && "No todos"}
               {todos.map((todo) => {
                  return (
                     <li key={todo.id}>
                        <label>
                           <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={(e) =>
                                 toggleTodo(todo.id, e.target.checked)
                              }
                           />
                           {todo.title}
                        </label>
                        <button
                           onClick={() => deleteTodo(todo.id)}
                           className="btn btn-danger"
                        >
                           Delete
                        </button>
                     </li>
                  );
               })}
            </ul>
         </div>
      </>
   );
}

export default App;
