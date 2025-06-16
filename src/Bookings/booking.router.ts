import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { bookingSchema } from '../validator.js' 
import { BookingService } from './booking.services.js'
import { BookingController } from './booking.controller.js'

const bookingRouter = new Hono()
const bookingService = new BookingService()
const bookingController = new BookingController(bookingService)

bookingRouter.get('/', bookingController.getAll)
bookingRouter.get('/:id', bookingController.getById)

// ✅ Validate body before passing to controller
bookingRouter.post('/', zValidator('json', bookingSchema), bookingController.create)
bookingRouter.put('/:id', zValidator('json', bookingSchema), bookingController.update)

bookingRouter.delete('/:id', bookingController.delete)

export default bookingRouter
