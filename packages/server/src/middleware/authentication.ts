import { Request, Response, NextFunction } from 'express'

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.user) {
    next()
  } else {
    if (req.session) {
      // user does not exist so clear the session
      req.session.destroy(() => null)
    } else {
      return res.status(401).json({
        error: 'user is not authenticated',
      })
    }
  }
}
