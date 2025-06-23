import { CarService } from './cars.service.js';
export class CarController {
    carService;
    constructor(carService) {
        this.carService = carService;
    }
    getAll = async (c) => {
        const result = await this.carService.getAllCars();
        return c.json(result);
    };
    getById = async (c) => {
        const id = Number(c.req.param('id'));
        const result = await this.carService.getCarById(id);
        return result ? c.json(result) : c.notFound();
    };
    create = async (c) => {
        const body = await c.req.json();
        const result = await this.carService.createCar(body);
        return c.json(result);
    };
    update = async (c) => {
        const id = Number(c.req.param('id'));
        const body = await c.req.json();
        const result = await this.carService.updateCar(id, body);
        return c.json(result);
    };
    delete = async (c) => {
        const id = Number(c.req.param('id'));
        await this.carService.deleteCar(id);
        return c.text('Deleted successfully');
    };
}
