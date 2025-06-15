import { Hono } from 'hono'
import { UserController } from '../users/users.controllers.js'

const userRouter = new Hono()
const controller = new UserController()

userRouter.post('/', (c) => controller.create(c))
userRouter.get('/', (c) => controller.getAll(c))
userRouter.get('/:id', (c) => controller.getById(c))
userRouter.put('/:id', (c) => controller.update(c))
userRouter.delete('/:id', (c) => controller.delete(c))

export default userRouter
