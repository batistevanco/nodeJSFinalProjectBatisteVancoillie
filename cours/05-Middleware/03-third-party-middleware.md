# 🛡️ Third-party Middleware

## 🎯 Using npm Middleware Packages

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Extend Express Functionality

helmet, morgan, and more!

</div>

---

## 📚 Third-party Middleware

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### What is Third-party Middleware?

npm packages that provide middleware functionality:

🔗 **Official list:** [expressjs.com/en/resources/middleware.html](https://expressjs.com/en/resources/middleware.html)

### Popular Examples

- 🛡️ **helmet** - Security headers
- 📊 **morgan** - HTTP request logger
- 🍪 **cookie-parser** - Parse cookies
- 📤 **multer** - Handle file uploads
- 🔐 **cors** - Enable CORS
- 🗜️ **compression** - Gzip compression

</div>

---

## ⚠️ Performance Consideration

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; border-left: 5px solid #ff9800; color: #1a1a1a;">

### Use Only What You Need!

Each middleware adds overhead to the request pipeline:

```
Request → MW1 → MW2 → MW3 → MW4 → MW5 → Route → Response
```

**Impact:**
- More middleware = Slower responses
- Each middleware takes time to execute
- Only install what's necessary

### Best Practice

✅ Install middleware for specific needs  
❌ Don't install "just in case"

</div>

---

## 🛡️ helmet

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Secure Your App

helmet helps secure Express apps by setting various HTTP headers.

### Installation

```bash
npm i helmet
```

### Usage

```javascript
const express = require('express');
const helmet = require('helmet');
const app = express();

// Apply helmet middleware
app.use(helmet());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000);
```

### What helmet Does

Sets security-related HTTP headers:
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Strict-Transport-Security`
- `X-XSS-Protection`
- And more...

</div>

---

## 📊 morgan - HTTP Request Logger

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Log Every Request

morgan logs HTTP requests automatically.

🔗 **Docs:** [github.com/expressjs/morgan](https://github.com/expressjs/morgan)

### Installation

```bash
npm i morgan
```

### Usage

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();

// Use 'tiny' format
app.use(morgan('tiny'));

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.listen(3000);
```

</div>

---

## 🎨 morgan Output Formats

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Available Formats

```javascript
// Minimal output
app.use(morgan('tiny'));

// Standard Apache combined log output
app.use(morgan('combined'));

// Detailed
app.use(morgan('dev'));

// Common format
app.use(morgan('common'));
```

### Example Output (tiny)

```bash
[nodemon] starting `node index.js`
Listening on port 3000...
GET /api/courses 200 79 - 2.059 ms
```

**Format:** `METHOD URL STATUS SIZE - TIME`

</div>

---

## 🔧 Complete Example with Third-party Middleware

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### index.js

```javascript
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();

// Built-in middleware
app.use(express.json());

// Third-party middleware
app.use(helmet());  // Security
app.use(morgan('tiny'));  // Logging

// Routes
app.get('/api/courses', (req, res) => {
    res.send([
        { id: 1, name: 'course1' },
        { id: 2, name: 'course2' }
    ]);
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
```

</div>

---

## 💡 Best Practices

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50; color: #1a1a1a;">

### Third-party Middleware Guidelines

✅ **DO:** Use helmet for production apps  
✅ **DO:** Use logging in development  
✅ **DO:** Read documentation before using  
✅ **DO:** Check package popularity and maintenance  
✅ **DO:** Update packages regularly

❌ **DON'T:** Install middleware you don't need  
❌ **DON'T:** Use unmaintained packages  
❌ **DON'T:** Ignore performance impact  
❌ **DON'T:** Skip security middleware

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 5 Home](./README.md)

[← Previous: Built-in Middleware](./02-builtin-middleware.md) | [Next: Environments & Config →](./04-environments-config.md)

</div>
