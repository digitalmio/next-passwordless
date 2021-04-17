import { NextApiRequest, NextApiResponse } from 'next';
import { IConfigWithDefaults } from '../config';
import { removeTokenCookie } from '../utils/auth-cookie';

export const logout = async (
  config: IConfigWithDefaults,
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  removeTokenCookie(res, config.cookieName);
  res.writeHead(302, { Location: '/?logout=true' });
  res.end();
};
