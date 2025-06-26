// src/Payments/payments.router.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { paymentSchema } from '../validator.js'
import { PaymentController } from './payments.controller.js'
import { PaymentService } from './payments.service.js'

const paymentRouter = new Hono()
const service = new PaymentService()
const controller = new PaymentController(service)

// Validate and initiate payment
paymentRouter.post('/pay', zValidator('json', paymentSchema), controller.initiatePayment)

// Handle M-Pesa callback
paymentRouter.post('/callback', controller.handleMpesaCallback)

// ⚠️ Place before '/:id' to avoid conflict
paymentRouter.get('/by-user', async (c) => {
  const userId = Number(c.req.query('userId'))
  if (isNaN(userId)) return c.json({ error: 'Invalid userId' }, 400)

  try {
    const data = await service.getPaymentsByUserId(userId)
    return c.json(data)
  } catch (err) {
    console.error('❌ Failed to fetch user payments:', err)
    return c.text('Internal Server Error', 500)
  }
})

// Get all payments
paymentRouter.get('/', controller.getAll)

// Dynamic route — keep last!
paymentRouter.get('/:id', controller.getById)

export default paymentRouter
