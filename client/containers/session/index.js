import React, { Component } from 'react';
import {connect} from 'react-redux';

import Session from '../../components/session';

const mapStateToProps = (state) => ({
  page: state.ui.page
});

const connectSession = connect(mapStateToProps)(Session);
export default connectSession;
