import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

type JwtTokenPayload = {
  destination: string;
  code: string;
};

export const generateCode = () => nanoid(10);

export const generateToken = (payload: JwtTokenPayload, secret: string, expiry: string) =>
  jwt.sign(payload, secret, { expiresIn: expiry });

export const decodeToken = (token: string, secret: string): JwtTokenPayload | false => {
  try {
    return jwt.verify(token, secret) as JwtTokenPayload;
  } catch (e) {
    return false;
  }
};
