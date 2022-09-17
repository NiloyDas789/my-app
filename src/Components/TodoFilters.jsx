import React from 'react';

function TodoFilters(props) {
  const { filter, setFilter, todoFiltered } = props;
  return (
    <div>
      <button
        onClick={() => {
          setFilter('all');
          todoFiltered('all');
        }}
        className={`button filter-button ${
          filter === 'all' ? 'filter-button-active' : ''
        } `}
      >
        All
      </button>
      <button
        onClick={() => {
          setFilter('active');
          todoFiltered('active');
        }}
        className={`button filter-button ${
          filter === 'active' ? 'filter-button-active' : ''
        } `}
      >
        Active
      </button>
      <button
        onClick={() => {
          setFilter('completed');
          todoFiltered('completed');
        }}
        className={`button filter-button ${
          filter === 'completed' ? 'filter-button-active' : ''
        } `}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilters;
