// src/feedback/feedback.service.ts
import { db } from '../db/db.js'
import { feedback } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export class FeedbackService {
  async create(data: typeof feedback.$inferInsert) {
    const result = await db.insert(feedback).values(data).returning()
    return result[0]
  }

  async getAll() {
    return db.select().from(feedback)
  }

  async getById(id: number) {
    const result = await db.select().from(feedback).where(eq(feedback.id, id))
    return result[0]
  }

  async update(id: number, data: Partial<typeof feedback.$inferInsert>) {
    const result = await db
      .update(feedback)
      .set(data)
      .where(eq(feedback.id, id))
      .returning()
    return result[0]
  }

  async delete(id: number) {
    return db.delete(feedback).where(eq(feedback.id, id))
  }
}
