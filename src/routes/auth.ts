import { Hono } from 'hono'
import { demoUsers, createSession, getSession, deleteSession } from '../store'
import type { LoginRequest } from '../types'

const app = new Hono()

function generateToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = 'demo_'
  for (let i = 0; i < 32; i++) {
    token += chars[Math.floor(Math.random() * chars.length)]
  }
  return token
}

/**
 * POST /api/auth/login
 * SEQUENCE STEP 1 — Authenticate and receive bearer token.
 *
 * Schema Validation demo:
 *   Required: username (string), password (string)
 */
app.post('/login', async (c) => {
  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Bad Request', message: 'Request body must be valid JSON' }, 400)
  }

  const data = body as Partial<LoginRequest>

  if (!data.username || typeof data.username !== 'string') {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'Missing required field: username (string)',
      details: { field: 'username' },
    }, 422)
  }

  if (!data.password || typeof data.password !== 'string') {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'Missing required field: password (string)',
      details: { field: 'password' },
    }, 422)
  }

  const user = demoUsers[data.username]
  if (!user || user.password !== data.password) {
    return c.json({
      error: 'Unauthorized',
      message: 'Invalid username or password',
    }, 401)
  }

  const token = generateToken()
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 60 * 60 * 1000) // 1 hour

  createSession({
    token,
    user_id: `usr_${data.username}`,
    username: data.username,
    role: user.role,
    created_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
  })

  return c.json({
    message: 'Login successful',
    token,
    token_type: 'Bearer',
    expires_at: expiresAt.toISOString(),
    user: {
      user_id: `usr_${data.username}`,
      username: data.username,
      role: user.role,
    },
  }, 200)
})

/**
 * GET /api/auth/me
 * SEQUENCE STEP 2 — Get current user profile (requires auth).
 */
app.get('/me', (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({
      error: 'Unauthorized',
      message: 'Missing or invalid Authorization header. Expected: Bearer <token>',
    }, 401)
  }

  const token = authHeader.slice(7)
  const session = getSession(token)

  if (!session) {
    return c.json({
      error: 'Unauthorized',
      message: 'Token is invalid or has expired. Please login again.',
    }, 401)
  }

  return c.json({
    user_id: session.user_id,
    username: session.username,
    role: session.role,
    session: {
      created_at: session.created_at,
      expires_at: session.expires_at,
    },
  })
})

/**
 * POST /api/auth/logout
 * Invalidate current session token.
 */
app.post('/logout', (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({
      error: 'Unauthorized',
      message: 'Missing or invalid Authorization header',
    }, 401)
  }

  const token = authHeader.slice(7)
  deleteSession(token)

  return c.json({ message: 'Logged out successfully' })
})

export default app
