import type { Context } from 'hono'
import { AuthService } from './auth.service.js'

export class AuthController {
  constructor(private service: AuthService) {}

  // Signup handler
  signup = async (c: Context) => {
    try {
      const body = await c.req.json()
      const result = await this.service.signup(body)
      return c.json({ message: 'User registered successfully', ...result }, 201)
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ error: error.message }, 400)
      }
      return c.json({ error: 'An unknown error occurred during signup' }, 400)
    }
  }

  // Login handler
  login = async (c: Context) => {
    try {
      const body = await c.req.json()
      const token = await this.service.login(body)
      return c.json({ message: 'Login successful', token })
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ error: error.message }, 401)
      }
      return c.json({ error: 'An unknown error occurred during login' }, 401)
    }
  }
}
