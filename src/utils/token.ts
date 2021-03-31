import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';

interface JwtTokenPayload {
  destination: string;
  code: string;
  [key: string]: string | number | boolean;
}

export const generateCode = () => nanoid(10);

export const generateToken = (
  payload: JwtTokenPayload,
  secret: string,
  expiry: string
): Promise<string> =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: expiry }, (err, token) => {
      if (err) reject(err);
      if (!token) reject('Token was not generated');
      else resolve(token);
    });
  });

export const decodeToken = (token: string, secret: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, data) => {
      if (err) reject(err);
      if (!data) reject('Token cannot be decoded');
      else resolve(data);
    });
  });
