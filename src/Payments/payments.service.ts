// src/Payments/payments.service.ts
import { db } from '../db/db.js'
import { payments, rentals, bookings, users, cars } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export class PaymentService {
  async recordPayment(data: typeof payments.$inferInsert) {
    const res = await db.insert(payments).values(data).returning()
    return res[0]
  }

  async getAll() {
    return db
      .select({
        id: payments.id,
        paymentProvider: payments.paymentProvider,
        amount: payments.amount,
        paidAt: payments.paidAt,
        refundAmount: payments.refundAmount,
        invoiceUrl: payments.invoiceUrl,
        status: payments.status,
        receipt: payments.receipt,
        phone: payments.phone,
        checkoutRequestId: payments.checkoutRequestId,
        userName: users.name,
        userEmail: users.email,
        carMake: cars.make,
        carModel: cars.model,
        carLocation: cars.location,
      })
      .from(payments)
      .innerJoin(rentals, eq(payments.rentalId, rentals.id))
      .innerJoin(bookings, eq(rentals.bookingId, bookings.id))
      .innerJoin(users, eq(bookings.userId, users.id))
      .innerJoin(cars, eq(bookings.carId, cars.id))
  }

  async getById(id: number) {
    const res = await db.select().from(payments).where(eq(payments.id, id))
    return res[0]
  }

  async updatePaymentStatus({
    receipt,
    phone,
    amount,
    status,
    checkoutRequestId,
  }: {
    receipt: string | null
    phone: string | null
    amount: number | null
    status: string
    checkoutRequestId: string
  }) {
    if (!checkoutRequestId) {
      console.warn('⚠️ No CheckoutRequestID provided. Cannot update payment status.')
      return
    }

    await db
      .update(payments)
      .set({
        receipt,
        phone: phone?.toString() ?? null,
        amount: amount !== null ? amount.toString() : null,
        status,
        paidAt: new Date(),
      })
      .where(eq(payments.checkoutRequestId, checkoutRequestId))
  }

  async getPaymentsByUserId(userId: number) {
    return db
      .select({
        id: payments.id,
        rentalId: payments.rentalId,
        amount: payments.amount,
        status: payments.status,
        paidAt: payments.paidAt,
      })
      .from(payments)
      .innerJoin(rentals, eq(payments.rentalId, rentals.id))
      .innerJoin(bookings, eq(rentals.bookingId, bookings.id))
      .where(eq(bookings.userId, userId))
  }
}
