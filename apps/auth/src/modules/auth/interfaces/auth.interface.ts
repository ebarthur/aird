export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const USER_ROLE = {
  COMMON: 'common',
  SUPERUSER: 'superuser',
} as const;

export type ROLE = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface IAuthPayload {
  id: string;
  role: ROLE;
}

export enum TokenType {
  ACCESS_TOKEN = 'AccessToken',
  REFRESH_TOKEN = 'RefreshToken',
}
