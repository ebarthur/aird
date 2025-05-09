import { ping } from 'tcp-ping';

describe('Health', () => {
  test('Reservations', async () => {
    const response = await fetch('http://reservations:3000');
    expect(response.status).toEqual(200);
  });

  test('Auth', async () => {
    const response = await fetch('http://auth:3001');
    expect(response.status).toEqual(200);
  });

  test('Payments', (done) => {
    ping({ address: 'payments,', port: 3003 }, (err) => {
      if (err) {
        fail();
      }
      done();
    });
  });

  test('Notifications', (done) => {
    ping({ address: 'notifications,', port: 3004 }, (err) => {
      if (err) {
        fail();
      }
      done();
    });
  });
});
