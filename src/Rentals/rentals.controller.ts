// ✅ rentals.controller.ts
import type { Context } from 'hono'
import { RentalService } from './rentals.service.js'

export class RentalController {
  constructor(private rentalService: RentalService) {}

  createRental = async (c: Context) => {
    const body = await c.req.json()

    const rental = await this.rentalService.createRental({
      userId: body.userId,
      carId: body.carId,
      pickupTime: body.pickupTime,
      returnTime: body.returnTime,
      totalCost: body.totalCost
    })

    return c.json(rental)
  }

  getAllRentals = async (c: Context) => {
    const rentals = await this.rentalService.getAllRentals()
    return c.json(rentals)
  }

  getRentalById = async (c: Context) => {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid rental ID' }, 400)

    const rental = await this.rentalService.getRentalById(id)
    if (!rental) return c.notFound()
    return c.json(rental)
  }

  getRentalsByUserId = async (c: Context) => {
    const userId = Number(c.req.query('userId'))
    if (isNaN(userId)) return c.json({ error: 'Invalid userId' }, 400)

    const rentals = await this.rentalService.getRentalsByUserId(userId)
    return c.json(rentals)
  }

  updateRental = async (c: Context) => {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid rental ID' }, 400)

    const body = await c.req.json()

    const data = {
      ...body,
      startedAt: body.startedAt ? new Date(body.startedAt) : undefined,
      endedAt: body.endedAt ? new Date(body.endedAt) : undefined,
    }

    const rental = await this.rentalService.updateRental(id, data)
    return c.json(rental)
  }

  deleteRental = async (c: Context) => {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid rental ID' }, 400)

    await this.rentalService.deleteRental(id)
    return c.body(null, 204)
  }
}
