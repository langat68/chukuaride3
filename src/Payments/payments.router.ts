
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { paymentSchema } from '../validator.js' 
import { PaymentController } from './payments.controller.js'
import { PaymentService } from './payments.service.js'

const paymentRouter = new Hono()
const service = new PaymentService()
const controller = new PaymentController(service)

// ✅ Validate request body on POST /pay
paymentRouter.post('/pay', zValidator('json', paymentSchema), controller.initiatePayment)

paymentRouter.post('/callback', controller.handleMpesaCallback)


paymentRouter.get('/', controller.getAll)
paymentRouter.get('/:id', controller.getById)

export default paymentRouter