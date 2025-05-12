import { registerAs } from '@nestjs/config';

export default registerAs(
  'rmq',
  (): Record<string, unknown> => ({
    connections: {
      uri: process.env.RABBITMQ_URI,
    },
  }),
);
