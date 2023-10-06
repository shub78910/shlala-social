import jwt from 'jsonwebtoken';

const authMiddleware = (req: any, res: any, next: any) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || '';
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};

export default authMiddleware;
