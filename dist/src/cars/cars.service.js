// src/cars/car.service.ts
import { db } from '../db/db.js';
import { cars } from '../db/schema.js';
import { eq } from 'drizzle-orm';
export class CarService {
    async getAllCars() {
        return db.select().from(cars);
    }
    async getCarById(id) {
        return db.select().from(cars).where(eq(cars.id, id)).then(res => res[0]);
    }
    async createCar(data) {
        return db.insert(cars).values(data).returning();
    }
    async updateCar(id, data) {
        return db.update(cars).set(data).where(eq(cars.id, id)).returning();
    }
    async deleteCar(id) {
        return db.delete(cars).where(eq(cars.id, id));
    }
}
