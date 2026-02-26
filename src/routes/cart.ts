import { Hono } from 'hono'
import { getSession } from '../store'
import { getCart, addCartItem, removeCartItem, clearCart } from '../store'
import { starships } from '../data'
import { getStarshipPrice } from '../data'
import type { AddCartItemRequest, CartItem } from '../types'

const app = new Hono()

function requireAuth(c: Parameters<Parameters<typeof app.use>[1]>[0]) {
  const authHeader = c.req.header('Authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  return getSession(authHeader.slice(7))
}

function generateItemId(): string {
  return 'item_' + Math.random().toString(36).slice(2, 10)
}

/**
 * GET /api/cart
 * SEQUENCE STEP 4 — View current cart contents.
 */
app.get('/', (c) => {
  const session = requireAuth(c)
  if (!session) {
    return c.json({ error: 'Unauthorized', message: 'Please login first' }, 401)
  }

  const items = getCart(session.token)
  const totalPrice = items.reduce((sum, i) => sum + i.unit_price * i.quantity, 0)

  return c.json({
    session_token: session.token.slice(0, 12) + '...',
    items,
    total_items: items.reduce((sum, i) => sum + i.quantity, 0),
    total_price: totalPrice,
    updated_at: new Date().toISOString(),
  })
})

/**
 * POST /api/cart/items
 * SEQUENCE STEP 3 — Add an item to the cart.
 *
 * Schema Validation demo:
 *   Required: item_type (starship|vehicle|artifact), item_id (integer), quantity (integer, min 1)
 */
app.post('/items', async (c) => {
  const session = requireAuth(c)
  if (!session) {
    return c.json({ error: 'Unauthorized', message: 'Please login first' }, 401)
  }

  let body: unknown
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Bad Request', message: 'Request body must be valid JSON' }, 400)
  }

  const data = body as Partial<AddCartItemRequest>

  // Validate required fields
  const validItemTypes = ['starship', 'vehicle', 'artifact']
  if (!data.item_type || !validItemTypes.includes(data.item_type)) {
    return c.json({
      error: 'Unprocessable Entity',
      message: `item_type must be one of: ${validItemTypes.join(', ')}`,
      details: { field: 'item_type', received: data.item_type, allowed: validItemTypes },
    }, 422)
  }

  if (typeof data.item_id !== 'number' || !Number.isInteger(data.item_id) || data.item_id < 1) {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'item_id must be a positive integer',
      details: { field: 'item_id', received: data.item_id },
    }, 422)
  }

  if (typeof data.quantity !== 'number' || !Number.isInteger(data.quantity) || data.quantity < 1) {
    return c.json({
      error: 'Unprocessable Entity',
      message: 'quantity must be a positive integer (min: 1)',
      details: { field: 'quantity', received: data.quantity },
    }, 422)
  }

  // Look up item details
  let itemName = 'Unknown Item'
  let unitPrice = 50000

  if (data.item_type === 'starship') {
    const ship = starships.find((s) => s.id === data.item_id)
    if (!ship) {
      return c.json({
        error: 'Not Found',
        message: `Starship with id ${data.item_id} does not exist`,
      }, 404)
    }
    itemName = ship.name
    unitPrice = getStarshipPrice(data.item_id)
  }

  const cartItem: CartItem = {
    id: generateItemId(),
    item_type: data.item_type,
    item_id: data.item_id,
    item_name: itemName,
    quantity: data.quantity,
    unit_price: unitPrice,
    added_at: new Date().toISOString(),
  }

  addCartItem(session.token, cartItem)

  return c.json({
    message: 'Item added to cart',
    item: cartItem,
  }, 201)
})

/**
 * DELETE /api/cart/items/:itemId
 * Remove a specific item from the cart.
 */
app.delete('/items/:itemId', (c) => {
  const session = requireAuth(c)
  if (!session) {
    return c.json({ error: 'Unauthorized', message: 'Please login first' }, 401)
  }

  const itemId = c.req.param('itemId')
  const removed = removeCartItem(session.token, itemId)

  if (!removed) {
    return c.json({ error: 'Not Found', message: `Cart item ${itemId} not found` }, 404)
  }

  return c.json({ message: `Item ${itemId} removed from cart` })
})

/**
 * DELETE /api/cart
 * Clear entire cart.
 */
app.delete('/', (c) => {
  const session = requireAuth(c)
  if (!session) {
    return c.json({ error: 'Unauthorized', message: 'Please login first' }, 401)
  }

  clearCart(session.token)
  return c.json({ message: 'Cart cleared successfully' })
})

export default app
