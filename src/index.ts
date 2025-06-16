// src/index.ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRouter from './users/users.router.js'
import carRouter from './cars/cars.router.js'
import bookingRouter from './Bookings/booking.router.js'
import rentalRouter from './Rentals/rentals.router.js'
import supportRouter from './Requests/request.router.js'
import feedbackRouter from './feedback/feedback.router.js'
import paymentRouter from './Payments/payments.router.js'

const app = new Hono()

app.get('/', (c) => c.text('Hello Node.js!'))

app.route('/users', userRouter)
app.route('/cars', carRouter)
app.route('/bookings', bookingRouter)
app.route('/rentals', rentalRouter)
app.route('/support', supportRouter)
app.route('/feedback', feedbackRouter)
app.route('/payments', paymentRouter)

serve(app)
