// src/requests/support.controller.ts
import type{ Context } from 'hono'
import { SupportService } from './request.services.js'

export class SupportController {
  constructor(private service: SupportService) {}

  create = async (c: Context) => {
    const body = await c.req.json()
    const request = await this.service.create(body)
    return c.json(request)
  }

  getAll = async (c: Context) => {
    const requests = await this.service.getAll()
    return c.json(requests)
  }

  getById = async (c: Context) => {
    const id = Number(c.req.param('id'))
    const request = await this.service.getById(id)
    if (!request) return c.notFound()
    return c.json(request)
  }

  update = async (c: Context) => {
    const id = Number(c.req.param('id'))
    const body = await c.req.json()
    const updated = await this.service.update(id, body)
    return c.json(updated)
  }

  delete = async (c: Context) => {
    const id = Number(c.req.param('id'))
    await this.service.delete(id)
    return c.body(null, 204)
  }
}
