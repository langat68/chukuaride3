import { db } from '../db/db.js';
import { payments } from '../db/schema.js';
import { eq } from 'drizzle-orm';
export class PaymentService {
    async recordPayment(data) {
        const res = await db.insert(payments).values(data).returning();
        return res[0];
    }
    async getAll() {
        return db.select().from(payments);
    }
    async getById(id) {
        const res = await db.select().from(payments).where(eq(payments.id, id));
        return res[0];
    }
    async updatePaymentStatus({ receipt, phone, amount, status, checkoutRequestId, }) {
        if (!checkoutRequestId) {
            console.warn('⚠️ No CheckoutRequestID provided. Cannot update payment status.');
            return;
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
            .where(eq(payments.checkoutRequestId, checkoutRequestId));
    }
}
