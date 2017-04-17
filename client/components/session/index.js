import React, { Component } from 'react';
import Message from '../../containers/session/message';
import LoginForm from '../../containers/session/loginForm';
import Main from './main';
import Default from './default';

const Session = ({page}) => {
  switch (page) {
    case 'main':
      return <Main />;

    case 'login':
      return <LoginForm />;

    default :
      return <Default />;
  }
};

export default Session;
