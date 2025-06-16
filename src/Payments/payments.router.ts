// src/payments/payment.router.ts
import { Hono } from 'hono'
import { PaymentController } from './payments.controller.js'
import { PaymentService } from './payments.service.js'

const paymentRouter = new Hono()
const service = new PaymentService()
const controller = new PaymentController(service)

paymentRouter.post('/pay', controller.initiatePayment)
paymentRouter.get('/', controller.getAll)
paymentRouter.get('/:id', controller.getById)

export default paymentRouter
