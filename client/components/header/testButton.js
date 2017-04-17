import React from 'react';
import PropTypes from 'prop-types';

const TestButton = ({jwtToken, onClickTest}) => {
  return (
    <button
      className='btn btn-default navbar-btn'
      onClick={() => onClickTest(jwtToken)}>test</button>
  );
};

TestButton.propTypes = {
  jwtToken: PropTypes.string.isRequired,
  onClickTest: PropTypes.func.isRequired
};

export default TestButton;
