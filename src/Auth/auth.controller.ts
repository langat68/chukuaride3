import type { Context } from 'hono'
import { AuthService } from './auth.service.js'
import { sendWelcomeEmail } from './utils/mailer.js'

export class AuthController {
  constructor(private service: AuthService) {}

  // Signup handler
  signup = async (c: Context) => {
    try {
      const body = await c.req.json()

      // 1. Create the user
      const result = await this.service.signup(body)

      // 2. Send welcome email
      try {
        const info = await sendWelcomeEmail(result.user.email, result.user.name ?? 'user')
        if (info.accepted.includes(result.user.email)) {
          console.log('✅ Welcome email sent to', result.user.email)
        } else {
          console.warn('⚠️ Email not accepted:', info.rejected)
        }
      } catch (emailError) {
        console.error('❌ Failed to send email:', emailError)
      }

      // 3. Respond to client
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
      const { user, token } = await this.service.login(body)
      return c.json({ message: 'Login successful', token, user }) // ✅ include user in response
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ error: error.message }, 401)
      }
      return c.json({ error: 'An unknown error occurred during login' }, 401)
    }
  }
}
