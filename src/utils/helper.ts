import faker from 'faker'
import User from '../models/user.model'
import Session from '../models/session.model'
import { ObjectId } from 'mongoose'

type DummyUser = { email: string, password: string, username: string, _id: ObjectId }
type DummySession = { active: boolean, userEmail: string, _id: ObjectId }

export async function createDummyUser(): Promise<DummyUser> {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.name.firstName()
  }
  const dbUser = await User.create(user)
  return {...user, _id: dbUser._id }
}

export async function createActiveDummySession(email: string): Promise<DummySession> {
  const session = {
    userEmail: email
  }
  const dbSession = await Session.create(session)
  return {...session, active: true, _id: dbSession._id }
}

export async function createInactiveDummySession(email: string): Promise<DummySession> {
  const session = {
    userEmail: email,
    active: false
  }

  const dbSession = await Session.create(session)
  return {...session, _id: dbSession._id }
}
