import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createSession, getAllSessionsForUser, updateSession } from './session.service'
import { createActiveDummySession, createInactiveDummySession } from "../utils/helper";
import Session from "../models/session.model";

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
})

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
})

describe('createSession', () => {
  const testEmail = 'test@email.com'

  it('should resolve with true and valid userId', async () => {
    await expect(createSession(testEmail)).resolves.toEqual({
      _id: expect.anything(),
      userEmail: testEmail,
      active: true,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      __v: 0,
    })
  })
})

describe('getAllSessionsForUser', () => {
  it('returns only active sessions for a given user', async () => {
    await expect(getAllSessionsForUser('fakeemail@email.com')).resolves.toEqual([])
  })

  it('returns only active sessions for a given user', async () => {
    const testEmail = 'newtest@email.com'
    const session = await createActiveDummySession(testEmail)
    const inactiveSession = await createInactiveDummySession(testEmail)
    await expect(getAllSessionsForUser(testEmail)).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: session._id}),
      ])
    )
    await expect(getAllSessionsForUser(testEmail)).resolves.not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: inactiveSession._id}),
      ])
    );
  })
})

describe('updateSession', () => {
  it('should resolve with true and valid userId', async () => {
    const testEmail = 'testupdate@email.com'
    const activeSession = await createActiveDummySession(testEmail)
    await updateSession(activeSession._id)
    const updatedSession = await Session.findById(activeSession._id)
    expect(updatedSession!.active).toBe(false)
  })
})
