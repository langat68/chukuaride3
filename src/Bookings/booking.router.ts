import { Hono } from 'hono'
import { BookingService } from './booking.services.js'
import { BookingController } from '../Bookings/booking.controller.js'

const bookingRouter = new Hono()
const bookingService = new BookingService()
const bookingController = new BookingController(bookingService)

bookingRouter.get('/', bookingController.getAll)
bookingRouter.get('/:id', bookingController.getById)
bookingRouter.post('/', bookingController.create)
bookingRouter.put('/:id', bookingController.update)
bookingRouter.delete('/:id', bookingController.delete)

export default bookingRouter
