import { Hono } from 'hono'
import { getSession } from '../store'
import { getCart, clearCart, createOrder, getOrder, getUserOrders } from '../store'
import type { CheckoutRequest, Order } from '../types'

const app = new Hono()

function requireAuth(c: Parameters<Parameters<typeof app.use>[1]>[0]) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  return getSession(authHeader.slice(7))
}

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `ORD-${ts}-${rand}`
}

function estimatedDelivery(): string {
  const days = Math.floor(Math.random() * 14) + 7 // 7-21 days
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

/**
 * POST /api/orders
 * SEQUENCE STEP 5 — Checkout: create order from current cart.
 *
 * Schema Validation demo:
 *   Required: shipping_address (object), payment_method (enum)
 *   shipping_address requires: planet (string), sector (string), system (string)
 *   payment_method: galactic_credits | republic_tokens | imperial_bonds
 */
app.post('/', async (c) => {
  const session = requireAuth(c)
  if (!session) {
    return c.json({ error: 'Unauthorized', message: 'Please login first' }, 401)
  }

  const cartItems = getCart(session.token)
  if (cartItems.length === 0) {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'Cannot checkout with an empty cart. Add items first.',
      details: { cart_items: 0 },
    }, 422)
  }

  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Bad Request', message: 'Request body must be valid JSON' }, 400)
  }

  const data = body as Partial<CheckoutRequest>

  // Validate shipping_address
  if (!data.shipping_address || typeof data.shipping_address !== 'object') {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'Missing required field: shipping_address (object)',
      details: { field: 'shipping_address' },
    }, 422)
  }

  const addr = data.shipping_address
  const missingAddr: string[] = []
  if (!addr.planet) missingAddr.push('shipping_address.planet')
  if (!addr.sector) missingAddr.push('shipping_address.sector')
  if (!addr.system) missingAddr.push('shipping_address.system')

  if (missingAddr.length > 0) {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'Missing required shipping address fields',
      details: {
        missing_fields: missingAddr,
        required_schema: { planet: 'string', sector: 'string', system: 'string', postal_code: 'string (optional)' },
      },
    }, 422)
  }

  // Validate payment_method
  const validPayments = ['galactic_credits', 'republic_tokens', 'imperial_bonds']
  if (!data.payment_method || !validPayments.includes(data.payment_method)) {
    return c.json({
      error: 'Unprocessable Entity',
      message: `payment_method must be one of: ${validPayments.join(', ')}`,
      details: { field: 'payment_method', received: data.payment_method, allowed: validPayments },
    }, 422)
  }

  const subtotal = cartItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0)
  const shippingFee = subtotal > 1000000 ? 0 : 9999 // free shipping over 1M credits
  const total = subtotal + shippingFee
  const now = new Date().toISOString()

  const order: Order = {
    id: generateOrderId(),
    session_token: session.token,
    username: session.username,
    items: [...cartItems],
    shipping_address: data.shipping_address,
    payment_method: data.payment_method,
    status: 'confirmed',
    subtotal,
    shipping_fee: shippingFee,
    total,
    created_at: now,
    updated_at: now,
    estimated_delivery: estimatedDelivery(),
  }

  createOrder(order)
  clearCart(session.token)

  const base = new URL(c.req.url).origin
  return c.json({
    message: 'Order placed successfully. May the Force be with your delivery!',
    order,
    links: {
      order_details: `${base}/api/orders/${order.id}`,
      all_orders: `${base}/api/orders`,
    },
  }, 201)
})

/**
 * GET /api/orders
 * SEQUENCE STEP 6 — List all orders for current user.
 */
app.get('/', (c) => {
  const session = requireAuth(c)
  if (!session) {
    return c.json({ error: 'Unauthorized', message: 'Please login first' }, 401)
  }

  const userOrderList = getUserOrders(session.username)

  return c.json({
    count: userOrderList.length,
    results: userOrderList.map((o) => ({
      id: o.id,
      status: o.status,
      total: o.total,
      item_count: o.items.reduce((sum, i) => sum + i.quantity, 0),
      created_at: o.created_at,
      estimated_delivery: o.estimated_delivery,
    })),
  })
})

/**
 * GET /api/orders/:id
 * SEQUENCE STEP 6 — Get specific order details.
 */
app.get('/:id', (c) => {
  const session = requireAuth(c)
  if (!session) {
    return c.json({ error: 'Unauthorized', message: 'Please login first' }, 401)
  }

  const orderId = c.req.param('id')
  const order = getOrder(orderId)

  if (!order) {
    return c.json({ error: 'Not Found', message: `Order ${orderId} not found` }, 404)
  }

  if (order.username !== session.username && session.role !== 'admin') {
    return c.json({ error: 'Forbidden', message: 'You do not have access to this order' }, 403)
  }

  return c.json(order)
})

export default app
