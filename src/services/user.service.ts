import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { ICreateUserInput } from "../models/user.model";

type InputCredentialType = {
  email: string;
  password: string;
};

export async function createUser(input: ICreateUserInput) {
  try {
    const user = await User.create(input);

    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function verifyCredentials({ email, password }: InputCredentialType) {
  const user = await User.findOne({ email });
  if (!user) return false

  const isValid = await user.comparePassword(password);
  return isValid ? omit(user.toJSON(), "password") : false
}
