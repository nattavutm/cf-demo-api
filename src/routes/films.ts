import { Hono } from 'hono'
import { films as db } from '../data'

const app = new Hono()

app.get('/', (c) => {
  const base = new URL(c.req.url).origin
  return c.json({
    count: db.length,
    results: db.map((f) => ({ ...f, url: `${base}/api/films/${f.id}` })),
  })
})

app.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const film = db.find((f) => f.id === id)

  if (!film) {
    return c.json({ error: 'Not Found', message: `Film with id ${id} does not exist` }, 404)
  }

  const base = new URL(c.req.url).origin
  return c.json({ ...film, url: `${base}/api/films/${film.id}` })
})

export default app
