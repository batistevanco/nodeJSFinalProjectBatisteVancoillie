# 📋 Schemas & Models

## 🎯 Defining Document Structure

<div style="background: linear-gradient(135deg, #00c853 0%, #64dd17 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Creating Data Templates

Structure your MongoDB documents with Mongoose

</div>

---

## 📖 What is a Schema?

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Definition

A **Schema** defines the structure and shape of documents within a MongoDB collection.

### Key Points

- Schemas are **specific to Mongoose** (not native MongoDB)
- Define document fields and their types
- Provide validation rules
- Set default values
- Create indexes

### Why Use Schemas?

MongoDB is schemaless, but Mongoose adds structure:

✅ **Consistency** - All documents follow same structure  
✅ **Validation** - Ensure data types are correct  
✅ **Defaults** - Automatic default values  
✅ **Documentation** - Schema serves as documentation

</div>

---

## 🔧 Schema Types

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Available Types

Mongoose supports these schema types:

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #c8e6c9;">
<th style="padding: 15px;">Type</th>
<th style="padding: 15px;">Description</th>
<th style="padding: 15px;">Example</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>String</strong></td>
<td style="padding: 15px;">Text data</td>
<td style="padding: 15px;">"Node.js Course"</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Number</strong></td>
<td style="padding: 15px;">Numeric data</td>
<td style="padding: 15px;">42, 3.14</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Date</strong></td>
<td style="padding: 15px;">Date and time</td>
<td style="padding: 15px;">Date.now()</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Buffer</strong></td>
<td style="padding: 15px;">Binary data</td>
<td style="padding: 15px;">Files, images</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Boolean</strong></td>
<td style="padding: 15px;">True/False</td>
<td style="padding: 15px;">true, false</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>ObjectID</strong></td>
<td style="padding: 15px;">Unique identifier</td>
<td style="padding: 15px;">_id field</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Array</strong></td>
<td style="padding: 15px;">List of values</td>
<td style="padding: 15px;">["node", "js"]</td>
</tr>
</table>

</div>

---

## 🏗️ Creating a Schema

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Basic Schema Definition

```javascript
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});
```

### Field Types

**Simple syntax:**
```javascript
name: String
```

**Extended syntax (with options):**
```javascript
date: { type: Date, default: Date.now }
```

**Array syntax:**
```javascript
tags: [String]  // Array of strings
```

</div>

---

## 🎨 What is a Model?

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Definition

A **Model** is a class compiled from a Schema. It provides:

- Interface to the database
- Methods to create, read, update, delete documents
- Document validation
- Query building

### Creating a Model

```javascript
const Course = mongoose.model('Course', courseSchema);
```

**Two arguments:**
1. `'Course'` - Singular name of the collection
   - MongoDB will pluralize it to `courses`
2. `courseSchema` - The schema definition

### Model = Constructor Function

```javascript
const course = new Course({ /* data */ });
```

The model gives us a **Class** to create document instances!

</div>

---

## 🔄 The Three-Step Process

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### 1️⃣ Create Schema (Template)

```javascript
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    isPublished: Boolean
});
```

### 2️⃣ Compile to Model (Class)

```javascript
const Course = mongoose.model('Course', courseSchema);
```

### 3️⃣ Create Document (Object Instance)

```javascript
const course = new Course({
    name: 'Node.js Course',
    author: 'M. Dima',
    tags: ['node', 'backend'],
    isPublished: true
});
```

### 4️⃣ Document → MongoDB

The object is automatically mapped to a MongoDB document!

</div>

---

## 📝 Complete Example

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Full Schema and Model Setup

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected with MongoDB'))
    .catch(err => console.error('Cannot connect to DB...', err));

// 1. Create Schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

// 2. Create Model
const Course = mongoose.model('Course', courseSchema);

// 3. Create Document Instance
const course = new Course({
    name: 'Node.js Course',
    author: 'M. Dima',
    tags: ['node', 'backend'],
    isPublished: true
});
```

</div>

---

## 🔍 Schema with Default Values

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Setting Defaults

```javascript
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { 
        type: Date, 
        default: Date.now  // Auto-set current date
    },
    isPublished: {
        type: Boolean,
        default: false  // Default to false
    },
    price: {
        type: Number,
        default: 0
    }
});
```

### Benefits

- Fields get default values if not provided
- `date` automatically set to current time
- `isPublished` defaults to `false`
- Less code when creating documents

</div>

---

## 🎯 Arrays in Schemas

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Array Fields

```javascript
tags: [String]  // Array of strings
```

### Why Arrays?

NoSQL databases like MongoDB can store arrays natively!

**Example:**
```javascript
const course = new Course({
    name: 'Node.js Course',
    tags: ['node', 'backend', 'javascript']  // Multiple values!
});
```

**In SQL:** Would need a separate table with foreign keys

**In MongoDB:** Just an array! 🎉

### Flexible Structure

```javascript
// Valid documents:
{ tags: [] }              // Empty array
{ tags: ['node'] }        // One tag
{ tags: ['node', 'js'] }  // Multiple tags
```

</div>

---

## 🆔 ObjectID

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Unique Document Identifier

Every MongoDB document automatically gets an `_id` field:

```json
{
    "_id": "605b9a2dc00228d310ffc256",
    "name": "Node.js Course",
    "author": "M. Dima"
}
```

### ObjectID Properties

- **Unique** - Globally unique identifier
- **12 bytes** - Compact representation
- **Auto-generated** - MongoDB creates it
- **Contains timestamp** - When document was created

### Structure

```
605b9a2d c00228d310 ffc2 56
└──┬──┘ └────┬────┘ └─┬─┘ └┬┘
Timestamp   Machine   Process Counter
```

You don't need to create IDs - MongoDB does it automatically!

</div>

---

## 🔗 Collection Naming

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Automatic Pluralization

```javascript
const Course = mongoose.model('Course', courseSchema);
//                             ^^^^^^^^
//                             Singular
```

MongoDB creates collection: **`courses`** (plural, lowercase)

### Examples

| Model Name | Collection Name |
|------------|----------------|
| `Course` | `courses` |
| `User` | `users` |
| `Product` | `products` |
| `Category` | `categories` |

### Override Collection Name

```javascript
const courseSchema = new mongoose.Schema({
    // fields...
}, { collection: 'my_courses' });
```

</div>

---

## 💡 Best Practices

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Schema Guidelines

✅ **DO:**
- Define all expected fields in schema
- Use appropriate data types
- Set default values where appropriate
- Keep schemas simple and focused
- Document complex schemas with comments

❌ **DON'T:**
- Mix different data types in one field
- Make everything optional (add required fields)
- Over-nest schemas (keep it flat when possible)
- Forget to define commonly used fields

</div>

---

## 🎯 Key Takeaways

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px;">

### Schemas & Models Summary

- **Schema** = Template defining document structure
- **Model** = Class compiled from schema
- **Document** = Instance of a model
- Schemas support: String, Number, Date, Boolean, Array, ObjectID
- Set default values with `{ type: Type, default: value }`
- MongoDB auto-creates `_id` field (ObjectID)
- Collection names are auto-pluralized
- Process: Schema → Model → Document

**Next:** Learn how to create documents!

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 7 Home](./README.md)

[← Previous: MongoDB Setup](./01-mongodb-setup.md) | [Next: Creating Documents →](./03-creating-documents.md)

</div>
