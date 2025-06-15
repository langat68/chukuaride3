// src/index.ts
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRouter from './users/users.router.js'
import carRouter from './cars/cars.router.js'
import bookingRouter from '././Bookings/booking.router.js'

const app = new Hono()

app.get('/', (c) => c.text('Hello Node.js!'))

app.route('/users', userRouter)
app.route('/cars', carRouter) // 👈 Register the cars route
app.route('/bookings', bookingRouter)

serve(app)
