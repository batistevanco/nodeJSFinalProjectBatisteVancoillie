# 🌐 HTTP Module

## 🎯 Creating Web Servers

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Build Your Own Web Server

With just a few lines of Node.js code!

</div>

---

## 📚 HTTP Module

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

The `http` module lets you create web servers and handle HTTP requests.

### Key Point

The `http.Server` class **inherits from `net.Server`**, which **inherits from `EventEmitter`**!

This means creating a server creates an EventEmitter!

</div>

> 📖 [HTTP Module Docs](https://nodejs.org/dist/latest-v18.x/docs/api/http.html)

---

## 🏗️ Basic Server Setup

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Creating a Server

```javascript
const http = require('http');

// Create server (it's an EventEmitter!)
const server = http.createServer();

// Start listening on port 3000
server.listen(3000);
console.log('Listening on port 3000 ...');
```

The server is now running and waiting for connections!

</div>

---

## 🔌 Listening for Connection Events

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Adding a Connection Listener

```javascript
const http = require('http');
const server = http.createServer();

// Listen for 'connection' events
server.on('connection', (socket) => {
    console.log('New connection...');
});

server.listen(3000);
console.log('Listening on port 3000 ...');
```

**Test it:** Open your browser and go to `http://localhost:3000/`

**Output:**

```bash
milan@les2〽 node httpvb.js
Listening on port 3000 ...
New connection...
```

</div>

---

## ✅ Better Approach: Using Callback

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Handle Requests Directly

Instead of listening for 'connection' events, pass a callback to `createServer()`:

```javascript
const http = require('http');

// Callback receives request and response objects
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

server.listen(3000);
console.log('Listening on port 3000 ...');
```

</div>

---

## 🧪 Testing Your Server

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Try These URLs

**Run the server:**

```bash
milan@les2〽 node httpvb2.js
Listening on port 3000 ...
```

**Open in browser:**

| URL | Response |
|-----|----------|
| `http://localhost:3000/` | Hello World |
| `http://localhost:3000/api/courses` | [1,2,3] |

</div>

---

## 📝 Understanding the Code

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Request & Response Objects

```javascript
http.createServer((req, res) => {
    // req = Request object
    // res = Response object
});
```

### Request Object (`req`)

- `req.url` - The URL path requested
- `req.method` - HTTP method (GET, POST, etc.)
- `req.headers` - Request headers

### Response Object (`res`)

- `res.write()` - Write response data
- `res.end()` - End the response
- `res.statusCode` - Set HTTP status code

</div>

---

## 🎨 Building a Simple API

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Example: RESTful Endpoint

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Set response headers
    res.writeHead(200, { 'Content-Type': 'application/json' });
    
    if (req.url === '/') {
        res.write(JSON.stringify({ message: 'Welcome to the API' }));
    }
    else if (req.url === '/api/users') {
        const users = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' }
        ];
        res.write(JSON.stringify(users));
    }
    else {
        res.writeHead(404);
        res.write(JSON.stringify({ error: 'Not Found' }));
    }
    
    res.end();
});

server.listen(3000);
console.log('API server running on port 3000');
```

</div>

---

## 🚀 Why Use Express Instead?

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; border-left: 5px solid #ff9800;">

### The HTTP Module is Low-Level

While the `http` module works, it's quite basic:

**Challenges:**
- ❌ Manual URL parsing
- ❌ No built-in routing
- ❌ Verbose code for complex apps
- ❌ No middleware support

**Solution: Express.js**

In the next chapters, we'll use **Express.js**, which builds on top of the `http` module and makes everything easier!

</div>

---

## 🔑 Key Concepts

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e3f2fd;">
<th style="padding: 15px;">Concept</th>
<th style="padding: 15px;">Explanation</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>http.createServer()</strong></td>
<td style="padding: 15px;">Creates an HTTP server (EventEmitter)</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>server.listen()</strong></td>
<td style="padding: 15px;">Start listening on a port</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>req</strong></td>
<td style="padding: 15px;">Request object (incoming data)</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>res</strong></td>
<td style="padding: 15px;">Response object (outgoing data)</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>res.write()</strong></td>
<td style="padding: 15px;">Write data to response</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>res.end()</strong></td>
<td style="padding: 15px;">Finish and send response</td>
</tr>
</table>

---

## 💡 Best Practices

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px;">

### DO ✅

- Always call `res.end()` to finish the response
- Set appropriate status codes
- Use JSON for API responses
- Handle 404 (not found) cases
- Set proper Content-Type headers

### DON'T ❌

- Don't forget to end the response (browser hangs!)
- Don't use http module for complex apps (use Express)
- Don't hardcode ports (use environment variables)
- Don't expose sensitive errors to clients

</div>

---

## 🎯 Chapter 2 Complete!

<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### What You've Learned

✅ Global objects vs modules  
✅ Creating and exporting modules  
✅ Using built-in modules (path, os, fs)  
✅ Working with events and EventEmitter  
✅ Building basic HTTP servers

**Next:** Learn about npm and package management!

</div>

---

## 📝 Assignment

<div style="background-color: #fce4ec; padding: 25px; border-radius: 10px;">

### GitHub Classroom Lab

Complete the Chapter 2 lab assignment:

🔗 **See Toledo for the GitHub Classroom link**

Practice everything you've learned about modules!

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 2 Home](./README.md)

[← Previous: Events](./05-events.md) | [Next Chapter: NPM →](../03-Node-NPM/README.md)

</div>
