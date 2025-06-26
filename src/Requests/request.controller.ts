import type { Context } from 'hono'
import { SupportService } from './request.services.js'

export class SupportController {
  constructor(private service: SupportService) {}

  async create(c: Context) {
    const body = await c.req.json()
    const created = await this.service.create(body)
    return c.json(created, 201)
  }

  async getAll(c: Context) {
    const data = await this.service.getAll()
    return c.json(data)
  }

  async getById(c: Context) {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

    const item = await this.service.getById(id)
    if (!item) return c.json({ error: 'Support request not found' }, 404)

    return c.json(item)
  }

  async update(c: Context) {
    const id = Number(c.req.param('id'))
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

    const body = await c.req.json()
    const updated = await this.service.update(id, body)
    return c.json(updated)
  }

async delete(c: Context) {
  const id = Number(c.req.param('id'))
  if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400)

  await this.service.delete(id)
  return c.body(null, 204) // correct and type-safe
}


  async getByUserId(c: Context) {
    const userId = Number(c.req.query('userId'))
    if (isNaN(userId)) return c.json({ error: 'Invalid userId' }, 400)

    const data = await this.service.getByUserId(userId)
    return c.json(data)
  }
}
