import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { supportRequestSchema } from '../validator.js';
import { SupportService } from './request.services.js';
import { SupportController } from './request.controller.js';
const supportRouter = new Hono();
const supportService = new SupportService();
const supportController = new SupportController(supportService);
// validation middleware to POST and PUT
supportRouter.post('/', zValidator('json', supportRequestSchema), supportController.create);
supportRouter.get('/', supportController.getAll);
supportRouter.get('/:id', supportController.getById);
supportRouter.put('/:id', zValidator('json', supportRequestSchema), supportController.update);
supportRouter.delete('/:id', supportController.delete);
export default supportRouter;
