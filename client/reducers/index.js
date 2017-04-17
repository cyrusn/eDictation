// import './auth';
// import './test';
import {combineReducers} from 'redux';

const authorization = (state = '', action) => {
  switch (action.type) {
    case 'auth:sign':
      const authorization = action.token;
      return authorization;

    default:
      return state;
  }
};

const message = (state = 'Hello World', action) => {
  switch (action.type) {
    case 'test':
      const message = action.message;
      return message;
    default:
      return state;
  }
};

const page = (state = 'login', action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      const page = action.page;
      return page;

    default:
      return state;
  }
};

const headers = combineReducers({
  authorization
});

const ui = combineReducers({
  page,
  headers
});

const app = combineReducers({
  message,
  ui
});

export default app;
