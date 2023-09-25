import React, { useContext } from "react";
import { todosContext } from "../App";

const TodoInput = () => {
  const { todoRef, handleCreate } = useContext(todosContext);
  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        className="todo-input"
        name="todo-input"
        ref={todoRef}
      />
      <button className="todo-submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default TodoInput;