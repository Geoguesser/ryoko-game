import express from 'express'
import bodyParser from 'body-parser'
import { Sequelize } from 'sequelize'
import { checkEnvironmentVariables } from './src/setup/setup-environment'
import { setupSession } from './src/setup/setup-session'
import { setupCors } from './src/setup/setup-cors'
import { setupSequelize } from './src/setup/setup-sequelize'
import { setupRoutes } from './src/setup/setup-routes'
import { setupPassport } from './src/setup/setup-passport'

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
