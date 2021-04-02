import { NextApiRequest, NextApiResponse } from 'next';
import { processCallback } from './actions/processCallback';
import { sendToken } from './actions/sendToken';
import { parseConfig, IConfig } from './config';

export const NextPasswordless = (userConfig: IConfig) => (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> | void => {
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

  // defaults to 404
  return res.status(404).json({ status: 404, message: 'Page not found' });
};
