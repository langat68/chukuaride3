// src/Bookings/booking.router.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { bookingSchema } from './booking.controller.js'
import { BookingService } from './booking.services.js'
import { BookingController } from './booking.controller.js'

const bookingRouter = new Hono()
const bookingService = new BookingService()
const bookingController = new BookingController(bookingService)

// GET /bookings - fetch all or by userId query
bookingRouter.get('/', bookingController.getAll)

// GET /bookings/by-user?userId=20
bookingRouter.get('/by-user', bookingController.getByUserId)

// GET /bookings/:id - fetch booking by ID
bookingRouter.get('/:id', bookingController.getById)

// POST /bookings - create new booking
bookingRouter.post('/', zValidator('json', bookingSchema), bookingController.create)

// PUT /bookings/:id - update booking
bookingRouter.put('/:id', zValidator('json', bookingSchema), bookingController.update)

// DELETE /bookings/:id - delete booking
bookingRouter.delete('/:id', bookingController.delete)

export default bookingRouter
