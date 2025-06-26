// src/rentals/rentals.router.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { rentalSchema } from '../validator.js'
import { RentalService } from './rentals.service.js'
import { RentalController } from './rentals.controller.js'

const rentalRouter = new Hono()

const rentalService = new RentalService()
const rentalController = new RentalController(rentalService)

// GET /rentals/by-user?userId=123
rentalRouter.get('/by-user', rentalController.getRentalsByUserId)

// GET all rentals
rentalRouter.get('/', rentalController.getAllRentals)

// GET rental by ID
rentalRouter.get('/:id', rentalController.getRentalById)

// POST rental
rentalRouter.post('/', zValidator('json', rentalSchema), rentalController.createRental)

// PUT rental by ID
rentalRouter.put('/:id', zValidator('json', rentalSchema), rentalController.updateRental)

// DELETE rental by ID
rentalRouter.delete('/:id', rentalController.deleteRental)

export default rentalRouter
