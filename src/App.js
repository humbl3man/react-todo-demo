import { useRef } from 'react';
import styled from 'styled-components';
import TodosList from './components/TodosList';
import useTodos from './hooks/useTodos';

const StyledAppContainer = styled.main`
  padding: 2rem;
  background: #fff;
  width: 90vw;
  margin: 6rem auto 0;
  box-shadow: 10px 15px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const StyledEntryFormContainer = styled.section`
  margin-bottom: 3rem;
  form {
    display: grid;
    grid-template-columns: 1fr 100px;
    column-gap: 1rem;
  }
  input,
  button {
    appearance: none;
    border: 0;
    background: transparent;
    height: 34px;
    padding: 0 1rem;
    line-height: 1;
    font-size: inherit;
  }

  input {
    border: 1px solid var(--mainColor);
  }
  button {
    cursor: pointer;
    background-color: var(--mainColor);
    color: #fff;
    transition: opacity 200ms;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const StyledStats = styled.section`
  margin-bottom: 2rem;
  font-size: 1.4rem;
  color: #555;
  padding: 0.65rem;
  text-align: right;
  border: 1px dashed #ccc;
`;

function Stats({ todos }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((singleTodo) => singleTodo.completed).length;
  return (
    <StyledStats style={{ marginBottom: '2rem' }}>
      Todos completed: {completedTodos}/{totalTodos}
    </StyledStats>
  );
}

function App() {
  const inputRef = useRef();
  const { todos, addTodo, removeTodo, toggleComplete } = useTodos([]);

  function handleTodoSubmit(e) {
    e.preventDefault();
    const todo = inputRef.current.value;
    if (todo) {
      addTodo(todo);
      inputRef.current.value = '';
    }
  }

  return (
    <StyledAppContainer>
      <StyledEntryFormContainer>
        <form onSubmit={handleTodoSubmit}>
          <input ref={inputRef} aria-label="new todo" name="todo" type="text" placeholder="new todo..." />
          <button type="submit">Add task</button>
        </form>
      </StyledEntryFormContainer>
      {todos.length > 0 && <Stats todos={todos} />}
      <TodosList todos={todos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
    </StyledAppContainer>
  );
}

export default App;
