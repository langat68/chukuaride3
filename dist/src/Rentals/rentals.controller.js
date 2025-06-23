import { RentalService } from './rentals.service.js';
export class RentalController {
    rentalService;
    constructor(rentalService) {
        this.rentalService = rentalService;
    }
    createRental = async (c) => {
        const body = await c.req.json();
        // Convert string timestamps to Date objects
        const data = {
            ...body,
            startedAt: body.startedAt ? new Date(body.startedAt) : undefined,
            endedAt: body.endedAt ? new Date(body.endedAt) : undefined,
        };
        const rental = await this.rentalService.createRental(data);
        return c.json(rental);
    };
    getAllRentals = async (c) => {
        const rentals = await this.rentalService.getAllRentals();
        return c.json(rentals);
    };
    getRentalById = async (c) => {
        const id = Number(c.req.param('id'));
        const rental = await this.rentalService.getRentalById(id);
        if (!rental)
            return c.notFound();
        return c.json(rental);
    };
    updateRental = async (c) => {
        const id = Number(c.req.param('id'));
        const body = await c.req.json();
        const data = {
            ...body,
            startedAt: body.startedAt ? new Date(body.startedAt) : undefined,
            endedAt: body.endedAt ? new Date(body.endedAt) : undefined,
        };
        const rental = await this.rentalService.updateRental(id, data);
        return c.json(rental);
    };
    deleteRental = async (c) => {
        const id = Number(c.req.param('id'));
        await this.rentalService.deleteRental(id);
        return c.body(null, 204);
    };
}
