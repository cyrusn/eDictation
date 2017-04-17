import React, { Component } from 'react';
import Navbar from './header';
import Session from '../containers/session';
import Footer from './footer';

export default () => (
  <div>
    <Navbar />
    <div className='container'>
      <Session />
    </div>
    <Footer />
  </div>
);
