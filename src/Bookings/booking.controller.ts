// src/Bookings/booking.controller.ts
import type { Context } from 'hono'
import { z } from 'zod'
import { BookingService } from './booking.services.js'

export const bookingSchema = z.object({
  userId: z.number(),
  carId: z.number(),
  pickupTime: z.string().datetime(),
  returnTime: z.string().datetime(),
  priceEstimate: z.string(),
  confirmed: z.boolean().optional(),
})

export class BookingController {
  constructor(private service: BookingService) {}

  getAll = async (c: Context) => {
    const data = await this.service.getAll()
    return c.json(data)
  }

  getByUserId = async (c: Context) => {
    const userId = Number(c.req.query('userId'))
    if (isNaN(userId)) return c.json({ error: 'Invalid userId' }, 400)

    const data = await this.service.getByUserId(userId)
    return c.json(data)
  }

  getById = async (c: Context) => {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid booking ID' }, 400)

    const data = await this.service.getById(id)
    return c.json(data)
  }

  create = async (c: Context) => {
    const body = await c.req.json()
    const parsed = bookingSchema.safeParse(body)

    if (!parsed.success) {
      return c.json({ error: parsed.error.errors }, 400)
    }

    const created = await this.service.create({
      ...parsed.data,
      pickupTime: new Date(parsed.data.pickupTime),
      returnTime: new Date(parsed.data.returnTime),
    })

    return c.json(created[0])
  }

  update = async (c: Context) => {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid booking ID' }, 400)

    const body = await c.req.json()
    const updated = await this.service.update(id, body)
    return c.json(updated[0])
  }

  delete = async (c: Context) => {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid booking ID' }, 400)

    const deleted = await this.service.delete(id)
    return c.json(deleted[0])
  }
}
