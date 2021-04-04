import { NextApiRequest, NextApiResponse } from 'next';
import { serialize, parse } from 'cookie';

export const setTokenCookie = (
  res: NextApiResponse,
  token: any,
  tokenName: string,
  maxAge: number
) => {
  const cookie = serialize(tokenName, token, {
    maxAge: maxAge / 1000,
    expires: new Date(Date.now() + maxAge),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
};

export const removeTokenCookie = (res: NextApiResponse, tokenName: string) => {
  const cookie = serialize(tokenName, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
};

export const parseCookies = (req: NextApiRequest) => {
  // No need to parse cookies from 'req' Node object (API)
  if (req.cookies) return req.cookies;

  // Parse cookies on frontend
  const cookie = req.headers?.cookie;
  return parse(cookie || '');
};

export const getTokenCookie = (req: NextApiRequest, tokenName: string) => {
  const cookies = parseCookies(req);
  return cookies[tokenName];
};
