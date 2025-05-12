import { registerAs } from '@nestjs/config';

export default registerAs(
  'payment',
  (): Record<string, unknown> => ({
    stripe: {
      secret: process.env.STRIPE_SECRET_KEY,
    },
    grpc: {
      url: process.env.PAYMENT_GRPC_URL,
    },
  }),
);
