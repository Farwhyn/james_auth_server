import mongoose from "mongoose";
import { IUserDocument } from "./user.model";

export interface ISessionDocument extends mongoose.Document {
  userEmail: IUserDocument["email"]
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const sessionSchema = new mongoose.Schema(
  {
    userEmail: { type: mongoose.Schema.Types.String, ref: "User" },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const Session = mongoose.model<ISessionDocument>("Session", sessionSchema)

export default Session
