import jwt from 'jsonwebtoken';

export const generateAccessToken = (payload: string | object) => {
  return jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: '15m',
  });
};
