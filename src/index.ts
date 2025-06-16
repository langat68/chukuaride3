// src/index.ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger'

import userRouter from './users/users.router.js'
import carRouter from './cars/cars.router.js'
import bookingRouter from './Bookings/booking.router.js'
import rentalRouter from './Rentals/rentals.router.js'
import supportRouter from './Requests/request.router.js'
import feedbackRouter from './feedback/feedback.router.js'
import paymentRouter from './Payments/payments.router.js'

const app = new Hono()

// ✅ Use logger middleware before routes
app.use('*', logger())

// OR, for custom log format (uncomment if you prefer this):
// app.use('*', async (c, next) => {
//   const start = Date.now()
//   await next()
//   const ms = Date.now() - start
//   console.log(`[${new Date().toISOString()}] ${c.req.method} ${c.req.path} - ${c.res.status} (${ms}ms)`)
// })

app.get('/', (c) => c.text('Hello Node.js!'))

// Mount all routers
app.route('/users', userRouter)
app.route('/cars', carRouter)
app.route('/bookings', bookingRouter)
app.route('/rentals', rentalRouter)
app.route('/support', supportRouter)
app.route('/feedback', feedbackRouter)
app.route('/payments', paymentRouter)

serve(app)
