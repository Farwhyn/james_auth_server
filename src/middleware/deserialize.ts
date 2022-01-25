import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt.service";

export default async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) return next();

  const { decoded } = verifyToken(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  return next();
};
