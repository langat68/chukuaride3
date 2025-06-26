// src/Requests/request.services.ts
import { db } from '../db/db.js'
import { supportRequests } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export class SupportService {
  async create(data: typeof supportRequests.$inferInsert) {
    const result = await db.insert(supportRequests).values(data).returning()
    return result[0]
  }

  async getAll() {
    return db.select().from(supportRequests)
  }

  async getById(id: number) {
    const result = await db.select().from(supportRequests).where(eq(supportRequests.id, id))
    return result[0]
  }

  async getByUserId(userId: number) {
    return db
      .select()
      .from(supportRequests)
      .where(eq(supportRequests.userId, userId))
  }

  async update(id: number, data: Partial<typeof supportRequests.$inferInsert>) {
    const result = await db
      .update(supportRequests)
      .set(data)
      .where(eq(supportRequests.id, id))
      .returning()
    return result[0]
  }

  async delete(id: number) {
    return db.delete(supportRequests).where(eq(supportRequests.id, id))
  }
}
