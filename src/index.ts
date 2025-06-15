import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRouter from './users/users.router.js' // ✅ No .js if using .ts

const app = new Hono()

app.get('/', (c) => c.text('Hello Node.js!'))

console.log('Registering /users router')
app.route('/users', userRouter)

app.all('*', (c) => c.text('Route not found', 404)) // Optional fallback

serve(app)
