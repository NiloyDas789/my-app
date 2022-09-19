import { useState } from 'react';
import '../reset.css';
import '../App.css';
import TodoForm from './TodoForm.jsx';
import NoTodos from './NoTodos.jsx';
import TodoList from './TodoList';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';

function App() {
  // const [name, setName] = useState('');
  const [name, setName] = useLocalStorage('name', '');

  const nameInputEl = useRef(null);
  const [todos, setTodos] = useLocalStorage('todos', []);

  const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

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

  let remainingCalculation = () => {
    console.log('Calculating remaining todos.This is slow');
    // for (let index = 0; index < 20000000000; index++) {}
    return todos.filter(todo => !todo.isComplete).length;
  };
  const remaining = useMemo(remainingCalculation, [todos]);

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

  useEffect(() => {
    nameInputEl.current.focus();
    // setName(JSON.parse(localStorage.getItem('name')) ?? '');
  }, []);
  const handleNameInput = event => {
    setName(event.target.value);
    // localStorage.setItem('name', JSON.stringify(event.target.value));
    console.log(localStorage.value);
  };

  return (
    <TodosContext.Provider value="Hello , world">
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-container">
            <div className="name-label">
              {' '}
              <h2>Name</h2>{' '}
            </div>
            <form action="#">
              <input
                type="text"
                value={name}
                className="todo-input"
                ref={nameInputEl}
                onChange={handleNameInput}
                placeholder="What is your name"
              />
            </form>
            {name && <p className="name-label"> Hello , {name}</p>}
          </div>
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
    </TodosContext.Provider>
  );
}
export default App;
