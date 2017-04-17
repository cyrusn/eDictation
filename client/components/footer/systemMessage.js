import React from 'react';
import PropTypes from 'prop-types';

const SystemMessage = ({systemMessage}) => {
  return <p className='navbar-text navbar-right'>{systemMessage}</p>;
};

SystemMessage.propTypes = {
  systemMessage: PropTypes.string.isRequired
};

export default SystemMessage;
