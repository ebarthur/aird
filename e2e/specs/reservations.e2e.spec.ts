import { authData, reservationData } from './data';

describe('Reservations', () => {
  let token: string;
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
    const res = await response.json();
    const { token: jwt } = res.data;
    token = jwt;
  });

  test('Create & Get', async () => {
    const { data: createdReservation } = await createReservation();
    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          auth: token,
        },
      },
    );
    const { data } = await responseGet.json();
    expect(createdReservation).toEqual(data);
  });

  const createReservation = async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
        body: JSON.stringify(reservationData.create),
      },
    );
    expect(responseCreate.ok).toBeTruthy();
    return responseCreate.json();
  };
});
