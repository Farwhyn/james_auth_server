import { get } from "lodash";
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { ISessionDocument } from "../models/session.model";
import { verifyToken, signToken } from "./jwt.service";
import { getUser } from "./user.service";

export async function createSession(userId: string) {
  const session = await Session.create({ userId });

  return session.toJSON();
}

export async function getAllSessionsForUser(query: FilterQuery<ISessionDocument>) {
  return Session.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<ISessionDocument>,
  update: UpdateQuery<ISessionDocument>
) {
  return Session.updateOne(query, update);
}

export async function createAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyToken(refreshToken);

  if (!decoded || !get(decoded, "session")) return false;

  const session = await Session.findById(get(decoded, "session"));

  if (!session || !session.active) return false;

  const user = await getUser({ _id: session.userId });

  if (!user) return false;

  const accessToken = signToken(
    { ...user, session: session.userId },
    { expiresIn: '10m' } // 15 minutes
  );

  return accessToken
}
