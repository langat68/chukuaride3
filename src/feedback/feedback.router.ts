// src/feedback/feedback.router.ts
import { Hono } from 'hono'
import { FeedbackService } from './feedback.service.js'
import { FeedbackController } from './feedback.controller.js'

const feedbackRouter = new Hono()

const feedbackService = new FeedbackService()
const feedbackController = new FeedbackController(feedbackService)

feedbackRouter.post('/', feedbackController.create)
feedbackRouter.get('/', feedbackController.getAll)
feedbackRouter.get('/:id', feedbackController.getById)
feedbackRouter.put('/:id', feedbackController.update)
feedbackRouter.delete('/:id', feedbackController.delete)

export default feedbackRouter
