import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import rootRoutes from './routes/root'
import peopleRoutes from './routes/people'
import filmsRoutes from './routes/films'
import planetsRoutes from './routes/planets'
import starshipsRoutes from './routes/starships'
import authRoutes from './routes/auth'
import cartRoutes from './routes/cart'
import ordersRoutes from './routes/orders'

import { renderUI } from './ui'
import { buildOpenAPISpec } from './openapi'

const app = new Hono()

// ── Global Middleware ─────────────────────────────────────────────────────────

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))
app.use('*', logger())
app.use('/api/*', prettyJSON())

// ── Web UI ────────────────────────────────────────────────────────────────────

app.get('/', (c) => {
  const baseUrl = new URL(c.req.url).origin
  return c.html(renderUI(baseUrl))
})

app.get('/docs', (c) => {
  const baseUrl = new URL(c.req.url).origin
  return c.html(renderUI(baseUrl))
})

// ── OpenAPI Spec (upload to Cloudflare API Shield for Schema Validation) ──────

app.get('/openapi.json', (c) => {
  const baseUrl = new URL(c.req.url).origin
  return c.json(buildOpenAPISpec(baseUrl))
})

// ── API Routes ────────────────────────────────────────────────────────────────

app.route('/api', rootRoutes)
app.route('/api/people', peopleRoutes)
app.route('/api/films', filmsRoutes)
app.route('/api/planets', planetsRoutes)
app.route('/api/starships', starshipsRoutes)
app.route('/api/auth', authRoutes)
app.route('/api/cart', cartRoutes)
app.route('/api/orders', ordersRoutes)

// ── Error Handlers ────────────────────────────────────────────────────────────

app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    message: `The resource at ${c.req.path} does not exist`,
  }, 404)
})

app.onError((err, c) => {
  console.error('[Error]', err)
  return c.json({
    error: 'Internal Server Error',
    message: err.message,
  }, 500)
})

export default app
