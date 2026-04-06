# 🔧 Built-in Node Modules

## 📚 Node.js Core Modules

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Powerful Modules Ready to Use

No installation required!

</div>

---

## 📖 Documentation

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px; border-left: 5px solid #ff9800;">

### Official Docs

- 📘 [Node.js v25.x API](https://nodejs.org/dist/latest-v25.x/docs/api/)
- 📘 [Node.js Latest API](https://nodejs.org/docs/latest/api/)

**Note:** Not everything is a module! Some are objects like `Console`.

</div>

---

## 🗂️ Important Built-in Modules

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e3f2fd;">
<th style="padding: 15px;">Module</th>
<th style="padding: 15px;">Purpose</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>path</strong></td>
<td style="padding: 15px;">Work with file/directory paths</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>fs</strong></td>
<td style="padding: 15px;">File system operations</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>os</strong></td>
<td style="padding: 15px;">Operating system information</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>http</strong></td>
<td style="padding: 15px;">Create web servers</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>events</strong></td>
<td style="padding: 15px;">Event handling</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>stream</strong></td>
<td style="padding: 15px;">Work with streaming data</td>
</tr>
</table>

---

## 🛤️ Path Module

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Working with File Paths

```javascript
const path = require("path"); // No ./ for built-in modules!

const pathObj = path.parse(__filename);
console.log(pathObj);
```

**Output:**

```javascript
{
  root: '/',
  dir: '/Users/milan/Dev/first-app/les2',
  base: 'pathvb.js',
  ext: '.js',
  name: 'pathvb'
}
```

### Common Path Methods

```javascript
path.join("/users", "milan", "file.txt"); // Join paths
path.resolve("file.txt"); // Absolute path
path.basename("/users/milan/file.txt"); // 'file.txt'
path.dirname("/users/milan/file.txt"); // '/users/milan'
path.extname("/users/milan/file.txt"); // '.txt'
```

</div>

> 📖 [Path Module Docs](https://nodejs.org/dist/latest-v25.x/docs/api/path.html#pathparsepath)

---

## 💻 OS Module

<div style="background-color: #f3e5f5; padding: 25px; border-radius: 10px;">

### System Information

⚠️ **Only works in Node.js, not in browsers!**

```javascript
const os = require("os");

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const osType = os.type();
const uptime = os.uptime();

console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);
console.log(`OS Type: ${osType}`);
```

**Output:**

```bash
milan@les2〽 node osvb.js
Total Memory: 8589934592
OS Type: Darwin
milan@les2〽
```

### ES6 Template Strings

**Note the backticks!**

```javascript
// Old way
console.log("OS type is: " + osType);

// ES6 way (template literal)
console.log(`OS type is: ${osType}`);
```

</div>

> 📖 [OS Module Docs](https://nodejs.org/dist/latest-v25.x/docs/api/os.html)

---

## 📁 File System Module

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### ⚠️ Synchronous vs Asynchronous

The File System module has two versions of most methods:

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #ffebee;">
<th style="padding: 15px;">❌ Synchronous (Blocking)</th>
<th style="padding: 15px;">✅ Asynchronous (Non-blocking)</th>
</tr>
<tr>
<td style="padding: 15px;"><code>fs.readdirSync()</code></td>
<td style="padding: 15px;"><code>fs.readdir()</code></td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;">Blocks thread</td>
<td style="padding: 15px;">Non-blocking</td>
</tr>
<tr>
<td style="padding: 15px;">Returns data directly</td>
<td style="padding: 15px;">Uses callback</td>
</tr>
</table>

### Synchronous Example (Don't Use!)

```javascript
const fs = require("fs");
const files = fs.readdirSync("./");
console.log(files);
```

**Output:**

```bash
['app.js', 'fsvb.js', 'logger.js', 'osvb.js', 'pathvb.js']
```

</div>

---

## ✅ File System: Async (Always Prefer This!)

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Asynchronous Example

```javascript
const fs = require("fs");

fs.readdir("./", function (err, files) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Result", files);
  }
});
```

### How It Works

1. **Two parameters:** Path and callback function
2. **Callback has two parameters:** `err` and `result`
3. **Only one contains data:** Either error OR result (not both)

**Output:**

```bash
milan@les2〽 node fsvb.js
Result ['app.js', 'fsvb.js', 'logger.js', 'osvb.js', 'pathvb.js']
milan@les2〽
```

</div>

> 📖 [File System Docs](https://nodejs.org/dist/latest-v25.x/docs/api/fs.html)

---

## 🎯 Best Practices

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px;">

### DO ✅

- **Always use async methods** for file operations
- Check for errors first in callbacks
- Use `path` module for cross-platform paths
- Use template literals (backticks) for strings

### DON'T ❌

- Don't use synchronous methods (blocks the thread)
- Don't ignore error handling
- Don't hardcode file paths
- Don't use `+` for string concatenation when template literals work better

</div>

---

## 🧪 Try It Yourself

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 15px; color: white;">

### Exercise

1. Use `os` module to get system info
2. Use `path` module to parse a file path
3. Use `fs` (async) to read files in current directory
4. Display results using template literals

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 2 Home](./README.md)

[← Previous: Creating Modules](./03-creating-modules.md) | [Next: Events →](./05-events.md)

</div>
