import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createUserRouter } from './users/users.router.js'
// import { drizzle } from 'drizzle-orm/node-postgres'
// import { Pool } from 'pg'

const app = new Hono()

// Database setup (you'll need to configure this)
// const pool = new Pool({
//   host: 'localhost',
//   port: 5432,
//   database: 'your_database',
//   user: 'your_user',
//   password: 'your_password',
// })
// const db = drizzle(pool)

// For now, pass null - you'll replace this with your actual db instance
const db = null // Replace with your actual database instance

// Routes
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Mount user routes
app.route('/users', createUserRouter(db))

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})