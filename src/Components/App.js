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

  let deleteTodo = id => {
    setTodos([...todos].filter(todo => todo.id !== id));
  };

  let addTodo = todo => {
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
  };
  let completeTodo = id => {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  let markAsEditing = id => {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = true;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  let updateTodo = (event, id) => {
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
  };

  let cancelEditing = id => {
    const updateTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isEditing = false;
      }
      return todo;
    });
    setTodos(updateTodos);
  };
  let remaining = () => {
    return todos.filter(todo => !todo.isComplete).length;
  };
  let clearCompleted = () => {
    setTodos([...todos].filter(todo => !todo.isComplete));
  };
  let checkAll = () => {
    setTodos(
      [...todos].map(todo => {
        todo.isComplete = true;
        return todo;
      })
    );
  };
  let todosFiltered = filter => {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  };

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
            remaining={remaining}
            clearCompleted={clearCompleted}
            checkAll={checkAll}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}
export default App;
