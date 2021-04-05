import { NextApiRequest, NextApiResponse } from 'next';
import { IConfigWithDefaults } from '../config';
import { setLoginSession } from '../utils/auth';
import { decodeToken } from '../utils/token';

export const processCallback = async (
  config: IConfigWithDefaults,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // no query token, no play!
  // this will also show 400 if we got token as an array
  if (!req.query?.token || typeof req.query?.token !== 'string') {
    return res.status(400).json({
      status: 400,
      message: 'No auth token provided or token is misconfigured',
    });
  }

  // validate user token, show 404 on fake ones
  const token = decodeToken(req.query.token, config.secret);
  if (!token) {
    return res.status(400).json({
      status: 400,
      message: `Token is invalid`,
    });
  }

  // set login session
  await setLoginSession(res, token, config);

  // redirect, defaults to homepage
  return res.redirect(config.redirectPath);
};
