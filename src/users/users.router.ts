import { Hono } from 'hono'
import { UserController } from '../users/users.controllers.js'
import { UserService } from '../users/user.service.js'

// You'll need to initialize your database connection here
// import { db } from '../../db' // Your database instance

export function createUserRouter(db: any) {
  const userRouter = new Hono()
  const userService = new UserService(db)
  const userController = new UserController(userService)

  // POST /users - Create a new user
  userRouter.post('/', async (c) => {
    return userController.createUser(c)
  })

  // GET /users - Get all users
  userRouter.get('/', async (c) => {
    return userController.getAllUsers(c)
  })

  // GET /users/:id - Get user by ID
  userRouter.get('/:id', async (c) => {
    return userController.getUserById(c)
  })

  // PUT /users/:id - Update user by ID
  userRouter.put('/:id', async (c) => {
    return userController.updateUser(c)
  })

  // DELETE /users/:id - Delete user by ID
  userRouter.delete('/:id', async (c) => {
    return userController.deleteUser(c)
  })

  // POST /users/login - Login user
  userRouter.post('/login', async (c) => {
    return userController.loginUser(c)
  })

  return userRouter
}