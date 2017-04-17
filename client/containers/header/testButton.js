import React, { Component } from 'react';
import {connect} from 'react-redux';
import {test} from '../../actions';

import TestButton from '../../components/header/testButton';
import {fetchInit, checkStatus, handleResponse} from '../../helper';

const mapStateToProps = (state) => {
  return {
    jwtToken: state.ui.headers.authorization || ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickTest: (jwtToken) => {
      fetch('http://localhost:5000/api/test', fetchInit('GET', jwtToken))
        .then(checkStatus)
        .then(handleResponse(json => dispatch(test(json.message))))
        .catch(handleResponse(console.log));
    }
  };
};

const connectTestButton = connect(mapStateToProps, mapDispatchToProps)(TestButton);
export default connectTestButton;
