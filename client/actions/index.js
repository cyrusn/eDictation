export const signAuth = (token) => ({
  type: 'auth:sign',
  token
});

export const test = (message) => ({
  type: 'test',
  message
});

export const PassTokenToFetchInit = (token) => ({
  type: 'PASS_TOKEN_TO_FETCH_INIT',
  token
});

export const changeView = (page) => ({
  type: 'CHANGE_VIEW',
  page
});
