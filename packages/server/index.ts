require('dotenv').config({ path: '../../.env' })

import express from 'express'
import bodyParser from 'body-parser'
import {
  setupSession,
  setupCors,
  setupSequelize,
  setupRoutes,
  setupPassport,
  checkEnvironmentVariables,
} from './src/setup'

function initialize(): void {
  const app = express()
  const { PORT = 5000 } = process.env

  // make sure all proper environment variables are present
  checkEnvironmentVariables()

  setupSequelize()
  setupPassport()
  setupSession(app)
  setupCors(app)

  // disables cached 304 calls (not sure if best solution)
  app.disable('etag')

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // setup routing
  setupRoutes(app)

  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  })
}

initialize()

// const { PORT = 5000 } = process.env;

// app.use(express.static("./build"));

// app.get("/", (req, res) => {
//   res.send({ message: "server is working!" });
// })

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`)
// })
