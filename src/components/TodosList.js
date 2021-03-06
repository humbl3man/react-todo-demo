import React from 'react';
import styled, { css } from 'styled-components';

const StyledTodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  label {
    cursor: pointer;
    display: flex;
    align-items: center;
    .text {
      display: inline-block;
      max-width: 30rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-left: 1rem;
      ${(props) =>
        props.completed
          ? css`
              text-decoration: line-through;
              opacity: 0.3;
            `
          : ''}
    }
  }
  button {
    appearance: none;
    background: indianred;
    border: 0;
    color: #fff;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    cursor: pointer;
  }
`;

export default function TodosList({ todos, toggleComplete, removeTodo }) {
  if (todos.length === 0) {
    return <h2>No todos...</h2>;
  }

  return (
    <>
      {todos.map((singleTodo) => {
        const { id, text, completed } = singleTodo;

        return (
          <StyledTodoItem key={id} completed={completed}>
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => {
                  toggleComplete(singleTodo);
                }}
              />{' '}
              <span className="text">{text}</span>
            </label>
            <button
              type="button"
              title={`Remove ${text} from list`}
              onClick={() => {
                removeTodo(id);
              }}
            >
              &times;
            </button>
          </StyledTodoItem>
        );
      })}
    </>
  );
}
