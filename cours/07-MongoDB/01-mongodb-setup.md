# 🔌 MongoDB & Mongoose Setup

## 🎯 Getting Started with MongoDB

<div style="background: linear-gradient(135deg, #00c853 0%, #64dd17 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Installation & Connection

Set up your NoSQL database

</div>

---

## 📖 What is MongoDB?

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### NoSQL Document Database

**MongoDB** is a cross-platform, document-oriented database that stores data in flexible, JSON-like documents.

### Why MongoDB?

✅ **Flexible Schema** - No rigid structure required  
✅ **Scalable** - Handles large amounts of data  
✅ **Fast** - Optimized for read/write operations  
✅ **Rich Queries** - Powerful query language  
✅ **Easy to Use** - Works naturally with JavaScript objects

### NoSQL vs SQL

**Traditional SQL:**
- Fixed schema
- Tables with rows and columns
- Relations between tables
- Structured data

**MongoDB (NoSQL):**
- Flexible schema
- Collections with documents
- Embedded documents
- Semi-structured data

</div>

---

## 🐚 What is Mongoose?

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Object Document Mapper (ODM)

**Mongoose** is an ODM library for MongoDB and Node.js. It provides:

✅ **Schema validation** - Define document structure  
✅ **Type casting** - Automatic data type conversion  
✅ **Query building** - Chainable query methods  
✅ **Middleware** - Pre/post hooks  
✅ **Business logic** - Model methods

### Why Use Mongoose?

MongoDB is schemaless, but in practice you often want:
- Consistent document structure
- Data validation
- Type checking
- Relationships between collections

Mongoose provides all of this!

</div>

---

## 📦 Installation

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Install Mongoose

```bash
npm install mongoose
```

### Project Setup

```bash
mkdir mongodb-demo
cd mongodb-demo
npm init -y
npm install mongoose
```

### Install MongoDB

**Option 1: Local Installation**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Install MongoDB Community Edition
- Start MongoDB service

**Option 2: MongoDB Atlas (Cloud)**
- Free cloud-hosted MongoDB
- No local installation needed
- Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

**Option 3: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

</div>

---

## 🔌 Connecting to MongoDB

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Basic Connection

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost');
```

### Connection String

```
mongodb://[host]:[port]/[database]
```

**Example:**
```javascript
mongoose.connect('mongodb://localhost:27017/playground');
```

- `localhost` - MongoDB server location
- `27017` - Default MongoDB port
- `playground` - Database name (created if doesn't exist)

### Production Connection String

⚠️ **In production:** Store connection string in config files or environment variables, **never hardcode**!

```javascript
mongoose.connect(process.env.MONGODB_URI);
```

</div>

---

## 🎁 Promises with connect()

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### connect() Returns a Promise

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected with MongoDB'))
    .catch(err => console.error('Cannot connect to DB...', err));
```

### With Async/Await

```javascript
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost/playground');
        console.log('Connected with MongoDB');
    } catch (err) {
        console.error('Cannot connect to DB...', err);
    }
}

connectDB();
```

</div>

---

## 📝 Complete Connection Example

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### index.js

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected with MongoDB'))
    .catch(err => console.error('Cannot connect to DB...', err));
```

### Run the Application

```bash
nodemon index.js
```

**Terminal Output:**
```
[nodemon] starting `node index.js`
Connected with MongoDB
```

✅ Successfully connected to MongoDB!

</div>

---

## 🗄️ MongoDB Terminology

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Key Concepts

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #c8e6c9;">
<th style="padding: 15px;">Term</th>
<th style="padding: 15px;">Description</th>
<th style="padding: 15px;">SQL Equivalent</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>Database</strong></td>
<td style="padding: 15px;">Container for collections</td>
<td style="padding: 15px;">Database</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Collection</strong></td>
<td style="padding: 15px;">Group of documents</td>
<td style="padding: 15px;">Table</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Document</strong></td>
<td style="padding: 15px;">JSON-like object</td>
<td style="padding: 15px;">Row/Record</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Field</strong></td>
<td style="padding: 15px;">Key-value pair</td>
<td style="padding: 15px;">Column</td>
</tr>
</table>

### Example Document

```json
{
    "_id": "605b9a2dc00228d310ffc256",
    "name": "Node.js Course",
    "author": "M. Dima",
    "tags": ["node", "backend"],
    "isPublished": true,
    "date": "2021-03-24T19:59:41.061Z"
}
```

</div>

---

## 🛠️ MongoDB Compass

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Visual MongoDB Client

**MongoDB Compass** is the official GUI for MongoDB.

### Features

✅ View databases and collections  
✅ Query and analyze data  
✅ Create and modify documents  
✅ Visual query builder  
✅ Performance monitoring

### Download

[mongodb.com/products/compass](https://www.mongodb.com/products/compass)

### Connect

```
mongodb://localhost:27017
```

You can visually inspect your `playground` database and `courses` collection!

</div>

---

## 🔑 Connection String Options

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Modern Connection String

```javascript
mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
```

### MongoDB Atlas (Cloud)

```javascript
const uri = 'mongodb+srv://username:password@cluster.mongodb.net/playground?retryWrites=true&w=majority';

mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Connection error:', err));
```

### Environment Variables

```javascript
// .env file
MONGODB_URI=mongodb://localhost/playground

// index.js
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
```

</div>

---

## 💡 Best Practices

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Connection Guidelines

✅ **DO:**
- Use environment variables for connection strings
- Handle connection errors with .catch()
- Close connections when app shuts down
- Use connection pooling (automatic with Mongoose)
- Test connection before starting server

❌ **DON'T:**
- Hardcode connection strings in production
- Ignore connection errors
- Create multiple connections unnecessarily
- Commit credentials to version control

</div>

---

## 🎯 Key Takeaways

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">

### MongoDB Setup Summary

- **MongoDB** = NoSQL document database
- **Mongoose** = ODM for MongoDB and Node.js
- Install with `npm install mongoose`
- Connect with `mongoose.connect()`
- Connection returns a Promise
- Database created automatically if doesn't exist
- Use MongoDB Compass for visual inspection
- Store credentials securely in production

**Next:** Learn about Schemas and Models!

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 7 Home](./README.md)

[← Previous: Chapter 7 Intro](./README.md) | [Next: Schemas & Models →](./02-schemas-models.md)

</div>
