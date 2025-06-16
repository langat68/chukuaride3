import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { AuthService } from './auth.service.js'
import { AuthController } from './auth.controller.js'
import { userSchema, loginSchema } from '../validator.js' 

const authRouter = new Hono()
const service = new AuthService()
const controller = new AuthController(service)

// Apply validation using zValidator
authRouter.post('/signup', zValidator('json', userSchema), controller.signup)
authRouter.post('/login', zValidator('json', loginSchema), controller.login)

export default authRouter
