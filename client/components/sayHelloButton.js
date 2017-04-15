import React from 'react';
import PropTypes from 'prop-types';

export const SayHelloButton = ({onClickSign, onClickTest}) => (
  <div>
    <button onClick={onClickSign}>
      sign
    </button>
    <button onClick={onClickTest}>
      test
    </button>
  </div>);

SayHelloButton.propTypes = {
  onClickTest: PropTypes.func.isRequired,
  onClickSign: PropTypes.func.isRequired
};
