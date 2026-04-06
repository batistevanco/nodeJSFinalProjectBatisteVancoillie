# 👑 Role-Based Authorization

## Implementing Admin Privileges

Let's add role-based access control to restrict certain operations to administrators.

---

### 🎯 Use Case

**Question:** What if deleting data should only be allowed by admins?

**Solution:** Add role-based authorization! 

---

### 📝 Adding isAdmin Property

#### Step 1: Update User Model

In `models/user.js`, add the `isAdmin` property:

```javascript
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false  // Default users are NOT admins
  }
});
```

---

### 🔧 Manual Setup in MongoDB Compass

Since we don't have a UI for this yet, we'll add the property manually:

1. Open **MongoDB Compass**
2. Navigate to your database → users collection
3. Find a user document
4. Click the **pencil icon** (edit)
5. Click the **+** icon next to password field
6. Select **"Add field after password"**
7. Enter field name: `isAdmin`
8. Enter value: `true`
9. Change type from **String** to **Boolean**
10. Click **UPDATE**

```json
{
  "_id": "609429731a37803084ef0adf",
  "name": "Admin User",
  "email": "admin@vives.be",
  "password": "$2b$10$...",
  "isAdmin": true  // ✅ Added manually
}
```

---

### 🔑 Include in JWT Token

Update the token generation to include `isAdmin`:

**Before:**
```javascript
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token;
}
```

**After:**
```javascript
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { 
      _id: this._id, 
      isAdmin: this.isAdmin  // ✅ Include role in token
    }, 
    config.get('jwtPrivateKey')
  );
  return token;
}
```

---

### 🎨 Authorization Flow

```mermaid
graph TB
    A[User Login] --> B{isAdmin: true?}
    B -->|Yes| C[Generate Admin Token]
    B -->|No| D[Generate Regular Token]
    C --> E[Token Payload:<br/>{_id, isAdmin: true}]
    D --> F[Token Payload:<br/>{_id, isAdmin: false}]
    E --> G[Access Admin Routes ✓]
    F --> H[Access Regular Routes ✓]
    F --> I[Access Admin Routes ✗]
    style G fill:#68d391,stroke:#38a169,color:#000
    style I fill:#fc8181,stroke:#e53e3e,color:#000
    style E fill:#fbd38d,stroke:#d69e2e,color:#000
```

---

### 🔍 Token Payload Example

**Regular User Token Payload:**
```json
{
  "_id": "609429731a37803084ef0adf",
  "isAdmin": false,
  "iat": 1652025001
}
```

**Admin User Token Payload:**
```json
{
  "_id": "609429731a37803084ef0abc",
  "isAdmin": true,
  "iat": 1652025001
}
```

---

### ✅ Why Include Role in Token?

**Benefits:**
- ⚡ **No database lookup** needed for authorization
- 🚀 **Faster authorization checks**
- 📦 **Self-contained** - all info in token
- 🔒 **Secure** - token is signed and verified

**Trade-off:**
- ⚠️ Role changes require **new token** (re-login)

---

### 🎯 Next Steps

Now that we have:
- ✅ User model with `isAdmin` property
- ✅ JWT tokens containing role information

We can create **admin middleware** to protect admin-only routes!

---

### 💡 Best Practices

- 🔐 **Default to false**: Users are not admins by default
- 🎫 **Include in token**: Avoid extra database queries
- 🔄 **Refresh on change**: Require re-login when roles change
- 📝 **Audit logging**: Log admin actions for security
- 🚫 **Principle of least privilege**: Only grant admin when necessary

---

[← Previous: User Logout](05-user-logout.md) | [🏠 Home](../README.md) | [Next: Admin Middleware →](07-admin-middleware.md)
