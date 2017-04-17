import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {changeView} from '../../actions';
import {connect} from 'react-redux';

import RouterLink from '../../components/header/RouterLink';

const mapStateToProps = (state, ownProps) => {
  const active = (state.ui.page === ownProps.view);
  return {active};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(changeView(ownProps.view));
  }
});

const connectedRouterLink = connect(mapStateToProps, mapDispatchToProps)(RouterLink);
export default connectedRouterLink;
