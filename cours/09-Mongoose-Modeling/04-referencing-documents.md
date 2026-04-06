# 🔗 Referencing Documents

> **Implementing references between collections**

---

## 🚀 Getting Started

### Starter Files

📁 **Available on GitHub:**
- `referencing.js`
- `embedding.js`

---

## 📋 Define Schemas

### Author Schema

```javascript
const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));
```

### Initial Course Schema (Without Reference)

```javascript
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String
}));
```

---

## 🏗️ Create Documents

### Create an Author

```javascript
async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });
  
  const result = await author.save();
  console.log(result);
}

createAuthor('Vives', 'My bio', 'My Website');
```

**Output:**
```javascript
{
  _id: 60772ac8684c78c4435f4153,
  name: 'Vives',
  bio: 'My bio',
  website: 'My Website',
  __v: 0
}
```

---

### ⚠️ The Problem: No Reference!

```javascript
async function createCourse(name, author) {
  const course = new Course({
    name,
    author  // ❌ This won't work yet!
  });
  
  const result = await course.save();
  console.log(result);
}

createCourse('Node Course', '60772ac8684c78c4435f4153');
```

**Output:**
```javascript
{
  _id: 60772af0f3915ac45d4064ce,
  name: 'Node Course',
  __v: 0
}
// ❌ No author reference stored!
```

**Why?** The schema doesn't have an author field defined!

---

## ✅ Fix: Add Reference to Schema

### Updated Course Schema

```javascript
const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,  // 🔑 Reference type
    ref: 'Author'                          // 📌 Target collection
  }
}));
```

### Key Components

| Property | Purpose |
|----------|---------|
| `type` | Define as ObjectId |
| `ref` | Specify target collection name |

---

## ✨ Create Course with Reference

```javascript
createCourse('Node Course', '60772ac8684c78c4435f4153');
```

**Output:**
```javascript
{
  _id: 60772d2675c702c574002c58,
  name: 'Node Course',
  author: 60772ac8684c78c4435f4153,  // ✅ Reference stored!
  __v: 0
}
```

---

## 🔍 List Courses (Without Population)

```javascript
async function listCourses() {
  const courses = await Course
    .find()
    .select('name author');
  
  console.log(courses);
}

listCourses();
```

**Output:**
```javascript
[
  {
    _id: 60772f4ac904a3c6491bbf46,
    name: 'Node Course',
    author: 60772ac8684c78c4435f4153  // ❌ Only ID, no details
  }
]
```

**Problem:** We only get the author ID, not the name and other properties!

---

## 🎯 Solution: Using populate()

### The populate() Function

The `populate()` function tells Mongoose to **replace the reference ID** with the actual document from the referenced collection.

```javascript
async function listCourses() {
  const courses = await Course
    .find()
    .populate('author')  // ✨ Magic happens here!
    .select('name author');
  
  console.log(courses);
}
```

**Output:**
```javascript
[
  {
    _id: 60772f4ac904a3c6491bbf46,
    name: 'Node Course',
    author: {
      _id: 60772ac8684c78c4435f4153,
      name: 'Vives',
      bio: 'My bio',
      website: 'My Website',
      __v: 0
    }
  }
]
```

---

## 🎨 Customize populate()

### Select Specific Properties

```javascript
// Populate only the name
.populate('author', 'name')
```

**Output:**
```javascript
{
  name: 'Node Course',
  author: {
    _id: 60772ac8684c78c4435f4153,
    name: 'Vives'
  }
}
```

---

### Exclude _id

```javascript
// Populate name without _id
.populate('author', 'name -_id')
```

**Output:**
```javascript
{
  name: 'Node Course',
  author: {
    name: 'Vives'  // ✅ No _id
  }
}
```

---

### Multiple Properties

```javascript
// Populate name and bio, exclude _id
.populate('author', 'name bio -_id')
```

**Output:**
```javascript
{
  name: 'Node Course',
  author: {
    name: 'Vives',
    bio: 'My bio'
  }
}
```

---

## 🔗 Chaining populate()

When you have **multiple references**, chain populate calls:

```javascript
const courses = await Course
  .find()
  .populate('author', 'name')
  .populate('category', 'name')
  .populate('tags', 'name')
  .select('name');
```

---

## 📊 Complete Example

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect...', err));

// Schemas
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

// Functions
async function createAuthor(name, bio, website) {
  const author = new Author({ name, bio, website });
  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({ name, author });
  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author');
  console.log(courses);
}

// Usage
createAuthor('Vives', 'My bio', 'My Website');
// Use the generated _id in the next call
createCourse('Node Course', '60772ac8684c78c4435f4153');
listCourses();
```

---

## 🎯 Behind the Scenes

```mermaid
sequenceDiagram
    participant App
    participant Mongoose
    participant DB
    
    App->>Mongoose: Course.find().populate('author')
    Mongoose->>DB: Query Courses collection
    DB-->>Mongoose: Return courses with author IDs
    Mongoose->>DB: Query Authors collection by IDs
    DB-->>Mongoose: Return author documents
    Mongoose->>Mongoose: Replace IDs with documents
    Mongoose-->>App: Return populated courses
    
    style Mongoose fill:#4299e1,stroke:#2c5282,color:#fff
    style DB fill:#48bb78,stroke:#2f855a,color:#fff
```

---

## 💡 Key Takeaways

| Concept | Description |
|---------|-------------|
| 🔑 **ObjectId** | Special type for references |
| 📌 **ref** | Points to target collection |
| 🔍 **populate()** | Replaces ID with document |
| 🎨 **Selective** | Choose which fields to populate |
| 🔗 **Chainable** | Populate multiple references |

---

[← Previous: Hybrid Approach](03-hybrid-approach.md) | [🏠 Home](../README.md) | [Next: Embedding Documents →](05-embedding-documents.md)
