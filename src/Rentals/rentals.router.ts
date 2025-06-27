
// ✅ rentals.router.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { rentalSchema, createRentalSchema } from '../validator.js'
import { RentalService } from './rentals.service.js'
import { RentalController } from './rentals.controller.js'

const rentalRouter = new Hono()

const rentalService = new RentalService()
const rentalController = new RentalController(rentalService)

rentalRouter.get('/by-user', rentalController.getRentalsByUserId)
rentalRouter.get('/', rentalController.getAllRentals)
rentalRouter.get('/:id', rentalController.getRentalById)
rentalRouter.post('/', zValidator('json', createRentalSchema), rentalController.createRental)
rentalRouter.put('/:id', zValidator('json', rentalSchema), rentalController.updateRental)
rentalRouter.delete('/:id', rentalController.deleteRental)

export default rentalRouter
