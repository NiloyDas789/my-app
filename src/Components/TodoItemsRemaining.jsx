import React from 'react';
import PropTypes from 'prop-types';

TodoItemsRemaining.propTypes = {
  remaining: PropTypes.number.isRequired,
};

function TodoItemsRemaining(props) {
  const { remaining } = props;
  return <span>{remaining} items remaining</span>;
}

export default TodoItemsRemaining;
