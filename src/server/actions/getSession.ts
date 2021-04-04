import { NextApiRequest, NextApiResponse } from 'next';
import { IConfig } from '../config';
import { getLoginSession } from '../utils/auth';

export const getSession = async (
  config: Required<IConfig>,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getLoginSession(req, config);

  // display user data
  return session ? res.json(session) : res.status(401).end();
};
