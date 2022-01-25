import { Express, NextFunction, Request, Response } from 'express'
import { getSessionsHandler, loginHandler, logoutHandler } from './controllers/login.controller';
import { createUserHandler } from './controllers/user.controller';
import validate from './middleware/validate'
import { createSessionSchema } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  return res.locals.user ? next() : res.sendStatus(403);
}

function routes(app: Express) {
  app.post('/api/v1/signup', validate(createUserSchema), createUserHandler);
  app.post(
    "/api/v1/login",
    validate(createSessionSchema),
    loginHandler
  )
  app.get("/api/v1/sessions", checkUser, getSessionsHandler)
  app.get("/api/v1/logout", checkUser, logoutHandler)
}

export default routes