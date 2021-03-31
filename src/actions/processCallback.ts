import { IConfig } from '../config';
import { NextApiRequest, NextApiResponse } from 'next';

export const processCallback = async (
  _config: Required<IConfig>,
  _req: NextApiRequest,
  res: NextApiResponse
) => {
  return res.json({ page: 'Process Callback get' });
};
