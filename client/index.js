import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {App} from './components';

import {Subscribe, createStore} from './state';
import {reaction} from './reactions';
import * as actions from './actions';

createStore(actions, reaction);

class Application extends Component {
  componentDidMount () {
    Subscribe(() => this.forceUpdate());
  }

  render () {
    return <App />;
  }
}

ReactDOM.render(
  <Application />,
  document.getElementById('root')
);
