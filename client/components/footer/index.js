import React, { Component } from 'react';
import SystemMessage from '../../containers/footer/systemMessage';

const Footer = () => {
  return (
    <nav className='navbar navbar-default navbar-fixed-bottom'>
      <div className='container' >
        <SystemMessage />
      </div>
    </nav>
  );
};

export default Footer;
