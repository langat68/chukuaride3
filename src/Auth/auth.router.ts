import { Hono } from 'hono'
import { AuthService } from './auth.service.js'
import { AuthController } from './auth.controller.js'

const authRouter = new Hono()
const service = new AuthService()
const controller = new AuthController(service)

authRouter.post('/signup', controller.signup)
authRouter.post('/login', controller.login)

export default authRouter
