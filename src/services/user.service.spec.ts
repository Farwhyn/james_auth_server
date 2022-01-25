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

  it('successfully creates new user', async () => {
    await expect(createUser(userInput)).resolves.toEqual({
      _id: expect.anything(),
      email: userInput.email,
      username: userInput.username,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      __v: 0,
    })
  })

  it('throws error if user already exists', async () => {
    const dummy = await createDummyUser()
    const duplicateInput = {
      username: dummy.username,
      email: dummy.email,
      password: dummy.password,
    }
    await expect(createUser(duplicateInput)).rejects.toEqual(new Error(`${dummy.email} already exists`))
  })
})

describe('verifyCredentials', () => {
  it('successfully authenticates user login', async () => {
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

  it('rejects login with wrong credentials', async () => {
    const dummy = await createDummyUser()
    await expect(verifyCredentials(
      { email: dummy.email, password: 'random' }
    )).resolves.toEqual(false)
  })

  it('rejects login if email does not exist', async () => {
    await expect(verifyCredentials(
      { email: 'test@email.com', password: 'test1234' }
    )).resolves.toEqual(false)
  })
})
