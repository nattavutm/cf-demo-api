export function renderUI(baseUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CF Demo API — Star Wars API Security Demo</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0a0f;
      --surface: #12121a;
      --surface2: #1a1a26;
      --surface3: #22223a;
      --border: #2a2a45;
      --yellow: #f6c90e;
      --yellow-dim: #c8a00a;
      --blue: #4fc3f7;
      --blue-dim: #0288d1;
      --green: #4caf50;
      --red: #ef5350;
      --orange: #ff9800;
      --purple: #ce93d8;
      --text: #e0e0e0;
      --text-dim: #9e9e9e;
      --font-mono: 'Courier New', monospace;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: var(--bg);
      color: var(--text);
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* ── Header ── */
    header {
      background: var(--surface);
      border-bottom: 1px solid var(--border);
      padding: 12px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      flex-shrink: 0;
    }
    header .logo { font-size: 22px; }
    header h1 { font-size: 16px; font-weight: 700; color: var(--yellow); letter-spacing: 0.5px; }
    header p { font-size: 12px; color: var(--text-dim); }
    header .badge {
      margin-left: auto;
      background: var(--surface3);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 4px 10px;
      font-size: 11px;
      color: var(--blue);
    }

    /* ── Layout ── */
    .layout {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    /* ── Sidebar ── */
    .sidebar {
      width: 260px;
      background: var(--surface);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      flex-shrink: 0;
    }
    .sidebar-scroll { overflow-y: auto; flex: 1; padding: 12px 0; }

    .section-header {
      padding: 8px 16px 4px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-dim);
    }

    .endpoint-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 8px 16px;
      background: transparent;
      border: none;
      color: var(--text);
      cursor: pointer;
      text-align: left;
      font-size: 13px;
      transition: background 0.15s;
    }
    .endpoint-btn:hover { background: var(--surface2); }
    .endpoint-btn.active { background: var(--surface3); color: var(--yellow); }

    .method-badge {
      font-size: 10px;
      font-weight: 700;
      font-family: var(--font-mono);
      padding: 2px 5px;
      border-radius: 3px;
      min-width: 40px;
      text-align: center;
    }
    .method-GET    { background: #1a3a1a; color: var(--green); }
    .method-POST   { background: #1a2a3a; color: var(--blue); }
    .method-PUT    { background: #3a2a1a; color: var(--orange); }
    .method-DELETE { background: #3a1a1a; color: var(--red); }

    /* ── Sequence Panel ── */
    .sequence-panel {
      border-top: 1px solid var(--border);
      padding: 12px 16px;
      flex-shrink: 0;
    }
    .sequence-panel h3 { font-size: 11px; font-weight: 700; color: var(--yellow); letter-spacing: 0.5px; margin-bottom: 8px; }
    .step-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 6px 8px;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 5px;
      color: var(--text-dim);
      cursor: pointer;
      text-align: left;
      font-size: 11px;
      margin-bottom: 3px;
      transition: all 0.15s;
    }
    .step-btn:hover { background: var(--surface2); border-color: var(--border); color: var(--text); }
    .step-btn .step-num {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--surface3);
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
      flex-shrink: 0;
      color: var(--yellow);
    }

    /* ── Main Panel ── */
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* ── Request Builder ── */
    .request-builder {
      border-bottom: 1px solid var(--border);
      padding: 16px 20px;
      background: var(--surface);
      flex-shrink: 0;
    }

    .url-bar {
      display: flex;
      gap: 8px;
      align-items: stretch;
    }

    select, input, textarea {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 6px;
      color: var(--text);
      font-family: var(--font-mono);
      font-size: 13px;
      padding: 8px 12px;
      outline: none;
      transition: border-color 0.15s;
    }
    select:focus, input:focus, textarea:focus { border-color: var(--yellow); }

    #methodSelect {
      width: 90px;
      flex-shrink: 0;
      cursor: pointer;
      font-weight: 700;
    }

    #urlInput { flex: 1; }

    .send-btn {
      background: var(--yellow);
      color: #000;
      border: none;
      border-radius: 6px;
      padding: 8px 20px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      flex-shrink: 0;
      transition: background 0.15s;
    }
    .send-btn:hover { background: var(--yellow-dim); }
    .send-btn:disabled { background: var(--surface3); color: var(--text-dim); cursor: not-allowed; }

    .request-extras {
      display: flex;
      gap: 12px;
      margin-top: 10px;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .field-group label { font-size: 11px; color: var(--text-dim); }
    .field-group textarea {
      resize: vertical;
      min-height: 80px;
      font-size: 12px;
    }
    .token-display {
      font-size: 11px;
      color: var(--green);
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 8px 12px;
      font-family: var(--font-mono);
      word-break: break-all;
      min-height: 36px;
    }

    /* ── Response Panel ── */
    .response-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 16px 20px;
      gap: 10px;
    }

    .response-header {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    .response-header h3 { font-size: 13px; font-weight: 600; }

    .status-badge {
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .status-2xx { background: #1a3a1a; color: var(--green); }
    .status-4xx { background: #3a1a1a; color: var(--red); }
    .status-5xx { background: #3a1a1a; color: var(--red); }

    .response-time { font-size: 11px; color: var(--text-dim); margin-left: auto; }

    .response-body {
      flex: 1;
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: auto;
      padding: 14px;
    }
    .response-body pre {
      font-family: var(--font-mono);
      font-size: 12px;
      line-height: 1.6;
      color: var(--text);
      white-space: pre-wrap;
    }
    .placeholder-text {
      color: var(--text-dim);
      font-size: 13px;
      text-align: center;
      padding: 40px;
    }

    /* JSON syntax highlighting */
    .json-key    { color: var(--blue); }
    .json-string { color: var(--green); }
    .json-number { color: var(--orange); }
    .json-bool   { color: var(--purple); }
    .json-null   { color: var(--red); }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: var(--surface); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--text-dim); }

    .divider { height: 1px; background: var(--border); margin: 8px 16px; }
  </style>
</head>
<body>

<header>
  <div class="logo">⚔️</div>
  <div>
    <h1>CF Demo API — Star Wars Edition</h1>
    <p>Cloudflare API Security Demo — Schema Validation & Sequence Mitigation</p>
  </div>
  <div class="badge">Base: <span id="baseUrlDisplay">${baseUrl}</span></div>
</header>

<div class="layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="sidebar-scroll">

      <div class="section-header">🌐 General</div>
      <button class="endpoint-btn" onclick="load('GET','/api')">
        <span class="method-badge method-GET">GET</span>/api
      </button>
      <button class="endpoint-btn" onclick="load('GET','/openapi.json')">
        <span class="method-badge method-GET">GET</span>/openapi.json
      </button>

      <div class="divider"></div>
      <div class="section-header">🔐 Auth</div>
      <button class="endpoint-btn" onclick="load('POST','/api/auth/login','json',\`{"username":"demo","password":"demo"}\`)">
        <span class="method-badge method-POST">POST</span>/auth/login
      </button>
      <button class="endpoint-btn" onclick="load('GET','/api/auth/me','auth')">
        <span class="method-badge method-GET">GET</span>/auth/me
      </button>
      <button class="endpoint-btn" onclick="load('POST','/api/auth/logout','auth')">
        <span class="method-badge method-POST">POST</span>/auth/logout
      </button>

      <div class="divider"></div>
      <div class="section-header">👥 People</div>
      <button class="endpoint-btn" onclick="load('GET','/api/people')">
        <span class="method-badge method-GET">GET</span>/people
      </button>
      <button class="endpoint-btn" onclick="load('GET','/api/people/1')">
        <span class="method-badge method-GET">GET</span>/people/1
      </button>
      <button class="endpoint-btn" onclick="load('POST','/api/people','json',\`{\n  "name": "Ahsoka Tano",\n  "height": "170",\n  "mass": "54",\n  "hair_color": "none",\n  "skin_color": "white",\n  "eye_color": "blue",\n  "birth_year": "36BBY",\n  "gender": "female",\n  "homeworld_id": 1\n}\`)">
        <span class="method-badge method-POST">POST</span>/people
      </button>
      <button class="endpoint-btn" onclick="load('PUT','/api/people/1','json',\`{"mass":"80","hair_color":"dark blond"}\`)">
        <span class="method-badge method-PUT">PUT</span>/people/1
      </button>
      <button class="endpoint-btn" onclick="load('DELETE','/api/people/1')">
        <span class="method-badge method-DELETE">DEL</span>/people/1
      </button>

      <div class="divider"></div>
      <div class="section-header">🎬 Films</div>
      <button class="endpoint-btn" onclick="load('GET','/api/films')">
        <span class="method-badge method-GET">GET</span>/films
      </button>
      <button class="endpoint-btn" onclick="load('GET','/api/films/1')">
        <span class="method-badge method-GET">GET</span>/films/1
      </button>

      <div class="divider"></div>
      <div class="section-header">🪐 Planets</div>
      <button class="endpoint-btn" onclick="load('GET','/api/planets')">
        <span class="method-badge method-GET">GET</span>/planets
      </button>
      <button class="endpoint-btn" onclick="load('GET','/api/planets/1')">
        <span class="method-badge method-GET">GET</span>/planets/1
      </button>

      <div class="divider"></div>
      <div class="section-header">🚀 Starships</div>
      <button class="endpoint-btn" onclick="load('GET','/api/starships')">
        <span class="method-badge method-GET">GET</span>/starships
      </button>
      <button class="endpoint-btn" onclick="load('GET','/api/starships/10')">
        <span class="method-badge method-GET">GET</span>/starships/10
      </button>

      <div class="divider"></div>
      <div class="section-header">🛒 Cart</div>
      <button class="endpoint-btn" onclick="load('GET','/api/cart','auth')">
        <span class="method-badge method-GET">GET</span>/cart
      </button>
      <button class="endpoint-btn" onclick="load('POST','/api/cart/items','auth+json',\`{\n  "item_type": "starship",\n  "item_id": 10,\n  "quantity": 1\n}\`)">
        <span class="method-badge method-POST">POST</span>/cart/items
      </button>
      <button class="endpoint-btn" onclick="load('DELETE','/api/cart','auth')">
        <span class="method-badge method-DELETE">DEL</span>/cart
      </button>

      <div class="divider"></div>
      <div class="section-header">📦 Orders</div>
      <button class="endpoint-btn" onclick="load('POST','/api/orders','auth+json',\`{\n  "shipping_address": {\n    "planet": "Tatooine",\n    "sector": "Arkanis",\n    "system": "Tatoo"\n  },\n  "payment_method": "galactic_credits"\n}\`)">
        <span class="method-badge method-POST">POST</span>/orders (checkout)
      </button>
      <button class="endpoint-btn" onclick="load('GET','/api/orders','auth')">
        <span class="method-badge method-GET">GET</span>/orders
      </button>

    </div>

    <!-- Sequence Demo Panel -->
    <div class="sequence-panel">
      <h3>⚡ SEQUENCE DEMO</h3>
      <button class="step-btn" onclick="runStep(1)">
        <span class="step-num">1</span>POST /auth/login
      </button>
      <button class="step-btn" onclick="runStep(2)">
        <span class="step-num">2</span>GET /auth/me
      </button>
      <button class="step-btn" onclick="runStep(3)">
        <span class="step-num">3</span>GET /starships
      </button>
      <button class="step-btn" onclick="runStep(4)">
        <span class="step-num">4</span>POST /cart/items
      </button>
      <button class="step-btn" onclick="runStep(5)">
        <span class="step-num">5</span>GET /cart
      </button>
      <button class="step-btn" onclick="runStep(6)">
        <span class="step-num">6</span>POST /orders (checkout)
      </button>
      <button class="step-btn" onclick="runStep(7)">
        <span class="step-num">7</span>GET /orders
      </button>
    </div>
  </aside>

  <!-- Main -->
  <main class="main">
    <!-- Request Builder -->
    <div class="request-builder">
      <div class="url-bar">
        <select id="methodSelect" onchange="updateMethodColor()">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input id="urlInput" type="text" value="/api" placeholder="/api/people">
        <button class="send-btn" id="sendBtn" onclick="sendRequest()">Send</button>
      </div>

      <div class="request-extras">
        <div class="field-group" style="max-width:280px">
          <label>Auth Token (auto-filled after login)</label>
          <div class="token-display" id="tokenDisplay">— not logged in —</div>
        </div>
        <div class="field-group">
          <label>Request Body (JSON)</label>
          <textarea id="bodyInput" placeholder='{ "username": "demo", "password": "demo" }'></textarea>
        </div>
      </div>
    </div>

    <!-- Response -->
    <div class="response-panel">
      <div class="response-header">
        <h3>Response</h3>
        <span id="statusBadge"></span>
        <span class="response-time" id="responseTime"></span>
      </div>
      <div class="response-body" id="responseBody">
        <div class="placeholder-text">
          Select an endpoint from the sidebar or click <strong>Send</strong> to make a request.
        </div>
      </div>
    </div>
  </main>
</div>

<script>
  const BASE = '${baseUrl}'
  let authToken = ''

  function updateMethodColor() {
    const sel = document.getElementById('methodSelect')
    const m = sel.value
    sel.style.color = { GET:'#4caf50', POST:'#4fc3f7', PUT:'#ff9800', DELETE:'#ef5350' }[m] || '#e0e0e0'
  }
  updateMethodColor()

  function load(method, path, mode, body) {
    document.getElementById('methodSelect').value = method
    updateMethodColor()
    document.getElementById('urlInput').value = path
    document.getElementById('bodyInput').value = body ?? ''
    // If auth mode, ensure token is shown
  }

  async function sendRequest() {
    const method = document.getElementById('methodSelect').value
    const path = document.getElementById('urlInput').value.trim()
    const bodyRaw = document.getElementById('bodyInput').value.trim()

    const url = path.startsWith('http') ? path : BASE + path

    const headers = { 'Content-Type': 'application/json' }
    if (authToken) headers['Authorization'] = 'Bearer ' + authToken

    const opts = { method, headers }
    if (['POST','PUT','PATCH'].includes(method) && bodyRaw) {
      try { JSON.parse(bodyRaw) } catch(e) {
        showResponse(null, 0, 0, 'Invalid JSON in request body: ' + e.message)
        return
      }
      opts.body = bodyRaw
    }

    const btn = document.getElementById('sendBtn')
    btn.disabled = true
    btn.textContent = '...'

    const t0 = performance.now()
    let resp, data
    try {
      resp = await fetch(url, opts)
      data = await resp.json()
    } catch(e) {
      showResponse(null, 0, performance.now() - t0, 'Network error: ' + e.message)
      btn.disabled = false
      btn.textContent = 'Send'
      return
    }

    // Auto-capture token
    if (data && data.token) {
      authToken = data.token
      document.getElementById('tokenDisplay').textContent = authToken
    }

    showResponse(resp.status, resp.status, performance.now() - t0, data)
    btn.disabled = false
    btn.textContent = 'Send'
  }

  function showResponse(_, status, ms, data) {
    const badge = document.getElementById('statusBadge')
    const timeEl = document.getElementById('responseTime')
    const body = document.getElementById('responseBody')

    if (status) {
      const cls = status < 300 ? 'status-2xx' : 'status-4xx'
      badge.className = 'status-badge ' + cls
      badge.textContent = status
    } else {
      badge.className = 'status-badge status-4xx'
      badge.textContent = 'ERR'
    }

    timeEl.textContent = ms ? Math.round(ms) + ' ms' : ''

    if (typeof data === 'string') {
      body.innerHTML = '<pre>' + escapeHtml(data) + '</pre>'
    } else {
      body.innerHTML = '<pre>' + syntaxHighlight(JSON.stringify(data, null, 2)) + '</pre>'
    }
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  }

  function syntaxHighlight(json) {
    json = escapeHtml(json)
    return json.replace(/"(\\\\u[0-9a-fA-F]{4}|\\\\[^u]|[^\\\\"])*"\\s*:/g, m =>
      '<span class="json-key">' + m + '</span>'
    ).replace(/"(\\\\u[0-9a-fA-F]{4}|\\\\[^u]|[^\\\\"])*"/g, m =>
      '<span class="json-string">' + m + '</span>'
    ).replace(/\\b(-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?)\\b/g, m =>
      '<span class="json-number">' + m + '</span>'
    ).replace(/\\b(true|false)\\b/g, m =>
      '<span class="json-bool">' + m + '</span>'
    ).replace(/\\bnull\\b/g, m =>
      '<span class="json-null">' + m + '</span>'
    )
  }

  const sequenceSteps = [
    { method:'POST', path:'/api/auth/login',  body: JSON.stringify({username:'demo',password:'demo'}, null, 2) },
    { method:'GET',  path:'/api/auth/me',      body: '' },
    { method:'GET',  path:'/api/starships',    body: '' },
    { method:'POST', path:'/api/cart/items',   body: JSON.stringify({item_type:'starship',item_id:10,quantity:1}, null, 2) },
    { method:'GET',  path:'/api/cart',         body: '' },
    { method:'POST', path:'/api/orders',       body: JSON.stringify({shipping_address:{planet:'Tatooine',sector:'Arkanis',system:'Tatoo'},payment_method:'galactic_credits'}, null, 2) },
    { method:'GET',  path:'/api/orders',       body: '' },
  ]

  function runStep(n) {
    const s = sequenceSteps[n - 1]
    if (!s) return
    document.getElementById('methodSelect').value = s.method
    updateMethodColor()
    document.getElementById('urlInput').value = s.path
    document.getElementById('bodyInput').value = s.body
    sendRequest()
  }

  // Allow Enter in URL to send
  document.getElementById('urlInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendRequest()
  })
</script>
</body>
</html>`
}
