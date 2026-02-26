import { Hono } from 'hono'
import { people as db } from '../data'
import type { CreatePersonRequest, UpdatePersonRequest } from '../types'

const app = new Hono()

// GET /api/people — list with pagination
app.get('/', (c) => {
  const page = Math.max(1, parseInt(c.req.query('page') ?? '1'))
  const pageSize = Math.min(20, Math.max(1, parseInt(c.req.query('page_size') ?? '10')))
  const search = c.req.query('search')?.toLowerCase()

  let results = [...db]
  if (search) {
    results = results.filter((p) => p.name.toLowerCase().includes(search))
  }

  const total = results.length
  const paginated = results.slice((page - 1) * pageSize, page * pageSize)
  const base = new URL(c.req.url).origin

  return c.json({
    count: total,
    page,
    page_size: pageSize,
    next: page * pageSize < total ? `${base}/api/people?page=${page + 1}&page_size=${pageSize}` : null,
    previous: page > 1 ? `${base}/api/people?page=${page - 1}&page_size=${pageSize}` : null,
    results: paginated.map((p) => ({ ...p, url: `${base}/api/people/${p.id}` })),
  })
})

// GET /api/people/:id — get by ID
app.get('/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const person = db.find((p) => p.id === id)

  if (!person) {
    return c.json({ error: 'Not Found', message: `Person with id ${id} does not exist` }, 404)
  }

  const base = new URL(c.req.url).origin
  return c.json({ ...person, url: `${base}/api/people/${person.id}` })
})

// POST /api/people — create a new person
// Schema Validation demo: requires specific fields with correct types
app.post('/', async (c) => {
  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Bad Request', message: 'Request body must be valid JSON' }, 400)
  }

  const data = body as Partial<CreatePersonRequest>

  // Validate required fields
  const required: (keyof CreatePersonRequest)[] = [
    'name', 'height', 'mass', 'hair_color', 'skin_color',
    'eye_color', 'birth_year', 'gender', 'homeworld_id',
  ]
  const missing = required.filter((f) => data[f] === undefined || data[f] === null || data[f] === '')
  if (missing.length > 0) {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'Missing required fields',
      details: { missing_fields: missing },
    }, 422)
  }

  const validGenders = ['male', 'female', 'hermaphrodite', 'n/a', 'unknown']
  if (!validGenders.includes(data.gender!)) {
    return c.json({
      error: 'Unprocessable Entity',
      message: `Invalid gender value. Must be one of: ${validGenders.join(', ')}`,
      details: { field: 'gender', received: data.gender, allowed: validGenders },
    }, 422)
  }

  if (typeof data.homeworld_id !== 'number' || !Number.isInteger(data.homeworld_id) || data.homeworld_id < 1) {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'homeworld_id must be a positive integer',
      details: { field: 'homeworld_id', received: data.homeworld_id },
    }, 422)
  }

  const newId = Math.max(...db.map((p) => p.id)) + 1
  const now = new Date().toISOString()
  const base = new URL(c.req.url).origin

  const newPerson = {
    id: newId,
    name: data.name!,
    height: data.height!,
    mass: data.mass!,
    hair_color: data.hair_color!,
    skin_color: data.skin_color!,
    eye_color: data.eye_color!,
    birth_year: data.birth_year!,
    gender: data.gender!,
    homeworld_id: data.homeworld_id!,
    film_ids: [],
    species_ids: [],
    vehicle_ids: [],
    starship_ids: [],
    created: now,
    edited: now,
    url: `${base}/api/people/${newId}`,
  }

  db.push(newPerson as typeof db[0])
  return c.json(newPerson, 201)
})

// PUT /api/people/:id — update a person
// Schema Validation demo: partial update with type checking
app.put('/:id', async (c) => {
  const id = parseInt(c.req.param('id'))
  const index = db.findIndex((p) => p.id === id)

  if (index === -1) {
    return c.json({ error: 'Not Found', message: `Person with id ${id} does not exist` }, 404)
  }

  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Bad Request', message: 'Request body must be valid JSON' }, 400)
  }

  const data = body as Partial<UpdatePersonRequest>

  if (data.gender !== undefined) {
    const validGenders = ['male', 'female', 'hermaphrodite', 'n/a', 'unknown']
    if (!validGenders.includes(data.gender)) {
      return c.json({
        error: 'Unprocessable Entity',
        message: `Invalid gender value. Must be one of: ${validGenders.join(', ')}`,
        details: { field: 'gender', received: data.gender, allowed: validGenders },
      }, 422)
    }
  }

  const updated = {
    ...db[index],
    ...data,
    id,
    edited: new Date().toISOString(),
  }
  db[index] = updated

  const base = new URL(c.req.url).origin
  return c.json({ ...updated, url: `${base}/api/people/${id}` })
})

// DELETE /api/people/:id — delete a person
app.delete('/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const index = db.findIndex((p) => p.id === id)

  if (index === -1) {
    return c.json({ error: 'Not Found', message: `Person with id ${id} does not exist` }, 404)
  }

  db.splice(index, 1)
  return c.json({ message: `Person ${id} successfully deleted` })
})

export default app
