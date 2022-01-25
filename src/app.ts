import express, { Request, Response, NextFunction } from 'express'
import config from 'config'
import db from './utils/db'
import routes from './routes'
import deserialize from './middleware/deserialize'

const app = express()
const port = config.get('port')

app.use(express.json())
app.use(deserialize);

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`)

  await db.open()
  routes(app)
})
