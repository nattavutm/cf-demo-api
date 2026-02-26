// ─── Domain Types ────────────────────────────────────────────────────────────

export interface Person {
  id: number
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: 'male' | 'female' | 'hermaphrodite' | 'n/a' | 'unknown'
  homeworld_id: number
  film_ids: number[]
  species_ids: number[]
  vehicle_ids: number[]
  starship_ids: number[]
  created: string
  edited: string
}

export interface Film {
  id: number
  title: string
  episode_id: number
  opening_crawl: string
  director: string
  producer: string
  release_date: string
  character_ids: number[]
  planet_ids: number[]
  starship_ids: number[]
  vehicle_ids: number[]
  species_ids: number[]
  created: string
  edited: string
}

export interface Planet {
  id: number
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  resident_ids: number[]
  film_ids: number[]
  created: string
  edited: string
}

export interface Starship {
  id: number
  name: string
  model: string
  manufacturer: string
  cost_in_credits: string
  length: string
  max_atmosphering_speed: string
  crew: string
  passengers: string
  cargo_capacity: string
  consumables: string
  hyperdrive_rating: string
  MGLT: string
  starship_class: string
  pilot_ids: number[]
  film_ids: number[]
  created: string
  edited: string
}

// ─── Auth Types ───────────────────────────────────────────────────────────────

export interface Session {
  token: string
  user_id: string
  username: string
  role: 'user' | 'admin'
  created_at: string
  expires_at: string
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export type ItemType = 'starship' | 'vehicle' | 'artifact'

export interface CartItem {
  id: string
  item_type: ItemType
  item_id: number
  item_name: string
  quantity: number
  unit_price: number
  added_at: string
}

export interface Cart {
  session_token: string
  items: CartItem[]
  total_items: number
  total_price: number
  updated_at: string
}

// ─── Order Types ──────────────────────────────────────────────────────────────

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
export type PaymentMethod = 'galactic_credits' | 'republic_tokens' | 'imperial_bonds'

export interface ShippingAddress {
  planet: string
  sector: string
  system: string
  postal_code?: string
}

export interface Order {
  id: string
  session_token: string
  username: string
  items: CartItem[]
  shipping_address: ShippingAddress
  payment_method: PaymentMethod
  status: OrderStatus
  subtotal: number
  shipping_fee: number
  total: number
  created_at: string
  updated_at: string
  estimated_delivery: string
}

// ─── Request Body Types ───────────────────────────────────────────────────────

export interface LoginRequest {
  username: string
  password: string
}

export interface CreatePersonRequest {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: 'male' | 'female' | 'hermaphrodite' | 'n/a' | 'unknown'
  homeworld_id: number
}

export interface UpdatePersonRequest {
  name?: string
  height?: string
  mass?: string
  hair_color?: string
  skin_color?: string
  eye_color?: string
  birth_year?: string
  gender?: 'male' | 'female' | 'hermaphrodite' | 'n/a' | 'unknown'
  homeworld_id?: number
}

export interface AddCartItemRequest {
  item_type: ItemType
  item_id: number
  quantity: number
}

export interface CheckoutRequest {
  shipping_address: ShippingAddress
  payment_method: PaymentMethod
}

// ─── Response Wrapper ─────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  count: number
  page: number
  page_size: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ErrorResponse {
  error: string
  message: string
  details?: unknown
}
