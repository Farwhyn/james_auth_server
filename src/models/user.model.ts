import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface ICreateUserInput {
  username: string
  email: string
  password: string
}

export interface IUserDocument extends mongoose.Document {
  username: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  comparePassword(password: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password).catch((error) => false);
}

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(config.get('saltFactor'))
    const hash = await bcrypt.hashSync(this.password, salt)
    this.password = hash
  }

  return done()
})

const User = mongoose.model<IUserDocument>("User", userSchema)
export default User
