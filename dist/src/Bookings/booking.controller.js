import { z } from 'zod';
import { BookingService } from './booking.services.js';
const bookingSchema = z.object({
    userId: z.number(),
    carId: z.number(),
    pickupTime: z.string().datetime(),
    returnTime: z.string().datetime(),
    priceEstimate: z.string(),
    confirmed: z.boolean().optional(),
});
export class BookingController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (c) => {
        const data = await this.service.getAll();
        return c.json(data);
    };
    getById = async (c) => {
        const id = Number(c.req.param('id'));
        const data = await this.service.getById(id);
        return c.json(data);
    };
    create = async (c) => {
        const body = await c.req.json();
        const parsed = bookingSchema.safeParse(body);
        if (!parsed.success) {
            return c.json({ error: parsed.error.errors }, 400);
        }
        const created = await this.service.create({
            ...parsed.data,
            pickupTime: new Date(parsed.data.pickupTime),
            returnTime: new Date(parsed.data.returnTime),
        });
        return c.json(created[0]);
    };
    update = async (c) => {
        const id = Number(c.req.param('id'));
        const body = await c.req.json();
        const updated = await this.service.update(id, body);
        return c.json(updated[0]);
    };
    delete = async (c) => {
        const id = Number(c.req.param('id'));
        const deleted = await this.service.delete(id);
        return c.json(deleted[0]);
    };
}
