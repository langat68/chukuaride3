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

  handleMpesaCallback = async (c: Context) => {
    const body = await c.req.json()
    const result = body?.Body?.stkCallback
    
    if (!result) return c.json({ error: 'Invalid callback body' }, 400)
    
    const status = result?.ResultCode === 0 ? 'success' : 'failed'
    const metadata = result?.CallbackMetadata?.Item || []
    
    const amount = metadata.find((item: any) => item.Name === 'Amount')?.Value
    const receipt = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value
    const phone = metadata.find((item: any) => item.Name === 'PhoneNumber')?.Value

    
    return c.json({ message: 'Callback received and processed' })
  }
}