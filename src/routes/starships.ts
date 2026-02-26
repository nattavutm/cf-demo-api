import { Hono } from 'hono'
import { starships as db } from '../data'

const app = new Hono()

app.get('/', (c) => {
  const page = Math.max(1, parseInt(c.req.query('page') ?? '1'))
  const pageSize = Math.min(20, Math.max(1, parseInt(c.req.query('page_size') ?? '10')))
  const base = new URL(c.req.url).origin

  const total = db.length
  const paginated = db.slice((page - 1) * pageSize, page * pageSize)

  return c.json({
    count: total,
    page,
    page_size: pageSize,
    next: page * pageSize < total ? `${base}/api/starships?page=${page + 1}&page_size=${pageSize}` : null,
    previous: page > 1 ? `${base}/api/starships?page=${page - 1}&page_size=${pageSize}` : null,
    results: paginated.map((s) => ({ ...s, url: `${base}/api/starships/${s.id}` })),
  })
})

app.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const ship = db.find((s) => s.id === id)

  if (!ship) {
    return c.json({ error: 'Not Found', message: `Starship with id ${id} does not exist` }, 404)
  }

  const base = new URL(c.req.url).origin
  return c.json({ ...ship, url: `${base}/api/starships/${ship.id}` })
})

export default app
