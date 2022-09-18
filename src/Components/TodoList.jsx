import React from 'react';
import PropTypes from 'prop-types';
import TodoItemsRemaining from './TodoItemsRemaining';
import ClearCompleted from './ClearCompleted';
import CheckAll from './CheckAll';
import TodoFilters from './TodoFilters';
import { useState } from 'react';

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  remaining: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  checkAll: PropTypes.func.isRequired,
  todosFiltered: PropTypes.func.isRequired,
};
function TodoList(props) {
  const {
    todos,
    completeTodo,
    markAsEditing,
    updateTodo,
    cancelEditing,
    deleteTodo,
    remaining,
    clearCompleted,
    checkAll,
    todosFiltered,
  } = props;
  const [filter, setFilter] = useState('all');

  return (
    <>
      <ul className="todo-list">
        {todosFiltered(filter).map(todo => (
          <li key={todo.id} className="todo-item-container">
            <div className="todo-item">
              <input
                type="checkbox"
                onChange={() => {
                  completeTodo(todo.id);
                }}
                checked={todo.isComplete ? true : false}
              />
              {!todo.isEditing ? (
                <span
                  onDoubleClick={() => markAsEditing(todo.id)}
                  className={`todo-item-label ${
                    todo.isComplete ? 'line-through' : ''
                  }`}
                >
                  {todo.title}
                </span>
              ) : (
                <input
                  type="text"
                  className="todo-item-input"
                  onBlur={event => updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      updateTodo(event, todo.id);
                    } else if (event.key === 'Escape') {
                      cancelEditing(todo.id);
                    }
                  }}
                  defaultValue={todo.title}
                  autoFocus
                />
              )}
            </div>
            <button onClick={() => deleteTodo(todo.id)} className="x-button">
              <svg
                className="x-button-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="check-all-container">
        <CheckAll checkAll={checkAll} />
        <TodoItemsRemaining remaining={remaining} />
      </div>

      <div className="other-buttons-container">
        <TodoFilters
          todosFiltered={todosFiltered}
          filter={filter}
          setFilter={setFilter}
        />
        <div>
          <ClearCompleted clearCompleted={clearCompleted} />
        </div>
      </div>
    </>
  );
}
export default TodoList;
