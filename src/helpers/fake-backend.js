const users = [
  {
    id: 1,
    username: 'test',
    password: 'test',
    firstName: 'Test',
    lastName: 'User',
  },
  {
    id: 2,
    username: 'test2',
    password: 'test2',
    firstName: 'Test2',
    lastName: 'User2',
  },
];

export function configureFakeBackend() {
  let realFetch = window.fetch;
  window.fetch = function(url, opts) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
          return authenticate(opts, resolve, reject);
        }
        if (url.endsWith('/users') && opts.method === 'GET') {
          return getUsers(opts, resolve, reject);
        }
        realFetch(url, opts)
          .then(resolve)
          .catch(reject);
      }, 500);
    });
  };
}

function authenticate(opts, resolve, reject) {
  let params = JSON.parse(opts.body);
  let filteredUsers = users.filter(
    user =>
      user.username === params.username && user.password === params.password,
  );
  if (filteredUsers.length) {
    let user = filteredUsers[0];
    let responseJson = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      token: 'fake-jwt-token',
    };
    resolve({
      ok: true,
      json: () => Promise.resolve(responseJson),
      text: () => Promise.resolve(JSON.stringify(responseJson)),
    });
  } else {
    reject('Username or password is incorrect');
  }
  return;
}

function getUsers(opts, resolve, reject) {
  if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
    resolve({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(users)),
      json: () => Promise.resolve(users),
    });
  } else {
    reject('Unauthorised');
  }
  return;
}
