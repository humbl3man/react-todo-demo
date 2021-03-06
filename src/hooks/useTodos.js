import { v4 as setID } from 'uuid';
import { useState } from 'react';

function useTodos(defaults) {
  const [todos, setTodos] = useState(defaults);

  function addTodo(text) {
    setTodos([
      ...todos,
      {
        id: setID(),
        text,
        completed: false
      }
    ]);
  }

  function removeTodo(id) {
    const index = todos.findIndex((t) => t.id === id);
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  }

  function toggleComplete(toggleTodo) {
    const index = todos.findIndex((t) => t.id === toggleTodo.id);
    setTodos([
      ...todos.slice(0, index),
      {
        ...toggleTodo,
        completed: !toggleTodo.completed
      },
      ...todos.slice(index + 1)
    ]);
  }

  return {
    todos,
    addTodo,
    removeTodo,
    toggleComplete
  };
}

export default useTodos;
