import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
  res.send({ express: 'The server is alive and well! 🏆' })
})

export default router
