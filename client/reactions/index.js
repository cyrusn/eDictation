// import './auth';
// import './test';

import {fetchInit} from './util';

export const reaction = (action) => {
  switch (action.type) {
    case 'auth:sign':
      return (state, {username, password}) => {
        console.log(state);
        const init = fetchInit('POST', {
          body: JSON.stringify({
            username, password
          })
        });

        let headers = state.ui.headers;
        fetch('http://localhost:5000/api/auth/sign', init)
        .then(resp => resp.json())
        .then(json => headers.set('authorization', json.token));
      };

    case 'test':
      return (state) => {
        fetch('http://localhost:5000/api/test', fetchInit('GET'))
        .then(resp => resp.json())
        .then(json => state.set('message', `Welcome, ${json.ename}`))
        .catch(err => console.log(err));
        return state;
      };

    default:
      return () => {};
  }
};
