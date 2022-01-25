import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createUser, verifyCredentials } from './user.service'
import { createDummyUser } from "../utils/helper";

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
})

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
})

describe('createUser', () => {
  const userInput = {
    username: "james",
    email: "test@example.com",
    password: "Password123",
  }

  it('should resolve with true and valid userId', async () => {
    await expect(createUser(userInput)).resolves.toEqual({
      _id: expect.anything(),
      email: userInput.email,
      username: userInput.username,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      __v: 0,
    })
  })
})

describe('verifyCredentials', () => {
  it('should return JWT token, userId, expireAt to a valid login/password', async () => {
    const dummy = await createDummyUser()
    await expect(verifyCredentials({ email: dummy.email, password: dummy.password })).resolves.toEqual({
      _id: dummy._id,
      email: dummy.email,
      username: dummy.username,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      __v: 0,
    })
  })

  it('should reject with error if login does not exist', async () => {
    const dummy = await createDummyUser()
    await expect(verifyCredentials(
      { email: dummy.email, password: 'random' }
    )).resolves.toEqual(false)
  })

  it('should reject with error if password is wrong', async () => {
    await expect(verifyCredentials(
      { email: 'test@email.com', password: 'test1234' }
    )).resolves.toEqual(false)
  })
})
