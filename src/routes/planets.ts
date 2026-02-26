import { Hono } from 'hono'
import { planets as db } from '../data'

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
    next: page * pageSize < total ? `${base}/api/planets?page=${page + 1}&page_size=${pageSize}` : null,
    previous: page > 1 ? `${base}/api/planets?page=${page - 1}&page_size=${pageSize}` : null,
    results: paginated.map((p) => ({ ...p, url: `${base}/api/planets/${p.id}` })),
  })
})

app.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const planet = db.find((p) => p.id === id)

  if (!planet) {
    return c.json({ error: 'Not Found', message: `Planet with id ${id} does not exist` }, 404)
  }

  const base = new URL(c.req.url).origin
  return c.json({ ...planet, url: `${base}/api/planets/${planet.id}` })
})

export default app
