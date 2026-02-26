# CF Demo API — Star Wars Edition

REST API บน Cloudflare Workers สำหรับ demo **Cloudflare API Security** ได้แก่ Schema Validation และ Sequence Mitigation โดยใช้ข้อมูล Star Wars เป็น theme

---

## Quick Start

```bash
npm install
npm run dev   # http://localhost:8787
```

เปิดเบราว์เซอร์ไปที่ **http://localhost:8787** จะเจอ Web UI ทดสอบ API ได้เลย

---

## Web UI Playground

เข้าได้ที่ `/` หรือ `/docs`

```
http://localhost:8787/docs
```

![layout]

```
┌─────────────────┬──────────────────────────────────────────┐
│  Sidebar        │  Request Builder                         │
│  ─────────      │  Method [GET▼]  URL [/api/people]  Send  │
│  🔐 Auth        │  Auth Token: demo_xxxx...                │
│  👥 People      │  Body: { ... }                           │
│  🎬 Films       ├──────────────────────────────────────────│
│  🪐 Planets     │  Response  200  42ms                     │
│  🚀 Starships   │  { "count": 10, "results": [...] }       │
│  🛒 Cart        │                                          │
│  📦 Orders      │                                          │
│  ─────────      │                                          │
│  ⚡ SEQUENCE    │                                          │
│  [1] Login      │                                          │
│  [2] Me         │                                          │
│  [3] Starships  │                                          │
│  [4] Add Cart   │                                          │
│  [5] View Cart  │                                          │
│  [6] Checkout   │                                          │
│  [7] Orders     │                                          │
└─────────────────┴──────────────────────────────────────────┘
```

- คลิก endpoint ใน sidebar → โหลด request พร้อม body ตัวอย่าง
- กด **Send** หรือ Enter ใน URL bar เพื่อส่ง request
- token จะถูกจำอัตโนมัติหลัง login สำเร็จ
- กดปุ่ม **⚡ SEQUENCE DEMO** ทีละขั้นตอนสำหรับ demo Sequence Mitigation

---

## Endpoints

| Method | Path | คำอธิบาย |
|--------|------|----------|
| `GET` | `/api` | API root |
| `GET` | `/openapi.json` | OpenAPI 3.0 spec |
| `GET` | `/api/people` | รายชื่อตัวละคร (pagination + search) |
| `GET` | `/api/people/:id` | ดูตัวละครตาม ID |
| `POST` | `/api/people` | สร้างตัวละครใหม่ *(schema validation)* |
| `PUT` | `/api/people/:id` | แก้ไขตัวละคร *(schema validation)* |
| `DELETE` | `/api/people/:id` | ลบตัวละคร |
| `GET` | `/api/films` | รายการภาพยนตร์ |
| `GET` | `/api/films/:id` | ดูภาพยนตร์ตาม ID |
| `GET` | `/api/planets` | รายชื่อดาวเคราะห์ |
| `GET` | `/api/planets/:id` | ดูดาวเคราะห์ตาม ID |
| `GET` | `/api/starships` | รายชื่อยานอวกาศ |
| `GET` | `/api/starships/:id` | ดูยานอวกาศตาม ID |
| `POST` | `/api/auth/login` | เข้าสู่ระบบ → ได้ Bearer token |
| `GET` | `/api/auth/me` | ดูข้อมูล user ปัจจุบัน |
| `POST` | `/api/auth/logout` | ออกจากระบบ |
| `GET` | `/api/cart` | ดูตะกร้าสินค้า |
| `POST` | `/api/cart/items` | เพิ่มสินค้าในตะกร้า *(schema validation)* |
| `DELETE` | `/api/cart/items/:id` | ลบสินค้าออกจากตะกร้า |
| `DELETE` | `/api/cart` | ล้างตะกร้า |
| `POST` | `/api/orders` | สั่งซื้อ / checkout *(schema validation)* |
| `GET` | `/api/orders` | ดูรายการสั่งซื้อ |
| `GET` | `/api/orders/:id` | ดูรายการสั่งซื้อตาม ID |

---

## Demo Credentials

| Username | Password | Role |
|----------|----------|------|
| `demo` | `demo` | user |
| `rebel_pilot` | `may_the_force` | user |
| `jedi_master` | `use_the_force` | admin |
| `han_solo` | `nerf_herder` | user |
| `leia_organa` | `alderaan_forever` | user |

---

## วิธีทดสอบ

### 1. ทดสอบผ่าน Web UI

เปิด http://localhost:8787 แล้วคลิกปุ่มใน sidebar ได้เลย

---

### 2. ทดสอบผ่าน curl

#### Login และเก็บ token

```bash
TOKEN=$(curl -s http://localhost:8787/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo"}' \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

echo "Token: $TOKEN"
```

#### Browse ข้อมูล

```bash
# รายชื่อตัวละคร
curl http://localhost:8787/api/people

# ค้นหา
curl "http://localhost:8787/api/people?search=luke"

# ดูยานอวกาศ
curl http://localhost:8787/api/starships

# ดูยาน Millennium Falcon
curl http://localhost:8787/api/starships/10
```

#### เพิ่มสินค้าในตะกร้า

```bash
curl http://localhost:8787/api/cart/items \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "item_type": "starship",
    "item_id": 10,
    "quantity": 1
  }'
```

#### ดูตะกร้า

```bash
curl http://localhost:8787/api/cart \
  -H "Authorization: Bearer $TOKEN"
```

#### Checkout (สั่งซื้อ)

```bash
curl http://localhost:8787/api/orders \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "shipping_address": {
      "planet": "Tatooine",
      "sector": "Arkanis",
      "system": "Tatoo"
    },
    "payment_method": "galactic_credits"
  }'
```

#### ดูรายการสั่งซื้อ

```bash
curl http://localhost:8787/api/orders \
  -H "Authorization: Bearer $TOKEN"
```

---

## Demo: Schema Validation

ส่ง request ที่ขาด field หรือ type ผิด จะได้ `422 Unprocessable Entity` พร้อมบอกว่าผิดที่ไหน

```bash
# ขาด required fields
curl http://localhost:8787/api/people \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "Ahsoka Tano"}'
```

```json
{
  "error": "Unprocessable Entity",
  "message": "Missing required fields",
  "details": {
    "missing_fields": ["height", "mass", "hair_color", "skin_color", "eye_color", "birth_year", "gender", "homeworld_id"]
  }
}
```

```bash
# gender ไม่ถูกต้อง
curl http://localhost:8787/api/people \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahsoka Tano", "height": "170", "mass": "54",
    "hair_color": "none", "skin_color": "white", "eye_color": "blue",
    "birth_year": "36BBY", "gender": "INVALID", "homeworld_id": 1
  }'
```

```json
{
  "error": "Unprocessable Entity",
  "message": "Invalid gender value. Must be one of: male, female, hermaphrodite, n/a, unknown",
  "details": {
    "field": "gender",
    "received": "INVALID",
    "allowed": ["male", "female", "hermaphrodite", "n/a", "unknown"]
  }
}
```

```bash
# item_type ไม่ถูกต้องใน cart
curl http://localhost:8787/api/cart/items \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"item_type": "lightsaber", "item_id": 1, "quantity": 1}'
```

```json
{
  "error": "Unprocessable Entity",
  "message": "item_type must be one of: starship, vehicle, artifact",
  "details": {
    "field": "item_type",
    "received": "lightsaber",
    "allowed": ["starship", "vehicle", "artifact"]
  }
}
```

---

## Demo: Sequence Mitigation

API มี flow การใช้งานที่ชัดเจน ซึ่ง Cloudflare สามารถเรียนรู้และบังคับให้ใช้ตามลำดับ:

```
STEP 1  POST /api/auth/login       → รับ token
STEP 2  GET  /api/auth/me          → verify user
STEP 3  GET  /api/starships        → browse สินค้า
STEP 4  POST /api/cart/items       → เพิ่มสินค้า
STEP 5  GET  /api/cart             → ตรวจสอบตะกร้า
STEP 6  POST /api/orders           → สั่งซื้อ
STEP 7  GET  /api/orders           → ดูรายการสั่งซื้อ
```

ทดสอบ **Out-of-sequence** เช่น checkout โดยไม่ผ่าน login หรือไม่มีสินค้าในตะกร้า:

```bash
# Checkout ตะกร้าว่าง
curl http://localhost:8787/api/orders \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "shipping_address": {"planet": "Hoth", "sector": "Ison", "system": "Hoth"},
    "payment_method": "republic_tokens"
  }'
```

```json
{
  "error": "Unprocessable Entity",
  "message": "Cannot checkout with an empty cart. Add items first.",
  "details": { "cart_items": 0 }
}
```

---

## ตั้งค่า Cloudflare API Shield

### Schema Validation

1. ดาวน์โหลด OpenAPI spec:
   ```bash
   curl https://<your-worker>.workers.dev/openapi.json -o openapi.json
   ```
2. เปิด Cloudflare Dashboard → **Security** → **API Shield**
3. คลิก **Schema Validation** → **Add Schema**
4. อัปโหลดไฟล์ `openapi.json`
5. เลือก action: **Log** (ทดสอบ) หรือ **Block** (บังคับใช้)

### Sequence Mitigation

1. ไปที่ Cloudflare Dashboard → **Security** → **API Shield**
2. คลิก **Sequence Analytics**
3. Cloudflare จะ learn sequence จาก traffic อัตโนมัติ
4. เปิด **Sequence Mitigation** เพื่อ block request ที่ผิด sequence

---

## Deploy ขึ้น Cloudflare Workers

```bash
# Login Cloudflare (ครั้งแรก)
npx wrangler login

# Deploy
npm run deploy
```

Worker จะได้ URL ประมาณ `https://cf-demo-api.<account>.workers.dev`

---

## Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: [Hono.js](https://hono.dev)
- **Language**: TypeScript
- **Tools**: Wrangler
