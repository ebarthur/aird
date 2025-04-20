import { registerAs } from '@nestjs/config';

export default registerAs(
  'payment',
  (): Record<string, unknown> => ({
    connections: {
      host: process.env.PAYMENT_TCP_HOST,
      port: process.env.PAYMENT_TCP_PORT,
    },
    stripe: {
      secret: process.env.STRIPE_SECRET_KEY,
    },
  }),
);
