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

  // generate email html content
  const emailContent = await config.generateEmailContent(
    code,
    `${config.rootUrl}api/auth/callback?token=${token}`
  );

  // determine if email should be sent, based on config params
  const shouldSendEmail =
    process.env.NODE_ENV !== 'development' ||
    (process.env.NODE_ENV === 'development' && config.sendEmailsOnDev);

  if (shouldSendEmail) {
    if (typeof emailContent === 'string') await config.sendEmail(destination, emailContent);
    else await config.sendEmail(destination, emailContent.html, emailContent.text);
  }

  // return code
  return res.json({ success: true, code });
};
