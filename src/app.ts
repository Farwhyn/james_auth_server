import express from 'express'
import config from 'config'
import db from './utils/db'
import routes from './routes'

const app = express()
app.use(express.json())
const port = config.get('port')

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`)

  await db.open()
  routes(app)
})
