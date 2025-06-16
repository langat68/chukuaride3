
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { rentalSchema } from '../validator.js' 
import { RentalService } from './rentals.service.js'
import { RentalController } from './rentals.controller.js'

const rentalRouter = new Hono()

const rentalService = new RentalService()
const rentalController = new RentalController(rentalService)

// validation to POST and PUT routes
rentalRouter.post('/', zValidator('json', rentalSchema), rentalController.createRental)
rentalRouter.get('/', rentalController.getAllRentals)
rentalRouter.get('/:id', rentalController.getRentalById)
rentalRouter.put('/:id', zValidator('json', rentalSchema), rentalController.updateRental)
rentalRouter.delete('/:id', rentalController.deleteRental)

export default rentalRouter
