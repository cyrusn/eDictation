import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signAuth, test, changeView} from '../../actions';

import {fetchInit, checkStatus, handleResponse} from '../../helper';

import LoginForm from '../../components/session/loginForm';

const mapDispatchToProps = (dispatch) => ({
  onClickSubmit: (username, password) => {
    const init = fetchInit('POST', null, {
      body: JSON.stringify({
        username,
        password
      })
    });

    fetch('http://localhost:5000/api/auth/sign', init)
      .then(checkStatus)
      .then(handleResponse(
        json => {
          dispatch(signAuth(json.token));
          dispatch(test(`Welcome, ${json.ename}`));
          dispatch(changeView('main'));
        })
      )
      .catch(handleResponse(console.log));
  }
});

const connectLoginForm = connect(null, mapDispatchToProps)(LoginForm);
export default connectLoginForm;
