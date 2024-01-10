import { Request as ExpressRequest } from 'express';
import { UserPayload } from 'src/modules/auth/interfaces/login.interface';

export interface ExpressRequestWithUser extends ExpressRequest {
  user: UserPayload & { iat: number; exp: number };
}
