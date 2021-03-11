import { useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineFilter } from 'react-icons/ai';

import TodosList from './components/TodosList';

// custom hooks
import useTodos from './hooks/useTodos';
import useFilter from './hooks/useFilter';

const StyledAppContainer = styled.main`
  padding: 2rem;
  background: #fff;
  width: 90vw;
  max-width: 110rem;
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

const StyledFilters = styled.div`
  display: flex;
  margin: 2rem 0;
  font-size: 1.4rem;
  align-items: center;

  > {
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }

  button {
    font-size: inherit;
    display: inline-block;
    appearance: none;
    background: none;
    border: 0;
    padding: 0;

    &:not(:disabled) {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

function Stats({ todos }) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((singleTodo) => singleTodo.completed).length;
  return (
    <StyledStats>
      Todos completed: {completedTodos}/{totalTodos}
    </StyledStats>
  );
}

function App() {
  const inputRef = useRef();
  const { todos, addTodo, removeTodo, toggleComplete } = useTodos(() => []);
  const { filters, setFilter } = useFilter();
  const appliedFilter = filters.find((f) => f.active).id;
  const displayTodos = todos
    .filter((singleTodo) => {
      if (appliedFilter === 'inprogress') {
        return singleTodo.completed === false;
      } else if (appliedFilter === 'completed') {
        return singleTodo.completed === true;
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      return -1;
    })
    .sort((a, b) => {
      if (a.completed && b.completed) {
        return 0;
      }

      if (a.completed) {
        return 1;
      } else {
        return -1;
      }
    });

  function handleTodoSubmit(e) {
    e.preventDefault();
    const todo = inputRef.current.value;
    if (todo) {
      addTodo(todo);
      setFilter('all');
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
      <StyledFilters>
        <span
          style={{
            verticalAlign: 'middle'
          }}
        >
          <AiOutlineFilter /> Filters:
        </span>{' '}
        {filters.map((singleFilter) => {
          return (
            <button
              key={singleFilter.id}
              type="button"
              disabled={singleFilter.active}
              onClick={() => {
                setFilter(singleFilter.id);
              }}
            >
              {singleFilter.label}
            </button>
          );
        })}
      </StyledFilters>

      <TodosList todos={displayTodos} toggleComplete={toggleComplete} removeTodo={removeTodo} />
    </StyledAppContainer>
  );
}

export default App;
