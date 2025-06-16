// src/rentals/rental.service.ts
import { db } from '../db/db.js'
import { rentals } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export class RentalService {
  async createRental(data: typeof rentals.$inferInsert) {
    const result = await db.insert(rentals).values(data).returning()
    return result[0]
  }

  async getAllRentals() {
    return db.select().from(rentals)
  }

  async getRentalById(id: number) {
    const result = await db.select().from(rentals).where(eq(rentals.id, id))
    return result[0]
  }

  async updateRental(id: number, data: Partial<typeof rentals.$inferInsert>) {
    const result = await db
      .update(rentals)
      .set(data)
      .where(eq(rentals.id, id))
      .returning()
    return result[0]
  }

  async deleteRental(id: number) {
    return db.delete(rentals).where(eq(rentals.id, id))
  }
}
