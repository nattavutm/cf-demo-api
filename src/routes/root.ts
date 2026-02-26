import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  const base = new URL(c.req.url).origin
  return c.json({
    name: 'CF Demo API — Star Wars Edition',
    version: '1.0.0',
    description: 'A demo REST API on Cloudflare Workers for showcasing API security features (Schema Validation & Sequence Mitigation)',
    documentation: `${base}/docs`,
    endpoints: {
      people: `${base}/api/people`,
      films: `${base}/api/films`,
      planets: `${base}/api/planets`,
      starships: `${base}/api/starships`,
      auth: `${base}/api/auth`,
      cart: `${base}/api/cart`,
      orders: `${base}/api/orders`,
    },
    openapi: `${base}/openapi.json`,
  })
})

export default app
