// src/cars/car.router.ts
import { Hono } from 'hono'
import { CarService } from './cars.service.js'
import { CarController } from './cars.controller.js'

const carRouter = new Hono()

const carService = new CarService()
const carController = new CarController(carService)

carRouter.get('/', carController.getAll)
carRouter.get('/:id', carController.getById)
carRouter.post('/', carController.create)
carRouter.put('/:id', carController.update)
carRouter.delete('/:id', carController.delete)

export default carRouter
