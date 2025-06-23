// src/cars/car.service.ts
import { db } from '../db/db.js'
import { cars } from '../db/schema.js'
import { eq } from 'drizzle-orm'
import { sql } from 'drizzle-orm'

export class CarService {
  async getAllCars() {
    return db
      .select({
        id: cars.id,
        make: cars.make,
        model: cars.model,
        carName: sql<string>`${cars.make} || ' ' || ${cars.model}`.as('carName'),
        year: cars.year,
        category: cars.category,
        pricePerHour: cars.pricePerHour,
        pricePerDay: cars.pricePerDay,
        fuel: cars.fuel,
        transmission: cars.transmission,
        capacity: cars.capacity,
        availability: cars.availability,
        location: cars.location,
        createdBy: cars.createdBy,
        createdAt: cars.createdAt,
      })
      .from(cars)
  }

  async getCarById(id: number) {
    return db
      .select({
        id: cars.id,
        make: cars.make,
        model: cars.model,
        carName: sql<string>`${cars.make} || ' ' || ${cars.model}`.as('carName'),
        year: cars.year,
        category: cars.category,
        pricePerHour: cars.pricePerHour,
        pricePerDay: cars.pricePerDay,
        fuel: cars.fuel,
        transmission: cars.transmission,
        capacity: cars.capacity,
        availability: cars.availability,
        location: cars.location,
        createdBy: cars.createdBy,
        createdAt: cars.createdAt,
      })
      .from(cars)
      .where(eq(cars.id, id))
      .then(res => res[0])
  }

  async createCar(data: Omit<typeof cars.$inferInsert, 'id'>) {
    return db.insert(cars).values(data).returning()
  }

  async updateCar(id: number, data: Partial<typeof cars.$inferInsert>) {
    return db.update(cars).set(data).where(eq(cars.id, id)).returning()
  }

  async deleteCar(id: number) {
    return db.delete(cars).where(eq(cars.id, id))
  }
}
