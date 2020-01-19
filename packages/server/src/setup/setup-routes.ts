import express from 'express'
import heartbeat from '../routes/heartbeat'
import authentication from '../routes/authentication'
import player from '../routes/player'

export function setupRoutes(app: express.Application): void {
  app.use('/api', heartbeat)
  app.use('/api', authentication)
  app.use('/player', player)
}
