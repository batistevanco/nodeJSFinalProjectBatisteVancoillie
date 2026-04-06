# 📥 Installing Packages

## 🎯 Adding Third-Party Libraries

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Extend Your App with npm Packages

Install and use packages from the npm registry

</div>

---

## 📦 Installing a Package

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #333;">

### Example: Installing Underscore

Underscore is a popular JavaScript utility library.

**Find it on npm:**
🔗 https://www.npmjs.com/package/underscore

**Install it:**

```bash
milan@npm-demo〽 npm i underscore

added 1 package, and audited 2 packages in 2s

found 0 vulnerabilities
milan@npm-demo〽
```

</div>

---

## 📝 What Happened?

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #333;">

### Three Things Changed

**1. package.json Updated**

```json
{
  "dependencies": {
    "underscore": "^1.13.8"
  }
}
```

**2. node_modules Folder Created**

```
npm-demo/
├── node_modules/
│   └── underscore/
├── package.json
└── package-lock.json
```

**3. package-lock.json Created**

Locks exact versions of all dependencies.

</div>

---

## ⚠️ Old Syntax (No Longer Needed)

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px; border-left: 5px solid #ff9800; color: #333;">

### Before npm 5

You had to use `--save`:

```bash
npm install package --save  # ❌ No longer needed
```

### Now (npm 5+)

Automatically saves to package.json:

```bash
npm i package  # ✅ Automatically saves
```

</div>

---

## 💻 Using the Installed Package

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #333;">

### Create index.js

```javascript
const _ = require('underscore');

// Use underscore's contains method
const result = _.contains([1, 2, 3], 2);
console.log(result);
```

**Run it:**

```bash
milan@npm-demo〽 node index.js
true
milan@npm-demo〽
```

</div>

> 📖 **Documentation:** http://underscorejs.org/

---

## 🤖 Example: AI Sentiment Analysis

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #333;">

### Installing the sentiment Package

The `sentiment` package uses AI to analyze text and determine if it's positive, negative, or neutral. No API keys needed!

🔗 https://www.npmjs.com/package/sentiment

**Install it:**

```bash
milan@npm-demo〽 npm i sentiment

added 1 package, and audited 3 packages in 2s

found 0 vulnerabilities
milan@npm-demo〽
```

</div>

---

## 💻 Using the Sentiment Package

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #333;">

### Create sentiment.js

```javascript
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

const result1 = sentiment.analyze('This course is amazing and I love Node.js!');
console.log(result1.score);        // 5 (positive)
console.log(result1.comparative);  // 0.556

const result2 = sentiment.analyze('This is terrible and boring.');
console.log(result2.score);        // -5 (negative)
console.log(result2.comparative);  // -1

const result3 = sentiment.analyze('The sky is blue.');
console.log(result3.score);        // 0 (neutral)
```

**Run it:**

```bash
milan@npm-demo〽 node sentiment.js
5
0.5555555555555556
-5
-1
0
milan@npm-demo〽
```

</div>

> 📖 **Documentation:** https://www.npmjs.com/package/sentiment

---

## 🔍 How require() Works

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #333;">

### Search Order

When you `require('package')`, Node.js searches in this order:

**1. Core Modules**
```javascript
require('fs')        // ✅ Built-in module
require('node:fs')   // ✅ Explicit core module
```

**2. File or Directory**
```javascript
require('./logger')     // ✅ Local file
require('./lib/utils')  // ✅ Local directory
```

**3. node_modules**
```javascript
require('underscore')   // ✅ npm package
require('express')      // ✅ npm package
```

</div>

---

## 🧪 Lab: Install Mongoose

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 15px; color: white;">

### Practice Exercise

1. Create a new project directory
2. Initialize npm
3. Install the `mongoose` package
4. Check the installed version
5. Explore the two package.json files (yours and mongoose's)
6. Look inside the node_modules folder

**Questions:**
- What version was installed?
- How many files are in node_modules?
- What dependencies does mongoose have?

</div>

---

## 📁 node_modules Directory

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #333;">

### What's Inside?

The `node_modules` folder contains:
- Your direct dependencies
- Dependencies of your dependencies
- All their dependencies (recursive)

### Example Structure

```
node_modules/
├── underscore/
│   ├── package.json
│   ├── underscore.js
│   └── ...
├── express/
│   ├── package.json
│   ├── lib/
│   └── ...
└── ... (many more!)
```

</div>

---

## 🎯 Key Points

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; color: #333;">

### Installing Packages

✅ Use `npm i package-name` to install  
✅ Automatically adds to package.json  
✅ Creates node_modules folder  
✅ Use `require('package-name')` in your code  
✅ Core modules don't need installation  
✅ Local files need `./` prefix

</div>

---

<div style="text-align: center; padding: 20px; color: #333;">

[🏠 Course Home](../README.md) | [📘 Chapter 3 Home](./README.md)

[← Previous: package.json](./02-package-json.md) | [Next: Semantic Versioning →](./04-semantic-versioning.md)

</div>
