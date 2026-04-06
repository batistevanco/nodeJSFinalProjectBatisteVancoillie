# 🌐 Introduction to REST & Express

## 🎯 What is a RESTful API?

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### REST = Representational State Transfer

A standard architectural style for building web services

</div>

---

## 📖 RESTful Services

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### Key Principles

**REST** is an architectural style for building HTTP services:

- Uses standard HTTP methods (GET, POST, PUT, DELETE)
- Resources are identified by URLs
- Stateless communication
- Client-server architecture
- JSON data format (usually)

### Benefits

✅ Simple and standardized  
✅ Platform independent  
✅ Scalable  
✅ Easy to understand and use

</div>

---

## 🔑 HTTP Methods (CRUD Operations)

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e8f5e9; color: #000;">
<th style="padding: 15px;">HTTP Method</th>
<th style="padding: 15px;">CRUD</th>
<th style="padding: 15px;">Operation</th>
<th style="padding: 15px;">Example</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>GET</strong></td>
<td style="padding: 15px;">Read</td>
<td style="padding: 15px;">Retrieve data</td>
<td style="padding: 15px;">GET /api/courses</td>
</tr>
<tr style="background-color: #f5f5f5; color: #000;">
<td style="padding: 15px;"><strong>POST</strong></td>
<td style="padding: 15px;">Create</td>
<td style="padding: 15px;">Add new resource</td>
<td style="padding: 15px;">POST /api/courses</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>PUT</strong></td>
<td style="padding: 15px;">Update</td>
<td style="padding: 15px;">Update entire resource</td>
<td style="padding: 15px;">PUT /api/courses/1</td>
</tr>
<tr style="background-color: #f5f5f5; color: #000;">
<td style="padding: 15px;"><strong>PATCH</strong></td>
<td style="padding: 15px;">Update</td>
<td style="padding: 15px;">Partial update</td>
<td style="padding: 15px;">PATCH /api/courses/1</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>DELETE</strong></td>
<td style="padding: 15px;">Delete</td>
<td style="padding: 15px;">Remove resource</td>
<td style="padding: 15px;">DELETE /api/courses/1</td>
</tr>
</table>

---

## ⚡ What is Express?

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #000;">

### Fast, Minimalist Web Framework

Express is the most popular web framework for Node.js:

- 🚀 Fast and lightweight
- 🛣️ Powerful routing
- 🔌 Middleware support
- 📦 Large ecosystem
- 🎯 Easy to learn

### Why Express?

- Built on top of Node's HTTP module
- Much simpler than raw Node.js
- Industry standard
- Great documentation
- Active community

</div>

---

## 📦 Installing Express

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### Create a New Project

```bash
# Create project directory
mkdir express-demo
cd express-demo

# Initialize npm
npm init -y

# Install Express
npm i express
```

**package.json will now include:**

```json
{
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

</div>

---

## 🏗️ First Express Application

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #000;">

### Create index.js

```javascript
const express = require('express');
const app = express();

// Define a route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
```

### Run it!

```bash
node index.js
```

**Output:**
```
Listening on port 3000...
```

Open browser: `http://localhost:3000/`

</div>

---

## 🔍 Understanding the Code

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #000;">

### Line by Line

```javascript
const express = require('express');
```
Import Express module

```javascript
const app = express();
```
Create Express application

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});
```
Define GET route for home page

```javascript
app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
```
Start server on port 3000

</div>

---

## 📨 Request & Response Objects

<div style="background: linear-gradient(135deg, #ff9a56 0%, #ff5e62 100%); padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; color: white;">

<div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 10px; backdrop-filter: blur(10px);">

### 📥 Request (req)

**Contains information from the client:**

- 🌐 **req.params** - Route parameters  
  `/api/users/:id` → `req.params.id`

- 🔍 **req.query** - Query strings  
  `/search?q=node` → `req.query.q`

- 📦 **req.body** - Request body (POST data)  
  `{ "name": "John" }`

- 🏷️ **req.headers** - HTTP headers  
  `Content-Type`, `Authorization`

</div>

<div style="background: rgba(255,255,255,0.15); padding: 20px; border-radius: 10px; backdrop-filter: blur(10px);">

### 📤 Response (res)

**Methods to send data back to client:**

- ✉️ **res.send()** - Send any type  
  `res.send('Hello')` or `res.send({ name: 'John' })`

- 📋 **res.json()** - Send JSON explicitly  
  `res.json({ success: true })`

- 🔢 **res.status()** - Set status code  
  `res.status(404).send('Not Found')`

- 🔗 **res.redirect()** - Redirect to URL  
  `res.redirect('/home')`

</div>

</div>

<div style="text-align: center; margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.2); border-radius: 10px; color: white;">

**Every route handler receives these two objects:**  
`app.get('/path', (req, res) => { ... })`

</div>

</div>

---

## 🛣️ Creating API Endpoints

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #000;">

### Example: Courses API

```javascript
const express = require('express');
const app = express();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

// GET all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
```

**Test it:** `http://localhost:3000/api/courses`

**Output:** `[{"id":1,"name":"course1"},{"id":2,"name":"course2"},{"id":3,"name":"course3"}]`

</div>

---

## 🎨 Response Types

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### Different Ways to Respond

```javascript
// Send plain text
res.send('Hello World');

// Send JSON
res.send({ message: 'Hello' });

// Send array
res.send([1, 2, 3]);

// Send HTML
res.send('<h1>Hello World</h1>');

// Send status code
res.status(404).send('Not Found');

// JSON explicitly
res.json({ message: 'Hello' });
```

Express automatically sets the correct `Content-Type` header!

</div>

---

## 🔄 No More If Blocks!

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; border-left: 5px solid #ff9800; color: #000;">

### Before Express (Raw Node.js)

```javascript
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }
    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
```

### With Express

```javascript
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});
```

✅ Much cleaner and easier to read!

</div>

---

## 🎯 Key Takeaways

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50; color: #000;">

### REST & Express Basics

✅ **REST** uses standard HTTP methods for CRUD operations  
✅ **Express** simplifies building web APIs in Node.js  
✅ **Routes** define endpoints (URLs) for your API  
✅ **req** object contains request data  
✅ **res** object is used to send responses  
✅ Express handles **content-type** headers automatically

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 4 Home](./README.md)

[← Previous: Chapter 4 Intro](./README.md) | [Next: GET Requests →](./02-get-requests.md)

</div>
