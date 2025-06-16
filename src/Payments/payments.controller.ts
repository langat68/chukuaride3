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

    // Save with checkoutRequestId for later tracking
    await this.service.recordPayment({
      rentalId,
      amount: amount.toString(), // Ensure correct type
      paymentProvider: 'mpesa',
      invoiceUrl: '',
      status: 'pending',
      phone,
      checkoutRequestId: res.CheckoutRequestID,
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
    try {
      const body = await c.req.json()
      console.log('📥 M-Pesa Callback received:', JSON.stringify(body, null, 2))

      const result = body?.Body?.stkCallback
      if (!result) {
        console.warn('⚠️ Missing stkCallback')
        return c.json({ error: 'Invalid callback body' }, 400)
      }
const checkoutRequestId = result.CheckoutRequestID
const status = result?.ResultCode === 0 ? 'success' : 'failed'

let amount: number | null = null
let receipt: string | null = null
let phone: string | null = null

if (result.CallbackMetadata?.Item) {
  const metadata = result.CallbackMetadata.Item
  amount = metadata.find((item: any) => item.Name === 'Amount')?.Value ?? null
  receipt = metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value ?? null
  phone = metadata.find((item: any) => item.Name === 'PhoneNumber')?.Value ?? null
}


      await this.service.updatePaymentStatus({
        checkoutRequestId,
        receipt: receipt?.toString() ?? null,
        phone: phone?.toString() ?? null,
        amount,
        status,
      })

      return c.json({ message: 'Callback received and processed' })
    } catch (error) {
      console.error('❌ Error in handleMpesaCallback:', error)
      return c.json({ error: 'Server error' }, 500)
    }
  }
}
