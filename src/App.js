import { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
import TodoInput from "./components/TodoInput";
import Tabs from "./components/Tabs";
// import Todo from "./components/Todo";

export const todosContext = createContext();

function App() {
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const todoRef = useRef(null);
  const [showAll, setShowAll] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showUncompleted, setShowUncompleted] = useState(false);

  const handleAll = () => {
    setShowAll(true);
    setShowCompleted(false);
    setShowUncompleted(false)
  }
  
  const handleCompleted = () => {
    setShowAll(false);
    setShowCompleted(true);
    setShowUncompleted(false)
    
  }
  
  const handleUncompleted = () => {
    setShowAll(false);
    setShowCompleted(false);
    setShowUncompleted(true) 
  }

  useEffect(() => {
    let canceled = false;
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        if (!canceled) {
          setTodos(data.slice(0, 10));
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => (canceled = true);
  }, []);

  const handleCheck = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newArray = todos.filter((todo) => todo.id !== id);
    setTodos(newArray);
  };

  const handleEdit = (e) => {
    const newTodos = todos.map((todo) =>
    todo.id === editId ? { ...todo, title: e.target.value, completed: false } : todo
    );
    e.target.value !== "" && setTodos(newTodos);
      
  };

  const handleCreate = (e) => {
    e.preventDefault();
    todoRef.current.value !== "" && setTodos([
      ...todos,
      { title: todoRef.current.value, completed: false, id: todos.length + 1 },
    ]);
    console.log(todoRef.current.value);
  };

  return (
    <>    
    <todosContext.Provider
      value={{
        todos,
        editId,
        todoRef,
        handleCheck,
        handleDelete,
        handleEdit,
        setEditId,
        handleCreate,
      }}
    >
      <div className="App">
        <div className="todo-create">
          <TodoInput />
          <Tabs handleAll = {handleAll} handleCompleted = {handleCompleted} handleUncompleted = {handleUncompleted}/>

        </div>
        <div className="todo-wrapper">
        {showAll &&<Todos />}
        {showCompleted && <Todos status="completed"/>}
        {showUncompleted && <Todos status="uncompleted" />}

        </div>
      </div>
    </todosContext.Provider>
    </>
  );
}

export default App;