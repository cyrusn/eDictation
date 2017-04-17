import React from 'react';
import TestButton from '../../containers/header/testButton';
import Router from './router';

const Header = () => (
  <nav className='navbar navbar-default'>
    <div className='container-fluid'>
      <div className='navbar-header'>
        <a className='navbar-brand' href='#'>eDictation</a>
      </div>

      <Router />
      <TestButton />
    </div>
  </nav>
);

export default Header;
