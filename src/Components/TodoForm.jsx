import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoForm(props) {
  const [todoInput, setTodoInputs] = useState();

  function handleInput(event) {
    setTodoInputs(event.target.value);
  }

  function handleChange(event) {
    event.preventDefault();
    if (todoInput.trim().length === 0) {
      return;
    }

    props.addTodo(todoInput);

    setTodoInputs('');
  }
  const msg = useContext(TodosContext);

  return (
    <form action="#" onSubmit={handleChange}>
      <input
        type="text"
        className="todo-input"
        value={todoInput || ''}
        onChange={handleInput}
        placeholder="What do you need to do?"
      />
      {msg}
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func,
};

export default TodoForm;
