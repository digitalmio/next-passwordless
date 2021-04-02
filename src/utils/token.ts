import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

interface JwtTokenPayload {
  destination: string;
  code: string;
  [key: string]: string | number | boolean;
}

export const generateCode = () => nanoid(10);

export const generateToken = (payload: JwtTokenPayload, secret: string, expiry: string) =>
  jwt.sign(payload, secret, { expiresIn: expiry });

export const decodeToken = (token: string, secret: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return false;
  }
};
