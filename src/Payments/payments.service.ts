// src/payments/payment.service.ts
import { db } from '../db/db.js'
import { payments } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export class PaymentService {
  async recordPayment(data: typeof payments.$inferInsert) {
    const res = await db.insert(payments).values(data).returning()
    return res[0]
  }

  async getAll() {
    return db.select().from(payments)
  }

  async getById(id: number) {
    const res = await db.select().from(payments).where(eq(payments.id, id))
    return res[0]
  }
}


