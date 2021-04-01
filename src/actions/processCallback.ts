import { IConfig } from '../config';
import { NextApiRequest, NextApiResponse } from 'next';
import { decodeToken } from '../utils/token';

export const processCallback = async (
  config: Required<IConfig>,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // no query token, no play!
  if (!req.query?.token) {
    return res.status(400).json({
      status: 400,
      message: 'No token provided',
    });
  }

  // validate user token
  const tokenString =
    typeof req.query.token === 'string' ? req.query.token : req.query.token[0];
  const token = decodeToken(tokenString, config.secret);

  if (!token) {
    return res.status(400).json({
      status: 400,
      message: `Token is invalid`,
    });
  }

  // set login session

  console.log({ token });

  return res.json({ page: 'Process Callback get' });
};
