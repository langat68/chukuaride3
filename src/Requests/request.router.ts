// src/requests/support.router.ts
import { Hono } from 'hono'
import { SupportService } from './request.services.js'
import { SupportController } from './request.controller.js'

const supportRouter = new Hono()

const supportService = new SupportService()
const supportController = new SupportController(supportService)

supportRouter.post('/', supportController.create)
supportRouter.get('/', supportController.getAll)
supportRouter.get('/:id', supportController.getById)
supportRouter.put('/:id', supportController.update)
supportRouter.delete('/:id', supportController.delete)

export default supportRouter
