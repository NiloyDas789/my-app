import React from 'react';
import PropTypes from 'prop-types';

CheckAll.propTypes = {
  checkAll: PropTypes.func.isRequired,
};

function CheckAll(props) {
  const { checkAll } = props;
  return (
    <button
      onClick={() => checkAll()}
      className="button filter-button filter-button-active"
    >
      Check All
    </button>
  );
}

export default CheckAll;
