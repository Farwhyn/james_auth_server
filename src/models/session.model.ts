import mongoose from "mongoose";
import { IUserDocument } from "./user.model";

export interface ISessionDocument extends mongoose.Document {
  userId: IUserDocument["_id"]
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const sessionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

const Session = mongoose.model<ISessionDocument>("Session", sessionSchema)

export default Session
