import React from 'react';
import PropTypes from 'prop-types';

function TodoList(props) {
  const {
    todos,
    completeTodo,
    markAsEditing,
    updateTodo,
    cancelEditing,
    deleteTodo,
  } = props;

  return (
    <>
      <ul className="todo-list">
        {todos.map(todo => (
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
        <div>
          <div className="button">Check All</div>
        </div>
        <span>3 items remaining</span>
      </div>
      <div className="other-buttons-container">
        <div>
          <button className="button filter-button filter-button-active">
            All
          </button>
          <button className="button filter-button">Active</button>
          <button className="button filter-button">Completed</button>
        </div>
        <div>
          <button className="button">Clear completed</button>
        </div>
      </div>
    </>
  );
}
TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired,
  markAsEditing: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};
export default TodoList;
