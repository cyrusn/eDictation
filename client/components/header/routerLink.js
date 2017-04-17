import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RouterLink = ({active, children, onClick }) => {
  return (
    <li className={active ? 'active' : ''}>
      <a href='#' onClick={e => {
        e.preventDefault();
        onClick();
      }}>
        <span>{children}</span>
      </a>
    </li>
  );
};

RouterLink.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RouterLink;
