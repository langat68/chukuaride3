import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { carSchema } from '../validator.js' 
import { CarService } from './cars.service.js'
import { CarController } from './cars.controller.js'

const carRouter = new Hono()

const carService = new CarService()
const carController = new CarController(carService)

carRouter.get('/', carController.getAll)
carRouter.get('/available', carController.getAvailable) // ✅ here
carRouter.get('/:id', carController.getById)
carRouter.post('/', zValidator('json', carSchema), carController.create)
carRouter.put('/:id', zValidator('json', carSchema), carController.update)
carRouter.delete('/:id', carController.delete)

export default carRouter
