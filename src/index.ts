import { NextApiRequest, NextApiResponse } from 'next';
import { defaultConfig, IConfig } from './config';

export const NextPasswordless = (userConfig: IConfig) => (
  req: NextApiRequest,
  res: NextApiResponse
): void => {
  const { nextPasswordless: path } = req.query;
  const { method } = req;

  // merge user config with defaults
  const config = { ...userConfig, ...defaultConfig };

  // check for empty secret
  if (!config.secret) {
    throw new Error('You need to provide JWT secret.');
  }

  // root path, post to generate and send token
  if (!path && method === 'POST') {
    return res.json({ page: 'Homepage post', config });
  }

  // callback url
  if (path?.length === 1 && path[0] === 'callback' && method === 'GET') {
    return res.json({ page: 'Callback get' });
  }

  // defaults to 404
  return res.status(404).json({
    message: 'Page not found',
    status: 404,
  });
};
