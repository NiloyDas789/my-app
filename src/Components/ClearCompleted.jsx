import React from 'react';
import PropTypes from 'prop-types';

ClearCompleted.propTypes = {
  ClearCompleted: PropTypes.func,
};
function ClearCompleted(props) {
  const { clearCompleted } = props;
  return (
    <button onClick={() => clearCompleted()} className="button">
      Clear completed
    </button>
  );
}

export default ClearCompleted;
