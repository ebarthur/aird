import * as authData from './data/auth.json';

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
        body: JSON.stringify({
          startDate: '02-01-2023',
          endDate: '02-05-2023',
          placeId: '123',
          invoiceId: '123',
          charge: {
            amount: 13,
            card: {
              cvc: '413',
              exp_month: 12,
              exp_year: 2027,
              number: '4242 4242 4242 4242',
            },
          },
        }),
      },
    );
    expect(responseCreate.ok).toBeTruthy();
    return responseCreate.json();
  };
});
