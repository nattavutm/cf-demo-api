/**
 * OpenAPI 3.0 specification for the CF Demo API.
 * Upload to Cloudflare API Shield for Schema Validation.
 */
export function buildOpenAPISpec(baseUrl: string) {
  return {
    openapi: '3.0.3',
    info: {
      title: 'CF Demo API - Star Wars Edition',
      version: '1.0.0',
      description: 'Demo REST API for Cloudflare API Security (Schema Validation & Sequence Mitigation)',
    },
    servers: [{ url: baseUrl, description: 'Cloudflare Workers' }],
    components: {
      securitySchemes: {
        BearerAuth: { type: 'http', scheme: 'bearer' },
      },
      schemas: {
        Error: {
          type: 'object',
          required: ['error', 'message'],
          properties: {
            error: { type: 'string' },
            message: { type: 'string' },
            details: { type: 'object' },
          },
        },
        Person: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            height: { type: 'string' },
            mass: { type: 'string' },
            hair_color: { type: 'string' },
            skin_color: { type: 'string' },
            eye_color: { type: 'string' },
            birth_year: { type: 'string' },
            gender: { type: 'string', enum: ['male', 'female', 'hermaphrodite', 'n/a', 'unknown'] },
            homeworld_id: { type: 'integer' },
            url: { type: 'string', format: 'uri' },
          },
        },
        CreatePersonRequest: {
          type: 'object',
          required: ['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender', 'homeworld_id'],
          properties: {
            name: { type: 'string', minLength: 1 },
            height: { type: 'string' },
            mass: { type: 'string' },
            hair_color: { type: 'string' },
            skin_color: { type: 'string' },
            eye_color: { type: 'string' },
            birth_year: { type: 'string' },
            gender: { type: 'string', enum: ['male', 'female', 'hermaphrodite', 'n/a', 'unknown'] },
            homeworld_id: { type: 'integer', minimum: 1 },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', minLength: 1 },
            password: { type: 'string', minLength: 1 },
          },
        },
        AddCartItemRequest: {
          type: 'object',
          required: ['item_type', 'item_id', 'quantity'],
          properties: {
            item_type: { type: 'string', enum: ['starship', 'vehicle', 'artifact'] },
            item_id: { type: 'integer', minimum: 1 },
            quantity: { type: 'integer', minimum: 1 },
          },
        },
        CheckoutRequest: {
          type: 'object',
          required: ['shipping_address', 'payment_method'],
          properties: {
            shipping_address: {
              type: 'object',
              required: ['planet', 'sector', 'system'],
              properties: {
                planet: { type: 'string' },
                sector: { type: 'string' },
                system: { type: 'string' },
                postal_code: { type: 'string' },
              },
            },
            payment_method: { type: 'string', enum: ['galactic_credits', 'republic_tokens', 'imperial_bonds'] },
          },
        },
      },
    },
    paths: {
      '/api': {
        get: { summary: 'API root', tags: ['General'], responses: { '200': { description: 'API info' } } },
      },
      '/api/auth/login': {
        post: {
          summary: 'Login - SEQUENCE STEP 1',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } },
          },
          responses: {
            '200': { description: 'Login successful, returns bearer token' },
            '401': { description: 'Invalid credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
            '422': { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/auth/me': {
        get: {
          summary: 'Get current user - SEQUENCE STEP 2',
          tags: ['Auth'],
          security: [{ BearerAuth: [] }],
          responses: {
            '200': { description: 'Current user profile' },
            '401': { description: 'Unauthorized' },
          },
        },
      },
      '/api/auth/logout': {
        post: {
          summary: 'Logout',
          tags: ['Auth'],
          security: [{ BearerAuth: [] }],
          responses: { '200': { description: 'Logged out' }, '401': { description: 'Unauthorized' } },
        },
      },
      '/api/people': {
        get: {
          summary: 'List people',
          tags: ['People'],
          parameters: [
            { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
            { name: 'page_size', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 20, default: 10 } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
          ],
          responses: { '200': { description: 'Paginated list of people' } },
        },
        post: {
          summary: 'Create person - Schema Validation demo',
          tags: ['People'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatePersonRequest' } } },
          },
          responses: {
            '201': { description: 'Person created' },
            '422': { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/people/{id}': {
        get: { summary: 'Get person by ID', tags: ['People'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Person details' }, '404': { description: 'Not found' } } },
        put: {
          summary: 'Update person - Schema Validation demo',
          tags: ['People'],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
          requestBody: { required: true, content: { 'application/json': { schema: { type: 'object' } } } },
          responses: { '200': { description: 'Person updated' }, '404': { description: 'Not found' } },
        },
        delete: { summary: 'Delete person', tags: ['People'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Deleted' }, '404': { description: 'Not found' } } },
      },
      '/api/films': {
        get: { summary: 'List all films', tags: ['Films'], responses: { '200': { description: 'Films list' } } },
      },
      '/api/films/{id}': {
        get: { summary: 'Get film by ID', tags: ['Films'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Film details' }, '404': { description: 'Not found' } } },
      },
      '/api/planets': {
        get: { summary: 'List planets', tags: ['Planets'], parameters: [{ name: 'page', in: 'query', schema: { type: 'integer' } }, { name: 'page_size', in: 'query', schema: { type: 'integer' } }], responses: { '200': { description: 'Planets list' } } },
      },
      '/api/planets/{id}': {
        get: { summary: 'Get planet by ID', tags: ['Planets'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Planet details' }, '404': { description: 'Not found' } } },
      },
      '/api/starships': {
        get: { summary: 'List starships - SEQUENCE STEP 3', tags: ['Starships'], parameters: [{ name: 'page', in: 'query', schema: { type: 'integer' } }, { name: 'page_size', in: 'query', schema: { type: 'integer' } }], responses: { '200': { description: 'Starships list' } } },
      },
      '/api/starships/{id}': {
        get: { summary: 'Get starship by ID', tags: ['Starships'], parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }], responses: { '200': { description: 'Starship details' }, '404': { description: 'Not found' } } },
      },
      '/api/cart': {
        get: {
          summary: 'View cart - SEQUENCE STEP 5',
          tags: ['Cart'],
          security: [{ BearerAuth: [] }],
          responses: { '200': { description: 'Cart contents' }, '401': { description: 'Unauthorized' } },
        },
        delete: {
          summary: 'Clear cart',
          tags: ['Cart'],
          security: [{ BearerAuth: [] }],
          responses: { '200': { description: 'Cart cleared' }, '401': { description: 'Unauthorized' } },
        },
      },
      '/api/cart/items': {
        post: {
          summary: 'Add item to cart - SEQUENCE STEP 4',
          tags: ['Cart'],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/AddCartItemRequest' } } },
          },
          responses: {
            '201': { description: 'Item added' },
            '401': { description: 'Unauthorized' },
            '422': { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
          },
        },
      },
      '/api/cart/items/{itemId}': {
        delete: {
          summary: 'Remove item from cart',
          tags: ['Cart'],
          security: [{ BearerAuth: [] }],
          parameters: [{ name: 'itemId', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Item removed' }, '404': { description: 'Not found' } },
        },
      },
      '/api/orders': {
        post: {
          summary: 'Checkout / place order - SEQUENCE STEP 6',
          tags: ['Orders'],
          security: [{ BearerAuth: [] }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/CheckoutRequest' } } },
          },
          responses: {
            '201': { description: 'Order created' },
            '401': { description: 'Unauthorized' },
            '422': { description: 'Empty cart or validation error' },
          },
        },
        get: {
          summary: 'List orders - SEQUENCE STEP 7',
          tags: ['Orders'],
          security: [{ BearerAuth: [] }],
          responses: { '200': { description: 'Orders list' }, '401': { description: 'Unauthorized' } },
        },
      },
      '/api/orders/{id}': {
        get: {
          summary: 'Get order by ID',
          tags: ['Orders'],
          security: [{ BearerAuth: [] }],
          parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Order details' }, '401': { description: 'Unauthorized' }, '404': { description: 'Not found' } },
        },
      },
    },
  }
}
