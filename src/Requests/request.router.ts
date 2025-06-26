
// src/Requests/request.router.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { supportRequestSchema } from '../validator.js' 
import { SupportService } from './request.services.js'
import { SupportController } from './request.controller.js'

const supportRouter = new Hono()

const supportService = new SupportService()
const supportController = new SupportController(supportService)

supportRouter.post('/', zValidator('json', supportRequestSchema), supportController.create)
supportRouter.get('/', supportController.getAll)
supportRouter.get('/by-user', supportController.getByUserId.bind(supportController))

supportRouter.put('/:id', zValidator('json', supportRequestSchema), supportController.update)
supportRouter.delete('/:id', supportController.delete)

export default supportRouter
