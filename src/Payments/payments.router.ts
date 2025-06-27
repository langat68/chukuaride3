// src/Payments/payments.router.ts 
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { paymentSchema } from '../validator.js'
import { PaymentController } from './payments.controller.js'
import { PaymentService } from './payments.service.js'
import { z } from 'zod'

// Define context variables type
type Variables = {
  validatedPayment: z.infer<typeof paymentSchema>
}

const paymentRouter = new Hono<{ Variables: Variables }>()
const service = new PaymentService()
const controller = new PaymentController(service)

// 🔍 Custom handler for better debug and error logging
paymentRouter.post('/pay', async (c) => {
  try {
    const body = await c.req.json()
    console.log('📥 Incoming payment body:', body)
    
    // Validate using Zod manually
    const parsed = paymentSchema.parse(body)
    console.log('✅ Validated payment data:', parsed)
    
    // Store parsed data in context for controller access
    c.set('validatedPayment', parsed)
    
    // Proceed to controller
    return controller.initiatePayment(c)
  } catch (err) {
    console.error('❌ Payment validation failed:', err)
    return c.json({ error: 'Invalid payload', details: err }, 400)
  }
})

// Alternative approach: Pass data directly to controller
paymentRouter.post('/pay-direct', async (c) => {
  try {
    const body = await c.req.json()
    console.log('📥 Incoming payment body:', body)
    
    // Validate using Zod manually
    const parsed = paymentSchema.parse(body)
    console.log('✅ Validated payment data:', parsed)
    
    // Store in context and use existing controller method
    c.set('validatedPayment', parsed)
    return controller.initiatePayment(c)
  } catch (err) {
    console.error('❌ Payment validation failed:', err)
    return c.json({ error: 'Invalid payload', details: err }, 400)
  }
})

// Alternative approach using zValidator middleware (recommended)
paymentRouter.post('/pay-alt', 
  zValidator('json', paymentSchema), 
  controller.initiatePayment
)

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