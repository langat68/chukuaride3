import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { feedbackSchema } from '../validator.js';
import { FeedbackService } from './feedback.service.js';
import { FeedbackController } from './feedback.controller.js';
const feedbackRouter = new Hono();
const feedbackService = new FeedbackService();
const feedbackController = new FeedbackController(feedbackService);
// ✅ Validate POST and PUT using Zod
feedbackRouter.post('/', zValidator('json', feedbackSchema), feedbackController.create);
feedbackRouter.get('/', feedbackController.getAll);
feedbackRouter.get('/:id', feedbackController.getById);
feedbackRouter.put('/:id', zValidator('json', feedbackSchema), feedbackController.update);
feedbackRouter.delete('/:id', feedbackController.delete);
export default feedbackRouter;
