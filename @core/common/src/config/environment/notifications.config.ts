import { registerAs } from '@nestjs/config';

export default registerAs(
  'notifications',
  (): Record<string, unknown> => ({
    connections: {
      host: process.env.NOTIFICATIONS_HOST,
      port: process.env.NOTIFICATIONS_PORT,
    },
  }),
);
