// src/bookings/booking.service.ts
import { db } from '../db/db.js'
import { bookings, users, cars } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export class BookingService {
  constructor(private dbInstance = db) {}

  // ✅ Enriched getAll with car + user info
  getAll() {
    return this.dbInstance
      .select({
        id: bookings.id,
        pickupTime: bookings.pickupTime,
        returnTime: bookings.returnTime,
        priceEstimate: bookings.priceEstimate,
        confirmed: bookings.confirmed,
        createdAt: bookings.createdAt,
        user: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
        car: {
          id: cars.id,
          make: cars.make,
          model: cars.model,
          location: cars.location,
        },
      })
      .from(bookings)
      .leftJoin(users, eq(bookings.userId, users.id))
      .leftJoin(cars, eq(bookings.carId, cars.id))
  }

  getById(id: number) {
    return this.dbInstance.select().from(bookings).where(eq(bookings.id, id))
  }

  getByUserId(userId: number) {
    return this.dbInstance.query.bookings.findMany({
      where: (b, { eq }) => eq(b.userId, userId),
      with: {
        car: true, // 👈 Includes car info via Drizzle's relation
      },
    })
  }

  create(data: typeof bookings.$inferInsert) {
    return this.dbInstance.insert(bookings).values(data).returning()
  }

  update(id: number, data: Partial<typeof bookings.$inferInsert>) {
    return this.dbInstance
      .update(bookings)
      .set(data)
      .where(eq(bookings.id, id))
      .returning()
  }

  delete(id: number) {
    return this.dbInstance.delete(bookings).where(eq(bookings.id, id)).returning()
  }
}
