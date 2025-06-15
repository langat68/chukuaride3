// src/cars/car.service.ts
import { db } from '../db/db.js'
import { cars } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export class CarService {
  async getAllCars() {
    return db.select().from(cars)
  }

  async getCarById(id: number) {
    return db.select().from(cars).where(eq(cars.id, id)).then(res => res[0])
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
