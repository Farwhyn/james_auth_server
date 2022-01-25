import mongoose from "mongoose";
import * as UserService from "../services/user.service";
import * as SessionService from "../services/session.service";
import { loginHandler } from "./login.controller";

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

describe("Session management", () => {
  describe("user login", () => {
    describe("given the username and password are valid", () => {
      it("returns a signed accessToken", async () => {
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
        }

        // @ts-ignore
        await loginHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String)
        })
      })
    })
  })

  describe("user login", () => {
    describe("given the username and password are valid", () => {
      it("returns a signed accessToken", async () => {
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
        })
      })
    })
  })
})