import express, { Request, Response } from 'express'
import { isAuthenticated } from '../middleware/authentication'

const router = express.Router()

router.get('/player', isAuthenticated, (req: Request, res: Response) => {
  res.status(200).send({
    player: req.user,
  })
})

export default router
