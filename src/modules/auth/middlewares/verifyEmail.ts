import type { NextFunction, Request, Response } from 'express';
import { User } from '../../users';

export default async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const user = await User.findByPk(req.decoded.userId, { raw: true });
  if (!user) {
    return res.status(401).send({ error: 'Unauthorized: User not found.' });
  }
  if (!user.emailVerified) {
    return res.status(401).send({ error: 'Unauthorized. Email verification needed.' });
  }
  return next();
};
