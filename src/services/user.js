import { authHeader } from 'helpers/auth-header';

export const userService = {
  login,
  logout,
  getAll,
};

function login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  };
  return fetch(`${process.env.API}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      if (user.token) {
        localStorage.setItem('user', JSON.stringify(user));
      }
      return user;
    })
    .catch(console.log);
}

function logout() {
  localStorage.removeItem('user');
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };
  return fetch(`${process.env.API}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.json().then(data => {
    if (!response.ok) {
      if (response.status === 401) {
        logout();
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
