# 🔒 Protecting Routes

## Applying Auth Middleware to Endpoints

Now let's protect specific routes that require authentication.

---

### 📝 Example: Protecting Genre Creation

In `routes/genres.js`:

```javascript
const auth = require('../middleware/auth');

// Protect POST route - only authenticated users can create genres
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  res.send(genre);
});
```

---

### 🧪 Testing in Postman

#### ❌ Test 1: No Token

**Request:**
```http
POST http://localhost:3000/api/genres/
Content-Type: application/json

{
  "name": "Action"
}
```

**Response:** `401 Unauthorized`
```
Access denied. No token provided.
```

---

#### ❌ Test 2: Invalid Token

**Request:**
```http
POST http://localhost:3000/api/genres/
Content-Type: application/json
x-auth-token: invalid_token_here

{
  "name": "Action"
}
```

**Response:** `400 Bad Request`
```
Invalid token.
```

---

#### ✅ Test 3: Valid Token

**Request:**
```http
POST http://localhost:3000/api/genres/
Content-Type: application/json
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "name": "Action"
}
```

**Response:** `200 OK`
```json
{
  "_id": "609429731a37803084ef0adf",
  "name": "Action",
  "__v": 0
}
```

---

### 🧾 Testing with REST Client

Create a file `requests.http`:

```http
### POST Request with JWT in Headers
POST {{base_URL}}/api/genres
Content-Type: application/json
x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mjc3ZTZhOWQwZGQ2YTdmMGQ4ZDY5ZmYiLCJpYXQiOjE2NTIwMjUwMDF9.ZxcMpnIvR7D_787OHGiGT16loGpFS-eE-TGoKIPnlXU

{
    "name": "genre2"
}
```

---

### 🎨 Middleware Flow

```mermaid
graph LR
    A[POST /api/genres] --> B[auth middleware]
    B --> C{Valid Token?}
    C -->|No| D[❌ 401/400]
    C -->|Yes| E[Route Handler]
    E --> F[Validate Data]
    F --> G[Save to DB]
    G --> H[✅ 200 OK]
    style H fill:#68d391,stroke:#38a169,color:#000
    style D fill:#fc8181,stroke:#e53e3e,color:#000
    style B fill:#90cdf4,stroke:#3182ce,color:#000
```

---

### 💡 Best Practices

- 🔐 Always use HTTPS in production
- ⏰ Set reasonable token expiration times
- 🔄 Refresh tokens for long-lived sessions
- 📝 Log authentication attempts
- 🚫 Never expose sensitive data in errors

---

[← Previous: Auth Middleware](02-auth-middleware.md) | [🏠 Home](../README.md) | [Next: Getting Current User →](04-current-user.md)
