import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { ISessionDocument } from "../models/session.model";

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
