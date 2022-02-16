import { Router } from 'express'
import { signin, signup, profile } from '../controllers/auth.controller'
import { TokenValidation } from '../libs/verifyTokens'

const router: Router = Router()

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/profile', TokenValidation, profile)


export default router