import { registerAs } from '@nestjs/config';

export default registerAs(
  'notifications',
  (): Record<string, unknown> => ({
    grpc: {
      url: process.env.NOTIFICATION_GRPC_URL,
    },
  }),
);
