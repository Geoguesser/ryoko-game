import express from 'express'
import cors, { CorsOptions } from 'cors'
import { clientUrl } from '../utils/url'

export function setupCors(app: express.Application): void {
  const config: CorsOptions = {
    origin: clientUrl,
    credentials: true,
  }

  app.use(cors(config))
}
