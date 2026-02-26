/**
 * In-memory store for demo purposes.
 * In production, replace with Cloudflare KV or D1.
 *
 * Note: This store is per-Worker-instance. In a multi-instance
 * deployment (which is normal for Cloudflare Workers), sessions
 * are not shared. For the demo, this is acceptable.
 */

import type { Session, CartItem, Order } from './types'

// ─── Session Store ────────────────────────────────────────────────────────────

const sessions = new Map<string, Session>()

export function createSession(session: Session): void {
  sessions.set(session.token, session)
}

export function getSession(token: string): Session | undefined {
  const session = sessions.get(token)
  if (!session) return undefined

  // Check expiry
  if (new Date(session.expires_at) < new Date()) {
    sessions.delete(token)
    return undefined
  }
  return session
}

export function deleteSession(token: string): void {
  sessions.delete(token)
}

// ─── Cart Store ───────────────────────────────────────────────────────────────

const carts = new Map<string, CartItem[]>()

export function getCart(sessionToken: string): CartItem[] {
  return carts.get(sessionToken) ?? []
}

export function addCartItem(sessionToken: string, item: CartItem): void {
  const cart = getCart(sessionToken)
  const existing = cart.find((i) => i.item_type === item.item_type && i.item_id === item.item_id)

  if (existing) {
    existing.quantity += item.quantity
    existing.added_at = new Date().toISOString()
  } else {
    cart.push(item)
  }
  carts.set(sessionToken, cart)
}

export function removeCartItem(sessionToken: string, itemId: string): boolean {
  const cart = getCart(sessionToken)
  const index = cart.findIndex((i) => i.id === itemId)
  if (index === -1) return false
  cart.splice(index, 1)
  carts.set(sessionToken, cart)
  return true
}

export function clearCart(sessionToken: string): void {
  carts.delete(sessionToken)
}

// ─── Order Store ──────────────────────────────────────────────────────────────

const orders = new Map<string, Order>()
const userOrders = new Map<string, string[]>() // username → order IDs

export function createOrder(order: Order): void {
  orders.set(order.id, order)

  const existing = userOrders.get(order.username) ?? []
  existing.push(order.id)
  userOrders.set(order.username, existing)
}

export function getOrder(orderId: string): Order | undefined {
  return orders.get(orderId)
}

export function getUserOrders(username: string): Order[] {
  const ids = userOrders.get(username) ?? []
  return ids.map((id) => orders.get(id)).filter((o): o is Order => o !== undefined)
}

// ─── Demo Users ───────────────────────────────────────────────────────────────

export const demoUsers: Record<string, { password: string; role: 'user' | 'admin' }> = {
  'rebel_pilot': { password: 'may_the_force', role: 'user' },
  'jedi_master': { password: 'use_the_force', role: 'admin' },
  'han_solo': { password: 'nerf_herder', role: 'user' },
  'leia_organa': { password: 'alderaan_forever', role: 'user' },
  'demo': { password: 'demo', role: 'user' },
}
