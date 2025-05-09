import * as authData from './data/auth.json';

describe('Reservations', () => {
  // Declare jwt at describe level to be accessible in tests

  beforeAll(async () => {
    await fetch('http://auth:3001/users/', {
      method: 'POST',
      body: JSON.stringify(authData.userCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(authData.userCredentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jwt = await response.text();
    console.log('jwt: ', jwt);
  });

  test('jwt', () => {
    expect(true).toBeTruthy();
  });
});
