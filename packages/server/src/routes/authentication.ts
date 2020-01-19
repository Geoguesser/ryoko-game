import express, { Request, Response } from 'express'
import passport from 'passport'
import { clientUrl } from '../utils/url'

const router = express.Router()

// route the client will hit
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))

// google redirects to this route after login
router.get(
  '/auth/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/login/failed',
    successRedirect: clientUrl,
  })
)

// if login was unsuccessfull then they are sent here
router.get('/auth/login/failed', (req: Request, res: Response) => {
  res.status(401).send({
    success: false,
    message: 'user failed to authenticate',
  })
})

// log user out
router.get('/auth/logout', (req: Request, res: Response) => {
  req.logout()
  res.redirect(clientUrl)
})

export default router
