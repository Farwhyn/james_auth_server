import { FilterQuery, UpdateQuery, ObjectId } from "mongoose";
import Session, { ISessionDocument } from "../models/session.model";

export async function createSession(email: string) {
  const session = await Session.create({ userEmail: email });

  return session.toJSON();
}

export async function getAllSessionsForUser(email: string) {
  const query: FilterQuery<ISessionDocument> = { userEmail: email, active: true }
  return Session.find(query).lean();
}

export async function updateSession(sessionId: ObjectId) {
  const query: FilterQuery<ISessionDocument> = { _id: sessionId }
  const update: UpdateQuery<ISessionDocument> = { active: false }
  return Session.updateOne(query, update);
}
