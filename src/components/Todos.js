import React, { useContext } from "react";
import { todosContext } from "../App";
import Todo from "./Todo";

const Todos = ({status}) => {
  const { todos } = useContext(todosContext); 
  const todoList= todos.filter(todo => {
    if(status === "completed"){
      return todo.completed
    } if(status === "uncompleted"){
      return !todo.completed
    }
    return todo

  })

  return (
    <ul>
      {todoList.length === 0 ? "NO AVAILABLE TODOS" : (!!todoList.length &&
        todoList.map((todo) => <Todo key={todo.id} todo={todo} />))}
    </ul>
  );
};

export default Todos;