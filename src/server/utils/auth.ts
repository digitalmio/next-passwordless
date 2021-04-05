import { NextApiRequest, NextApiResponse } from 'next';
import { IConfigWithDefaults } from '../config';
import Iron from '@hapi/iron';
import { setTokenCookie, getTokenCookie } from './auth-cookie';

export async function setLoginSession(
  res: NextApiResponse,
  session: any,
  config: IConfigWithDefaults
) {
  const createdAt = Date.now();
  // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: config.cookieMaxAge };
  const token = await Iron.seal(obj, config.cookieSecret, Iron.defaults);
  setTokenCookie(res, token, config.cookieName, config.cookieMaxAge as number);
}

export async function getLoginSession(req: NextApiRequest, config: IConfigWithDefaults) {
  const token = getTokenCookie(req, config.cookieName);

  if (!token) return;

  const session = await Iron.unseal(token, config.cookieSecret, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}
