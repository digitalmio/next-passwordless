import { IConfig } from '../config';
import { NextApiRequest, NextApiResponse } from 'next';

export const returnError = async (
  status: number = 404,
  message: string = 'Page not found',
  _config: Required<IConfig>,
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  return res.status(status).json({ status, message });
};
