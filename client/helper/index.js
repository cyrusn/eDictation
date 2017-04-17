export const fetchInit = (method, jwtToken, option) => {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  if (jwtToken) {
    headers.append('authorization', jwtToken);
  }

  return Object.assign({}, {
    method,
    headers
  }, option);
};

export const checkStatus = (response) => {
  if (response.status !== 200) {
    return Promise.reject(response);
  }

  return response;
};

export const handleResponse = (cb) => {
  return (response) => {
    return response.json().then(cb);
  };
};
