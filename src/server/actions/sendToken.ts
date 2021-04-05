import { NextApiRequest, NextApiResponse } from 'next';
import { IConfigWithDefaults } from '../config';
import { logToken } from '../utils/logger';
import { generateCode, generateToken } from '../utils/token';

export const sendToken = async (
  config: IConfigWithDefaults,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  // check if user provided email address, aka destination
  const { destination } = req.body;

  if (!destination) {
    return res.status(400).json({
      status: 400,
      message: 'You need to specify destination email address',
    });
  }

  // generate auth code
  const code = generateCode();

  // generate JWT
  const token = generateToken(
    { destination: req.body.destination, code },
    config.secret,
    config.linkExpiry as string
  );

  // log token if on dev
  logToken(config, { destination, token, code });

  // send email

  // return code
  return res.json({ success: true, code });
};
