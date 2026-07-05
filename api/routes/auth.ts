import { Router, type Request, type Response } from 'express'
import {
  getActiveUser,
  loginUser,
  registerUser,
} from '../data/platformData.js'
import type { LoginPayload, RegisterPayload } from '../../shared/platform.js'

const router = Router()

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const payload = req.body as RegisterPayload

  if (!payload.email || !payload.password || !payload.displayName || !payload.targetLanguage) {
    res.status(400).json({
      success: false,
      error: 'Missing required registration fields',
    })
    return
  }

  res.status(201).json({
    success: true,
    token: 'demo-access-token',
    user: registerUser(payload),
  })
})

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const payload = req.body as LoginPayload

  if (!payload.email || !payload.password) {
    res.status(400).json({
      success: false,
      error: 'Email and password are required',
    })
    return
  }

  res.status(200).json({
    success: true,
    token: 'demo-access-token',
    user: loginUser(payload),
  })
})

router.post('/logout', async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
  })
})

router.get('/me', async (_req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    success: true,
    user: getActiveUser(),
  })
})

export default router
