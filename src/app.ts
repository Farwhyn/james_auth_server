import express, { Request, Response, NextFunction } from 'express'
import config from 'config'
import db from './utils/db'
import server from './utils/server'

const port = config.get('port')
const app = server()

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`)

  await db.open()
})
