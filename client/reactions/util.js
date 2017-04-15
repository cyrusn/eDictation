import {GetState} from '../state';

export const fetchInit = (method, option) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  const authorization = GetState().ui.headers.authorization;

  if (authorization) {
    headers.append('authorization', authorization);
  }

  return Object.assign({}, {
    method,
    headers
  }, option);
};
