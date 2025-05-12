import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, unknown> => ({
    mysql: {
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_ROOT_PASSWORD,
      sync: process.env.MYSQL_SYNCHRONIZE === 'true',
    },
  }),
);
