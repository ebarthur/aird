import { registerAs } from '@nestjs/config';

export default registerAs(
  'auth',
  (): Record<string, unknown> => ({
    accessToken: {
      publicKey: process.env.JWT_PUBLIC_KEY_BASE64,
      privateKey: process.env.JWT_PRIVATE_KEY_BASE64,
      expiresIn: '1d',
    },
  }),
);
