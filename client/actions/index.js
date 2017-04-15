export const signAuth = (username, password) => ({
  type: 'auth:sign',
  data: {
    username,
    password
  }
});

export const test = () => ({
  type: 'test'
});
