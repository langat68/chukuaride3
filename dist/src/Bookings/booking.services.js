import { eq } from 'drizzle-orm';
import { bookings } from '../db/schema.js';
import { db } from '../db/db.js';
export class BookingService {
    dbInstance;
    constructor(dbInstance = db) {
        this.dbInstance = dbInstance;
    }
    getAll() {
        return this.dbInstance.select().from(bookings);
    }
    getById(id) {
        return this.dbInstance.select().from(bookings).where(eq(bookings.id, id));
    }
    create(data) {
        return this.dbInstance.insert(bookings).values(data).returning();
    }
    update(id, data) {
        return this.dbInstance.update(bookings).set(data).where(eq(bookings.id, id)).returning();
    }
    delete(id) {
        return this.dbInstance.delete(bookings).where(eq(bookings.id, id)).returning();
    }
}
