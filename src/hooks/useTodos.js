import { v4 as setID } from 'uuid';
import { useEffect, useState } from 'react';

function useTodos({ defaults = [], storageKey = 'app:todos' } = {}) {
  const [todos, setTodos] = useState(() => {
    try {
      const defaultTodos = typeof defaults === 'function' ? defaults() : defaults;
      return window.localStorage.getItem(storageKey) ? JSON.parse(window.localStorage.getItem(storageKey)) : defaultTodos;
    } catch (err) {
      console.error('error', err);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(todos));
  }, [todos, storageKey]);

  function addTodo(text) {
    setTodos([
      ...todos,
      {
        id: setID(),
        text,
        completed: false,
        createdAt: Date.now()
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
