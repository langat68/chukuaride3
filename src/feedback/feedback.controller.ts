// src/feedback/feedback.controller.ts
import type { Context } from 'hono'
import { FeedbackService } from './feedback.service.js'

export class FeedbackController {
  constructor(private service: FeedbackService) {}

  create = async (c: Context) => {
    const body = await c.req.json()
    const created = await this.service.create(body)
    return c.json(created)
  }

  getAll = async (c: Context) => {
    const allFeedback = await this.service.getAll()
    return c.json(allFeedback)
  }

  getById = async (c: Context) => {
    const id = Number(c.req.param('id'))
    const fb = await this.service.getById(id)
    if (!fb) return c.notFound()
    return c.json(fb)
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
