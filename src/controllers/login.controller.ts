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

  const session = await createSession(user._id);

  const accessToken = signToken(
    { ...user, session: session._id },
    { expiresIn: '10m' }
  );

  return res.send({ accessToken });
}

export async function getSessionsHandler(req: Request, res: Response) {
  const sessions = await getAllSessionsForUser({ userId: res.locals.user._id, active: true });
  return res.send(sessions);
}

export async function logoutHandler(req: Request, res: Response) {
  await updateSession({ _id: res.locals.user.session }, { active: false });

  return res.send({ accessToken: null });
}
