import React, { useContext } from "react";
import { todosContext } from "../App";

const Todo = ({ todo }) => {
  const { editId, handleCheck, handleDelete, handleEdit, setEditId } =
    useContext(todosContext);
  return (
    <li className="todo" key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleCheck(todo.id)}
        disabled={editId}
      />

      {editId === todo.id ? (
        <input type="text" value={todo.title} onChange={handleEdit} />
      ) : (
        <span className={`todo-title ${todo.completed && "checked"}`}>
          {todo.title}
        </span>
      )}
      {editId === todo.id ? (
        <button onClick={() => setEditId(null)}>✅</button>
      ) : (
        <button
          className="del-button"
          onClick={() => setEditId(todo.id)}
        //disabled={todo.completed}
        >
          ✏️
        </button>
      )}
      <button className="del-button" onClick={() => handleDelete(todo.id)}>
        🗑️
      </button>
    </li>
  );
};

export default Todo;