import { Request, Response } from "express";
import config from "config";
import {
  createSession,
  getAllSessionsForUser,
  updateSession,
} from "../services/session.service";
import { verifyCredentials } from "../services/user.service";
import { signToken } from "../services/jwt.service";

export async function loginHandler(req: Request, res: Response) {
  const user = await verifyCredentials(req.body);

  if (!user) {
    return res.status(401).send("Invalid login information");
  }

  const session = await createSession(user.email);

  const accessToken = signToken(
    { ...user, session: session._id },
    { expiresIn: '10m' }
  );

  return res.send({ accessToken });
}

export async function getSessionsHandler(req: Request, res: Response) {
  const sessions = await getAllSessionsForUser(res.locals.user.email);
  return res.send(sessions);
}

export async function logoutHandler(req: Request, res: Response) {
  await updateSession(res.locals.user.session)

  return res.send({ accessToken: null }); // hope the front-end can delete the access token from storage
}
