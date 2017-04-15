import React from 'react';
import PropTypes from 'prop-types';

export const MessageNode = ({message, token}) => (
  <div>
    <h1>Message:</h1>
    <p>{message}</p>
    <h2>Token: </h2>
    <p>{token}</p>
  </div>
);

MessageNode.propTypes = {
  message: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired
};
