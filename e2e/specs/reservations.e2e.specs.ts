import * as authData from './data/auth.json';

describe('Reservations', () => {
  beforeAll(async () => {
    await fetch('http://auth/3001/users/', {
      method: 'POST',
      body: JSON.stringify(authData.userCredentials),
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(authData.userCredentials),
    });

    const jwt = response.text();
    console.log(jwt);
  });
});
