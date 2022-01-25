import mongoose from "mongoose";
import supertest from "supertest";
import server from "../utils/server";
import * as UserService from "../services/user.service";
import * as SessionService from "../services/session.service";
import { loginHandler } from "../controllers/login.controller";

const app = server();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: "farwhyn@example.com",
  username: "farwhyn",
};

const userInput = {
  username: "james",
  email: "test@example.com",
  password: "Password123",
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  userEmail: userInput.email,
  active: true,
  createdAt: new Date("2021-09-30T13:31:07.674Z"),
  updatedAt: new Date("2021-09-30T13:31:07.674Z"),
  __v: 0,
};

describe("user", () => {
  describe("user registration", () => {
    describe("given the username and password are valid", () => {
      it("should return the user payload", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/v1/signup")
          .send(userInput)

        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);
        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given the user service throws", () => {
      it("should return a 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValueOnce(new Error());

        const { statusCode } = await supertest(server())
          .post("/api/v1/signup")
          .send(userInput);

        expect(statusCode).toBe(409);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe("create user session", () => {
    describe("given the username and password are valid", () => {
      it("should return a signed accessToken & refresh token", async () => {
        jest
          .spyOn(UserService, "verifyCredentials")
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return "a user agent";
          },
          body: {
            email: "test@example.com",
            password: "Password123",
          },
        };

        const send = jest.fn();

        const res = {
          send,
        };

        // @ts-ignore
        await loginHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String)
        });
      });
    });
  });
});
