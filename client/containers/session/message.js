import React, { Component } from 'react';
import {connect} from 'react-redux';

import Message from '../../components/session/message';

const mapStateToProps = (state) => ({
  token: state.ui.headers.authorization || ''
});

const connectedMessage = connect(mapStateToProps)(Message);
export default connectedMessage;
