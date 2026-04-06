# ✏️ Creating Documents

## 🎯 CRUD: Create

<div style="background: linear-gradient(135deg, #00c853 0%, #64dd17 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Saving Data to MongoDB

Insert new documents into your database

</div>

---

## 📖 Creating a Document

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Three Steps

1. **Create instance** from Model
2. **Call .save()** method
3. **Handle the Promise**

```javascript
const course = new Course({
    name: 'Node.js Course',
    author: 'M. Dima',
    tags: ['node', 'backend'],
    isPublished: true
});
```

### The .save() Method

```javascript
const result = await course.save();
```

- Returns a **Promise**
- Asynchronous operation (takes time)
- MongoDB assigns unique **_id**

</div>

---

## ⚡ Async Function Required

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Why Async?

`.save()` returns a Promise, so we need to use `await`:

```javascript
async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'M. Dima',
        tags: ['node', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

createCourse();
```

### Alternative: .then()

```javascript
course.save()
    .then(result => console.log(result))
    .catch(err => console.error(err));
```

But **async/await** is cleaner! ✨

</div>

---

## 📝 Complete Example

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Full Code

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected with MongoDB'))
    .catch(err => console.error('Cannot connect to DB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'M. Dima',
        tags: ['node', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

createCourse();
```

</div>

---

## 🖥️ Running the Code

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Terminal Output

```bash
milan@mongodb-demo〽 nodemon index.js
[nodemon] starting `node index.js`
Connected with MongoDB
{
    tags: [ 'node', 'backend' ],
    _id: 605b9a2dc00228d310ffc256,
    name: 'Node.js Course',
    author: 'M. Dima',
    isPublished: true,
    date: 2021-03-24T19:59:41.061Z,
    __v: 0
}
```

### What Happened?

✅ Connected to MongoDB  
✅ Created course object  
✅ Saved to database  
✅ MongoDB assigned `_id`  
✅ `date` field auto-set (default)  
✅ `__v` (version key) added by Mongoose

</div>

---

## 🆔 The _id Field

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Unique ObjectID

```javascript
_id: 605b9a2dc00228d310ffc256
```

### Properties

- **Automatically generated** by MongoDB
- **Globally unique** identifier
- **12 bytes** in length
- **Contains timestamp** of creation

### Accessing _id

```javascript
const result = await course.save();
console.log(result._id);  // 605b9a2dc00228d310ffc256
```

### You Don't Need to Create IDs!

MongoDB handles this automatically. Just save your document!

</div>

---

## 📅 The date Field

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Auto-Generated Date

```javascript
date: { type: Date, default: Date.now }
```

**We didn't provide a date**, but MongoDB added one:

```javascript
date: 2021-03-24T19:59:41.061Z
```

### How It Works

- Schema has `default: Date.now`
- If no date provided, uses current timestamp
- Automatic timestamp tracking!

### Override Default

```javascript
const course = new Course({
    name: 'Node.js Course',
    date: new Date('2021-01-01')  // Custom date
});
```

</div>

---

## 🔢 The __v Field

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Version Key

```javascript
__v: 0
```

### What is __v?

- **Version key** added by Mongoose
- Used for **optimistic concurrency control**
- Prevents update conflicts
- Increments with each update

### Example

```javascript
// First save
__v: 0

// After update
__v: 1

// After another update
__v: 2
```

You generally don't need to worry about this field!

</div>

---

## 🎨 Creating Multiple Documents

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Adding More Courses

```javascript
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'M. Dima',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

createCourse();
```

**Output:**
```javascript
{
    tags: [ 'angular', 'frontend' ],
    _id: 605b9bed4dfe11d32a7548f1,
    name: 'Angular Course',
    author: 'M. Dima',
    isPublished: true,
    date: 2021-03-24T20:07:09.606Z,
    __v: 0
}
```

✅ New document with different `_id`!

</div>

---

## 🗄️ Viewing in MongoDB Compass

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Visual Inspection

Open **MongoDB Compass** and connect to:

```
mongodb://localhost:27017
```

### Navigate To

1. **Database:** `playground`
2. **Collection:** `courses`
3. **Documents:** See all saved courses!

### Example View

```json
[
    {
        "_id": "605b9a2dc00228d310ffc256",
        "name": "Node.js Course",
        "author": "M. Dima",
        "tags": ["node", "backend"],
        "isPublished": true,
        "date": "2021-03-24T19:59:41.061Z",
        "__v": 0
    },
    {
        "_id": "605b9bed4dfe11d32a7548f1",
        "name": "Angular Course",
        "author": "M. Dima",
        "tags": ["angular", "frontend"],
        "isPublished": true,
        "date": "2021-03-24T20:07:09.606Z",
        "__v": 0
    }
]
```

</div>

---

## ⚠️ Error Handling

<div style="background-color: #ffebee; padding: 25px; border-radius: 10px; border-left: 5px solid #f44336;">

### Handle Save Errors

```javascript
async function createCourse() {
    try {
        const course = new Course({
            name: 'Node.js Course',
            author: 'M. Dima',
            tags: ['node', 'backend'],
            isPublished: true
        });
        
        const result = await course.save();
        console.log(result);
    } catch (err) {
        console.error('Error saving course:', err.message);
    }
}

createCourse();
```

### Common Errors

- **Validation errors** - Invalid data types
- **Connection errors** - Database not available
- **Duplicate key errors** - Unique constraint violation

Always wrap `.save()` in try/catch!

</div>

---

## 💡 Best Practices

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Creating Documents Guidelines

✅ **DO:**
- Use async/await for cleaner code
- Handle errors with try/catch
- Let MongoDB generate _id automatically
- Use default values in schema
- Validate data before saving

❌ **DON'T:**
- Manually create _id fields
- Forget error handling
- Save invalid data
- Block the event loop (use async!)
- Hardcode dates (use Date.now)

</div>

---

## 🎯 Key Takeaways

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">

### Creating Documents Summary

- Create instance: `const doc = new Model({ data })`
- Save to DB: `await doc.save()`
- `.save()` returns a Promise
- Use async/await for cleaner code
- MongoDB auto-generates `_id` (ObjectID)
- Default values auto-applied from schema
- `__v` tracks document version
- Always handle errors with try/catch
- View documents in MongoDB Compass

**Next:** Learn how to read/query documents!

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 7 Home](./README.md)

[← Previous: Schemas & Models](./02-schemas-models.md) | [Next: Reading Documents →](./04-reading-documents.md)

</div>
