import { ping } from 'tcp-ping';

describe('Health', () => {
  test('Reservations', async () => {
    const response = await fetch('http://localhost:3000');

    expect(response.ok).toBeTruthy();
  });

  test('Auth', async () => {
    const response = await fetch('http://localhost:3001');

    expect(response.ok).toBeTruthy();
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
