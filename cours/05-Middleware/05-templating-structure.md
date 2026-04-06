# 🎨 Templating & Project Structure

## 🎯 Organizing Express Applications

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Clean Architecture

Pug templating and modular structure

</div>

---

## 🎨 Templating Engines

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Why Templating?

Currently, our endpoints only return JSON. Sometimes we need to return **dynamic HTML**.

### Popular Templating Engines

- **Pug** (formerly Jade) - Clean, whitespace-sensitive
- **EJS** - Embedded JavaScript
- **Handlebars** - Mustache-like syntax
- **Nunjucks** - Jinja2-inspired

Each has different syntax!

</div>

---

## 🐶 Pug Template Engine

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Installation

```bash
npm i pug
```

### Setup in index.js

```javascript
const express = require('express');
const app = express();

// Set view engine
app.set('view engine', 'pug');

// Optional: Set views directory (default is 'views')
app.set('views', './views');
```

**Note:** Express loads Pug internally - no `require()` needed!

</div>

---

## 📁 Directory Structure for Views

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Create views Folder

```
project/
├── views/
│   └── index.pug
├── index.js
└── package.json
```

By default, Express looks for templates in the `views/` folder.

### Custom Views Path

```javascript
app.set('views', './my-templates');
```

</div>

---

## 📝 Pug Syntax

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### views/index.pug

```pug
html
  head
    title= title
  body
    h1= message
```

**Key Points:**
- Whitespace-sensitive (indentation matters!)
- No closing tags
- Variables with `=`

### Rendering the Template

```javascript
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'My Express App',
        message: 'Hello'
    });
});
```

</div>

---

## �� Pug Output

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Browser Output

Visit `http://localhost:3000/`

**Generated HTML:**
```html
<html>
  <head>
    <title>My Express App</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

**Browser shows:**
```
Hello
```

</div>

---

## 📂 Project Structure

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Current Problem

As apps grow, `index.js` gets huge!

**Issues:**
- All routes in one file
- Hard to maintain
- Difficult to test
- No separation of concerns

### Solution: Modular Structure

Organize code into logical folders:
- **routes/** - Route handlers
- **middleware/** - Custom middleware
- **models/** - Data models
- **config/** - Configuration
- **public/** - Static files
- **views/** - Templates

</div>

---

## 🛣️ Separating Routes

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Create routes/courses.js

```javascript
const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

// Notice: '/' not '/api/courses'
router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    // ... create course logic
});

router.get('/:id', (req, res) => {
    // ... get course by id logic
});

module.exports = router;
```

</div>

---

## 🔗 Connecting Routes in index.js

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Import and Mount Routes

```javascript
const express = require('express');
const courses = require('./routes/courses');
const home = require('./routes/home');

const app = express();

app.use(express.json());

// Mount routers
app.use('/api/courses', courses);
app.use('/', home);

app.listen(3000);
```

### How It Works

- All `/api/courses/*` routes → courses router
- Root `/` routes → home router
- Router paths are relative to mount point

</div>

---

## 📄 routes/home.js

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Home Route

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { 
        title: 'My Express App',
        message: 'Hello'
    });
});

module.exports = router;
```

Clean separation of concerns!

</div>

---

## 📁 Complete Project Structure

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Organized Express App

```
project/
├── config/
│   ├── default.json
│   ├── development.json
│   └── production.json
├── middleware/
│   └── logger.js
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── routes/
│   ├── courses.js
│   └── home.js
├── views/
│   └── index.pug
├── index.js
├── package.json
└── .gitignore
```

</div>

---

## 🔧 Moving Middleware

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### middleware/logger.js

```javascript
function log(req, res, next) {
    console.log('Logging...');
    next();
}

module.exports = log;
```

### Import in index.js

```javascript
const logger = require('./middleware/logger');

app.use(logger);
```

</div>

---

## 💡 Best Practices

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50; color: #1a1a1a;">

### Project Structure Guidelines

✅ **DO:** Separate routes into modules  
✅ **DO:** Group related routes together  
✅ **DO:** Use descriptive folder names  
✅ **DO:** Keep index.js clean and minimal  
✅ **DO:** Follow consistent naming conventions

❌ **DON'T:** Put everything in index.js  
❌ **DON'T:** Mix concerns in one file  
❌ **DON'T:** Create too deep folder structures  
❌ **DON'T:** Forget to export routers

</div>

---

## 🎯 Chapter 5 Complete!

<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### What You've Learned

✅ Middleware concepts and pipeline  
✅ Built-in middleware (json, urlencoded, static)  
✅ Third-party middleware (helmet, morgan)  
✅ Environment management  
✅ Configuration with config package  
✅ Pug templating engine  
✅ Modular project structure

**Next:** Learn about Asynchronous JavaScript!

</div>

---

## 📝 Assignment

<div style="background-color: #fce4ec; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### GitHub Classroom Lab

Complete the Chapter 5 lab assignment:

🔗 **See Toledo for the GitHub Classroom link (Chapter 5)**

Practice organizing an Express application!

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 5 Home](./README.md)

[← Previous: Environments & Config](./04-environments-config.md) | [Next Chapter: Async JS →](../06-Async-JS/README.md)

</div>
