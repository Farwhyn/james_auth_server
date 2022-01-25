import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import User, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
  try {
    const user = await User.create(input);

    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error)
  }
}

export async function validatePassword({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  return isValid ? omit(user.toJSON(), "password") : false
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean()
}
