import { TokenPayload, BaseUser } from '@project/shared/app-types';

export function createJWTPayload(user: BaseUser): TokenPayload {
  return {
    sub: user._id,
    email: user.email,
    role: user.role,
    userName: user.userName,
  };
}
