import mongoose from "mongoose";
import supertest from "supertest";
import server from "../utils/server";
import * as UserService from "../services/user.service";

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

describe("Create new user", () => {
  describe("user registration verification", () => {
    describe("given the username and password are valid", () => {
      it("returns the user payload", async () => {
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
      it("returns 409 error", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          .mockRejectedValueOnce(new Error());

        const { statusCode } = await supertest(server())
          .post("/api/v1/signup")
          .send(userInput)

        expect(statusCode).toBe(409)
        expect(createUserServiceMock).toHaveBeenCalled()
      })
    })
  })
})
