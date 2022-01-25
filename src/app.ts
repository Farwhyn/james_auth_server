import express from 'express'
import config from 'config'
import db from './utils/db'
import routes from './routes'
import deserialize from './middleware/deserialize'

const app = express()
app.use(express.json())
app.use(deserialize);
const port = config.get('port')

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`)

  await db.open()
  routes(app)
})
