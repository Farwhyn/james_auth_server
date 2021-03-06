import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from '../services/user.service'

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const user = await createUser(req.body)
    return res.send(user);
  } catch (error: any) {
    return res.status(409).send({
      error: {
        type: 'user_already_exists', 
        message: error.message
      }
    })
  }
}
