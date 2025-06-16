// src/payments/payment.controller.ts
import type { Context } from 'hono'
import { PaymentService } from './payments.service.js'
import { stkPush } from './daraja.js'

export class PaymentController {
  constructor(private service: PaymentService) {}

  initiatePayment = async (c: Context) => {
    const body = await c.req.json()
    const { phone, amount, rentalId } = body

    const res = await stkPush(phone, amount)

    // Optionally store this request with status "pending"
    await this.service.recordPayment({
      rentalId,
      amount,
      paymentProvider: 'mpesa',
      invoiceUrl: '', // optional
    })

    return c.json({ success: true, mpesaResponse: res })
  }

  getAll = async (c: Context) => {
    const data = await this.service.getAll()
    return c.json(data)
  }

  getById = async (c: Context) => {
    const id = Number(c.req.param('id'))
    const payment = await this.service.getById(id)
    return c.json(payment)
  }
}
