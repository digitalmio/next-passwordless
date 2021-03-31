import { NextApiRequest, NextApiResponse } from 'next';
import { IConfig } from '../config';
import { logToken } from '../utils/logger';
import { generateCode, generateToken } from '../utils/token';

export const sendToken = async (
  config: Required<IConfig>,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // check if user provided email address, aka destination
  if (!req.body?.destination) {
    return res.status(400).json({
      status: 400,
      message: 'You need to specify email address destination',
    });
  }

  // generate auth code
  const code = generateCode();

  // generate JWT
  const token = await generateToken(
    { destination: req.body.destination, code },
    config.secret,
    config.linkExpiry
  );

  // log token if on dev
  logToken(config, { destination: req.body.destination, token, code });

  // log URL if development, unless disabled in config

  // send email

  return res.json({ page: 'Homepage post', config });
};
