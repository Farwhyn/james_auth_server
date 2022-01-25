import faker from 'faker'
import User from '../models/user.model'
import Session from '../models/session.model'

type DummyUser = { email: string, password: string, username: string, _id: any }
type DummySession = { active: boolean, userId: any, _id: any }

export async function createDummyUser(): Promise<DummyUser> {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.name.firstName()
  }
  const dbUser = await User.create(user)
  return {...user, _id: dbUser._id }
}

export async function createActiveDummySession(): Promise<DummySession> {
  const session = {
    userId: 'test'
  }
  const dbSession = await User.create(session)
  return {...session, active: true, _id: dbSession._id }
}

export async function createInactiveDummySession(): Promise<DummySession> {
  const session = {
    userId: 'test'
  }
  const dbSession = await User.create(session)
  return {...session, active: false, _id: dbSession._id }
}