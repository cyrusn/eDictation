import React, { Component } from 'react';
import {connect} from 'react-redux';

import SystemMessage from '../../components/footer/systemMessage';

const mapStateToProps = (state) => ({
  systemMessage: state.message || ''
});

const connectSystemMessage = connect(mapStateToProps)(SystemMessage);
export default connectSystemMessage;
