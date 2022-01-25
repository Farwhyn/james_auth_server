import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({ required_error: "username is required" }),
    password: string({
      required_error: "password is required",
    }).min(5, "password should be at least 5 characters long"),
    email: string({
      required_error: "email is required",
    }).email("email format is invalid"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>
