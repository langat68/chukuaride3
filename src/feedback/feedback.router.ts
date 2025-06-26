import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { feedbackSchema } from '../validator.js' 
import { FeedbackService } from './feedback.service.js'
import { FeedbackController } from './feedback.controller.js'

const feedbackRouter = new Hono()

const feedbackService = new FeedbackService()
const feedbackController = new FeedbackController(feedbackService)

// ✅ Get feedback by userId (must come BEFORE /:id)
feedbackRouter.get('/by-user', async (c) => {
  const userId = Number(c.req.query('userId'))
  if (isNaN(userId)) return c.json({ error: 'Invalid userId' }, 400)

  try {
    const result = await feedbackService.getFeedbackByUserId(userId)
    return c.json(result)
  } catch (err) {
    console.error('❌ Failed to fetch feedback by user:', err)
    return c.text('Internal Server Error', 500)
  }
})

// ✅ Validate POST and PUT using Zod
feedbackRouter.post('/', zValidator('json', feedbackSchema), feedbackController.create)
feedbackRouter.get('/', feedbackController.getAll)
feedbackRouter.get('/:id', feedbackController.getById)
feedbackRouter.put('/:id', zValidator('json', feedbackSchema), feedbackController.update)
feedbackRouter.delete('/:id', feedbackController.delete)

export default feedbackRouter
