import type  { Context } from 'hono'
import { UserService } from './user.service.js'
import { z } from 'zod'

// Validation schemas
const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'staff', 'customer']).optional(),
  name: z.string().optional(),
})

const updateUserSchema = z.object({
  email: z.string().email('Invalid email format').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.enum(['admin', 'staff', 'customer']).optional(),
  name: z.string().optional(),
})

const idSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
})

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(c: Context) {
    try {
      const body = await c.req.json()
      const validatedData = createUserSchema.parse(body)

      // Check if user already exists
      const existingUser = await this.userService.getUserByEmail(validatedData.email)
      if (existingUser) {
        return c.json({ error: 'User with this email already exists' }, 409)
      }

      const newUser = await this.userService.createUser(validatedData)
      return c.json({ 
        message: 'User created successfully', 
        user: newUser 
      }, 201)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ 
          error: 'Validation failed', 
          details: error.errors 
        }, 400)
      }
      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  async getAllUsers(c: Context) {
    try {
      const users = await this.userService.getAllUsers()
      return c.json({ users })
    } catch (error) {
      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  async getUserById(c: Context) {
    try {
      const params = idSchema.parse({ id: c.req.param('id') })
      const user = await this.userService.getUserById(params.id)

      if (!user) {
        return c.json({ error: 'User not found' }, 404)
      }

      return c.json({ user })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ 
          error: 'Invalid user ID', 
          details: error.errors 
        }, 400)
      }
      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  async updateUser(c: Context) {
    try {
      const params = idSchema.parse({ id: c.req.param('id') })
      const body = await c.req.json()
      const validatedData = updateUserSchema.parse(body)

      // Check if user exists
      const existingUser = await this.userService.getUserById(params.id)
      if (!existingUser) {
        return c.json({ error: 'User not found' }, 404)
      }

      // Check if email is being updated and if it's already taken
      if (validatedData.email && validatedData.email !== existingUser.email) {
        const emailExists = await this.userService.getUserByEmail(validatedData.email)
        if (emailExists) {
          return c.json({ error: 'Email already in use' }, 409)
        }
      }

      const updatedUser = await this.userService.updateUser(params.id, validatedData)
      return c.json({ 
        message: 'User updated successfully', 
        user: updatedUser 
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ 
          error: 'Validation failed', 
          details: error.errors 
        }, 400)
      }
      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  async deleteUser(c: Context) {
    try {
      const params = idSchema.parse({ id: c.req.param('id') })
      
      // Check if user exists
      const existingUser = await this.userService.getUserById(params.id)
      if (!existingUser) {
        return c.json({ error: 'User not found' }, 404)
      }

      const deletedUser = await this.userService.deleteUser(params.id)
      return c.json({ 
        message: 'User deleted successfully', 
        user: deletedUser 
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({ 
          error: 'Invalid user ID', 
          details: error.errors 
        }, 400)
      }
      return c.json({ error: 'Internal server error' }, 500)
    }
  }

  async loginUser(c: Context) {
    try {
      const body = await c.req.json()
      const { email, password } = body

      if (!email || !password) {
        return c.json({ error: 'Email and password are required' }, 400)
      }

      const user = await this.userService.verifyPassword(email, password)
      if (!user) {
        return c.json({ error: 'Invalid credentials' }, 401)
      }

      // Return user data without password hash
      const { passwordHash, ...userWithoutPassword } = user
      return c.json({ 
        message: 'Login successful', 
        user: userWithoutPassword 
      })
    } catch (error) {
      return c.json({ error: 'Internal server error' }, 500)
    }
  }
}