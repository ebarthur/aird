import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, unknown> => ({
    mongo: {
      uri: process.env.MONGODB_URI,
    },
  }),
);
