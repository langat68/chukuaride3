// src/rentals/rental.router.ts
import { Hono } from 'hono'
import { RentalService } from './rentals.service.js'
import { RentalController } from './rentals.controller.js'

const rentalRouter = new Hono()

const rentalService = new RentalService()
const rentalController = new RentalController(rentalService)

rentalRouter.post('/', rentalController.createRental)
rentalRouter.get('/', rentalController.getAllRentals)
rentalRouter.get('/:id', rentalController.getRentalById)
rentalRouter.put('/:id', rentalController.updateRental)
rentalRouter.delete('/:id', rentalController.deleteRental)

export default rentalRouter
