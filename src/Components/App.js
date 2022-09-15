import { useState } from 'react';
import '../reset.css';
import '../App.css';
import TodoForm from './TodoForm.jsx';
import NoTodos from './NoTodos.jsx';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditing: false,
    },
  ]);

  const [idForTodo, setIdForTodo] = useState(4);

  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id != id));
  }

  function addTodo(todo) {
    setTodos([
      ...todos,
      {
        id: idForTodo,
        title: todo,
        isComplete: false,
        isEditing: false,
      },
    ]);
    setIdForTodo(previousIdForTodo => previousIdForTodo + 1);
  }
  function completeTodo(id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  }

  function markAsEditing(id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });
    setTodos(updateTodos);
  }

  function updateTodo(event, id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        if (event.target.value.trim().length === 0) {
          todo.isEditing = false;
          return todo;
        }
        todo.title = event.target.value;
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updateTodos);
  }

  function cancelEditing(id) {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updateTodos);
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        {todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEditing={cancelEditing}
            deleteTodo={deleteTodo}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}
export default App;
