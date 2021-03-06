import { NextApiRequest, NextApiResponse } from 'next';
import { processCallback } from './actions/processCallback';
import { sendToken } from './actions/sendToken';
import { getSession } from './actions/getSession';
import { logout } from './actions/logout';
import { parseConfig, IConfig } from './config';

export const NextPasswordlessServer = (userConfig: IConfig) => (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<any>> | void => {
  const { nextPasswordless: path } = req.query;
  const { method } = req;

  // merge user config with defaults
  const config = parseConfig(userConfig);

  // check for empty secret
  if (!config.secret) {
    throw new Error('You need to provide JWT secret.');
  }

  // root path (so path is undefined), post to generate and send token
  if (!path && method === 'POST') return sendToken(config, req, res);

  // callback url
  if (path?.length === 1 && path[0] === 'callback' && method === 'GET')
    return processCallback(config, req, res);

  // display user session data
  if (path?.length === 1 && path[0] === 'session' && method === 'GET')
    return getSession(config, req, res);

  // logout
  if (path?.length === 1 && path[0] === 'logout' && method === 'GET') {
    return logout(config, req, res);
  }

  // defaults to 404
  return res.status(404).json({ status: 404, message: 'Page not found' });
};
