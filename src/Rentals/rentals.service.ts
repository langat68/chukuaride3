// ✅ rentals.service.ts
import { db } from '../db/db.js'
import { rentals, bookings, users, cars } from '../db/schema.js'
import { eq, sql } from 'drizzle-orm'

export class RentalService {
  async createRental(data: {
    userId: number
    carId: number
    pickupTime: string
    returnTime: string
    totalCost: string
  }) {
    // 1. Create a booking
    const [booking] = await db
      .insert(bookings)
      .values({
        userId: data.userId,
        carId: data.carId,
        pickupTime: new Date(data.pickupTime),
        returnTime: new Date(data.returnTime),
        priceEstimate: data.totalCost,
        confirmed: true
      })
      .returning({ id: bookings.id })

    // 2. Create the rental
    const [rental] = await db
      .insert(rentals)
      .values({
        bookingId: booking.id,
        totalCost: data.totalCost,
        status: 'booked'
      })
      .returning()

    return rental
  }

  async getAllRentals() {
    return db
      .select({
        id: rentals.id,
        bookingId: rentals.bookingId,
        status: rentals.status,
        durationHours: rentals.durationHours,
        totalCost: rentals.totalCost,
        startedAt: rentals.startedAt,
        endedAt: rentals.endedAt,
        userName: sql<string>`users.name`.as('user_name'),
        userEmail: sql<string>`users.email`.as('user_email'),
        carMake: sql<string>`cars.make`.as('car_make'),
        carModel: sql<string>`cars.model`.as('car_model'),
        carLocation: sql<string>`cars.location`.as('car_location'),
      })
      .from(rentals)
      .innerJoin(bookings, eq(rentals.bookingId, bookings.id))
      .innerJoin(users, eq(bookings.userId, users.id))
      .innerJoin(cars, eq(bookings.carId, cars.id))
  }

  async getRentalsByUserId(userId: number) {
    return db
      .select({
        id: rentals.id,
        bookingId: rentals.bookingId,
        status: rentals.status,
        durationHours: rentals.durationHours,
        totalCost: rentals.totalCost,
        startedAt: rentals.startedAt,
        endedAt: rentals.endedAt,
        userName: sql<string>`users.name`.as('user_name'),
        userEmail: sql<string>`users.email`.as('user_email'),
        carMake: sql<string>`cars.make`.as('car_make'),
        carModel: sql<string>`cars.model`.as('car_model'),
        carLocation: sql<string>`cars.location`.as('car_location'),
      })
      .from(rentals)
      .innerJoin(bookings, eq(rentals.bookingId, bookings.id))
      .innerJoin(users, eq(bookings.userId, users.id))
      .innerJoin(cars, eq(bookings.carId, cars.id))
      .where(eq(bookings.userId, userId))
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
