import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { bookingSchema } from '../validator.js'
import { BookingService } from './booking.services.js'
import { BookingController } from './booking.controller.js'

const bookingRouter = new Hono()
const bookingService = new BookingService()
const bookingController = new BookingController(bookingService)

// ✅ Return all or filtered by ?userId=...
bookingRouter.get('/', async (c) => {
  try {
    const userIdParam = c.req.query('userId')

    if (userIdParam) {
      const userId = Number(userIdParam)
      if (isNaN(userId)) return c.json({ error: 'Invalid userId' }, 400)

      const userBookings = await bookingService.getByUserId(userId)
      return c.json(userBookings)
    }

    return bookingController.getAll(c)
  } catch (err) {
    console.error('❌ Failed to fetch bookings:', err)
    return c.text('Internal Server Error', 500)
  }
})


bookingRouter.get('/:id', bookingController.getById)
bookingRouter.post('/', zValidator('json', bookingSchema), bookingController.create)
bookingRouter.put('/:id', zValidator('json', bookingSchema), bookingController.update)
bookingRouter.delete('/:id', bookingController.delete)

export default bookingRouter
