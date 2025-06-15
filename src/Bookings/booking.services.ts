import { eq } from 'drizzle-orm'
import { bookings } from '../db/schema.js'
import { db } from '../db/db.js'

export class BookingService {
  constructor(private dbInstance = db) {}

  getAll() {
    return this.dbInstance.select().from(bookings)
  }

  getById(id: number) {
    return this.dbInstance.select().from(bookings).where(eq(bookings.id, id))
  }

  create(data: typeof bookings.$inferInsert) {
    return this.dbInstance.insert(bookings).values(data).returning()
  }

  update(id: number, data: Partial<typeof bookings.$inferInsert>) {
    return this.dbInstance.update(bookings).set(data).where(eq(bookings.id, id)).returning()
  }

  delete(id: number) {
    return this.dbInstance.delete(bookings).where(eq(bookings.id, id)).returning()
  }
}
