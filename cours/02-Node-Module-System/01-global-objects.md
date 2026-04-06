# 🌍 Global Objects in Node.js

## 🎯 What are Global Objects?

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

**Global objects** are available everywhere in your application - in all files without needing to import them.

### Example: `console`

```javascript
console.log('Hello World');
```

The `console` object is **global** - you can use it anywhere!

</div>

---

## 🔧 VS Code IntelliSense

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

💡 **Tip:** VS Code will automatically show you available global objects and their methods as you type!

Start typing `console.` and watch IntelliSense suggest methods like:
- `console.log()`
- `console.error()`
- `console.warn()`
- `console.table()`

</div>

---

## ⏰ Common Global Functions

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px;">

### Timer Functions

These work in **both Browser and Node.js**:

```javascript
// Call function after delay
setTimeout(() => {
    console.log('Executed after 2 seconds');
}, 2000);

// Stop a timeout
const timer = setTimeout(() => {}, 2000);
clearTimeout(timer);

// Repeatedly call function
const interval = setInterval(() => {
    console.log('Executed every second');
}, 1000);

// Stop the interval
clearInterval(interval);
```

</div>

> 📖 **Full list of globals:** [nodejs.org/api/globals.html](https://nodejs.org/api/globals.html)

---

## 🌐 Browser: The `window` Object

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### In the Browser

Everything global is attached to the `window` object:

```javascript
// These are equivalent in the browser:
console.log('Hello');
window.console.log('Hello');

setTimeout(() => {}, 1000);
window.setTimeout(() => {}, 1000);
```

### Variables in Browser

```javascript
var message = 'test';
console.log(window.message); // 'test'
```

**Variables declared with `var` are added to the `window` object!**

</div>

---

## 🟢 Node.js: The `global` Object

<div style="background-color: #f3e5f5; padding: 25px; border-radius: 10px;">

### No `window` in Node.js!

Node.js has a `global` object instead:

```javascript
// These are equivalent in Node.js:
console.log('Hello');
global.console.log('Hello');

setTimeout(() => {}, 1000);
global.setTimeout(() => {}, 1000);
```

</div>

---

## ⚠️ Important Difference: Variable Scope

<div style="background-color: #ffebee; padding: 25px; border-radius: 10px; border-left: 5px solid #f44336;">

### In Node.js, variables are NOT added to `global`!

**Create a file `test.js`:**

```javascript
var message = 'test';
console.log(global.message);
```

**Run it:**

```bash
milan@first-app〽 node test.js
undefined
milan@first-app〽
```

### Why `undefined`?

In Node.js, **variables are scoped to their file** (module), not added to the global object!

</div>

---

## 🔒 Scope in Node.js

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### File-Level Scope

```javascript
// app.js
var message = 'Hello';
console.log(message); // ✅ Works
```

```javascript
// otherFile.js
console.log(message); // ❌ ReferenceError: message is not defined
```

**Variables are limited to the file where they are declared!**

</div>

---

## 🎨 JavaScript Global Scope (Browser)

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Problem with Browser Global Scope

In traditional JavaScript (browser), functions and variables are added to the global scope:

```javascript
// file1.js
function sayHello() {
    console.log('Hello from file1');
}

// file2.js
function sayHello() {  // ⚠️ Overwrites the first one!
    console.log('Hello from file2');
}
```

### The Problem

- Different files with **identical declarations** will override each other
- Hard to maintain large applications
- Name conflicts are common

</div>

---

## 🧩 The Solution: Modularity

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white;">

### Why We Need Modules

**Small building blocks = Modules**

Each file becomes a module with its own scope:
- ✅ Variables are private by default
- ✅ No naming conflicts
- ✅ Explicit imports/exports
- ✅ Better code organization

</div>

---

## 📦 What is a Module?

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### In Node.js

- Each file is a **module**
- Variables declared in a file have **scope of that file only**
- Similar to **private** in Object-Oriented Programming
- Must be **explicitly exported** to be used elsewhere
- Every Node app has at least **one main module**

</div>

---

## 🔑 Key Takeaways

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e3f2fd;">
<th style="padding: 15px;">Concept</th>
<th style="padding: 15px;">Browser</th>
<th style="padding: 15px;">Node.js</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>Global Object</strong></td>
<td style="padding: 15px;"><code>window</code></td>
<td style="padding: 15px;"><code>global</code></td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Variables</strong></td>
<td style="padding: 15px;">Added to <code>window</code></td>
<td style="padding: 15px;">NOT added to <code>global</code></td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Scope</strong></td>
<td style="padding: 15px;">Global by default</td>
<td style="padding: 15px;">File (module) scoped</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Functions</strong></td>
<td style="padding: 15px;">Global if not in module</td>
<td style="padding: 15px;">Private to file</td>
</tr>
</table>

---

## 💡 Best Practice

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Module-Based Architecture

✅ **DO**: Use modules to organize your code  
✅ **DO**: Keep variables private unless needed elsewhere  
✅ **DO**: Explicitly export what's needed  
❌ **DON'T**: Rely on global scope  
❌ **DON'T**: Add everything to the global object

</div>

---

## 🔜 What's Next?

Now that you understand global objects and scope, let's dive deeper into **how the module system works**!

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 2 Home](./README.md)

[← Previous: Chapter 2 Intro](./README.md) | [Next: Module System Basics →](./02-module-system.md)

</div>
