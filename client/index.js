import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components';

import { createStore } from 'redux';
import reducer from './reducers';
import {initState} from './state';

let store = createStore(reducer, initState);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
