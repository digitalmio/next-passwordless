import type { NextApiRequest, NextApiResponse } from 'next';

interface INextPasswordlessConfig {
  cookieName?: string;
  cookieMaxAge?: number;
}

export const NextPasswordless = (_config: INextPasswordlessConfig) => (req: NextApiRequest, res: NextApiResponse): void => {
  const { nextPasswordless: path } = req.query;

  // root path, post to generate and send token
  if (!path && req.method === "POST") {
    return res.json({ page: "Homepage post" });
  }

  // callback url
  if (path?.length === 1 && path[0] === 'callback' && req.method === "GET") {
    return res.json({ page: "Callback get" });
  }

  // defaults to 404
  return res.status(404).json({
    message: "Page not found",
    status: 404,
  });
};