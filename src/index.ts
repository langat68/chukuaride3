import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

// Routers
import userRouter from './users/users.router.js'
import carRouter from './cars/cars.router.js'
import bookingRouter from './Bookings/booking.router.js'
import rentalRouter from './Rentals/rentals.router.js'
import supportRouter from './Requests/request.router.js'
import feedbackRouter from './feedback/feedback.router.js'
import paymentRouter from './Payments/payments.router.js'
import authRouter from './Auth/auth.router.js'

const app = new Hono()

// Middleware
app.use('*', logger())

app.use('*', cors({
  origin: (origin) => {
    if (!origin) return false

    // Allow localhost during development
    if (
      origin === 'http://localhost:5173' ||
      origin === 'http://localhost:3000'
    ) return true

    // Allow production base domain
    if (origin === 'https://frontend-chukuaride-v2.vercel.app') return true

    // Allow Vercel preview deployments
    if (origin.endsWith('.vercel.app')) return true

    return false
  },
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}))

// Root route
app.get('/', (c) => c.text('Welcome to Chukuaride! 🚗'))

// Routes
app.route('/auth', authRouter)
app.route('/users', userRouter)
app.route('/cars', carRouter)
app.route('/bookings', bookingRouter)
app.route('/rentals', rentalRouter)
app.route('/support', supportRouter)
app.route('/feedback', feedbackRouter)
app.route('/payments', paymentRouter)

// Start server
serve(app)
