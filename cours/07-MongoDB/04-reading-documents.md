# 📖 Reading Documents

## 🎯 CRUD: Read & Query

<div style="background: linear-gradient(135deg, #00c853 0%, #64dd17 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Querying MongoDB

Find and filter your data

</div>

---

## 📖 Basic find() Method

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Get All Documents

```javascript
async function getCourses() {
    const courses = await Course.find();
    console.log(courses);
}

getCourses();
```

**Output:**
```javascript
[
    {
        tags: [ 'node', 'backend' ],
        _id: 605b9a2dc00228d310ffc256,
        name: 'Node.js Course',
        author: 'M. Dima',
        isPublished: true,
        date: 2021-03-24T19:59:41.061Z
    },
    {
        tags: [ 'angular', 'frontend' ],
        _id: 605b9bed4dfe11d32a7548f1,
        name: 'Angular Course',
        author: 'M. Dima',
        isPublished: true,
        date: 2021-03-24T20:07:09.606Z
    }
]
```

</div>

---

## 🔍 Filtering Documents

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Filter by Field

```javascript
async function getCourses() {
    const courses = await Course
        .find({ author: 'M. Dima' });
    console.log(courses);
}
```

### Multiple Conditions (AND)

```javascript
const courses = await Course
    .find({ author: 'M. Dima', isPublished: true });
```

Only returns courses where:
- `author` is "M. Dima" **AND**
- `isPublished` is `true`

</div>

---

## 🎯 Query Methods

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Chainable Query Methods

```javascript
const courses = await Course
    .find({ author: 'M. Dima', isPublished: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
```

### Method Breakdown

| Method | Purpose | Example |
|--------|---------|---------|
| `.find()` | Filter documents | `.find({ author: 'M. Dima' })` |
| `.limit()` | Limit results | `.limit(10)` |
| `.sort()` | Sort results | `.sort({ name: 1 })` |
| `.select()` | Select fields | `.select({ name: 1, tags: 1 })` |

### Sorting

- `1` = Ascending (A-Z, 0-9)
- `-1` = Descending (Z-A, 9-0)

```javascript
.sort({ name: 1 })   // A-Z
.sort({ name: -1 })  // Z-A
.sort({ date: -1 })  // Newest first
```

</div>

---

## 🎨 Selecting Fields

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Include Specific Fields

```javascript
.select({ name: 1, tags: 1 })
```

**Output:**
```javascript
[
    {
        tags: [ 'angular', 'frontend' ],
        _id: 605b9bed4dfe11d32a7548f1,
        name: 'Angular Course'
    },
    {
        tags: [ 'node', 'backend' ],
        _id: 605b9a2dc00228d310ffc256,
        name: 'Node.js Course'
    }
]
```

### Exclude Fields

```javascript
.select({ __v: 0, date: 0 })  // Exclude __v and date
```

⚠️ **Note:** `_id` is always included unless explicitly excluded!

</div>

---

## 🔢 Comparison Operators

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Available Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `$eq` | Equal | `{ price: 10 }` |
| `$ne` | Not equal | `{ price: { $ne: 10 } }` |
| `$gt` | Greater than | `{ price: { $gt: 10 } }` |
| `$gte` | Greater or equal | `{ price: { $gte: 10 } }` |
| `$lt` | Less than | `{ price: { $lt: 20 } }` |
| `$lte` | Less or equal | `{ price: { $lte: 20 } }` |
| `$in` | In array | `{ price: { $in: [10, 15, 20] } }` |
| `$nin` | Not in array | `{ price: { $nin: [10, 15, 20] } }` |

### Examples

```javascript
// Courses with price of 10€
.find({ price: 10 })

// Price at least 10€
.find({ price: { $gte: 10 } })

// Price between 10€ and 20€
.find({ price: { $gte: 10, $lte: 20 } })

// Price is 10€, 15€ or 20€
.find({ price: { $in: [10, 15, 20] } })
```

</div>

---

## 🔗 Logical Operators

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### OR Operator

Get courses by M. Dima **OR** published courses:

```javascript
const courses = await Course
    .find()
    .or([{ author: 'M. Dima' }, { isPublished: true }]);
```

### AND Operator

Get courses by M. Dima **AND** published:

```javascript
const courses = await Course
    .find()
    .and([{ author: 'M. Dima' }, { isPublished: true }]);
```

⚠️ **Note:** `.find({ a: 1, b: 2 })` is already AND by default!

```javascript
// These are equivalent:
.find({ author: 'M. Dima', isPublished: true })
.find().and([{ author: 'M. Dima' }, { isPublished: true }])
```

</div>

---

## 🔤 Regular Expressions

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Text Pattern Matching

**Starts with "M.":**
```javascript
.find({ author: /^M./ })
```

**Ends with "Dima":**
```javascript
.find({ author: /Dima$/ })
```

**Case insensitive:**
```javascript
.find({ author: /Dima$/i })
```

**Contains "Dima" (anywhere):**
```javascript
.find({ author: /.*Dima.*/ })
.find({ author: /.*Dima.*/i })  // Case insensitive
```

### Resources

- [regexone.com](https://regexone.com/) - Learn regex
- [rexegg.com](https://www.rexegg.com/regex-quickstart.html) - Regex reference

</div>

---

## 🔢 Counting Documents

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Using .count()

```javascript
async function getCourses() {
    const count = await Course
        .find({ author: 'M. Dima', isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .count();
    console.log(count);
}
```

**Output:**
```
2
```

### Instead of Documents

- `.find()` returns documents
- `.count()` returns number of documents

Useful for pagination and statistics!

</div>

---

## 📄 Pagination

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Using skip() and limit()

```javascript
async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    
    // In real world: /api/courses?pageNumber=2&pageSize=10
    
    const courses = await Course
        .find({ author: 'M. Dima', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    
    console.log(courses);
}
```

### How It Works

- **Page 1:** `skip(0)` - First 10 results
- **Page 2:** `skip(10)` - Next 10 results
- **Page 3:** `skip(20)` - Next 10 results

Formula: `skip((pageNumber - 1) * pageSize)`

</div>

---

## 🎯 findById() Method

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Find Single Document by ID

```javascript
const course = await Course.findById('605b9a2dc00228d310ffc256');
console.log(course);
```

### Equivalent to:

```javascript
const course = await Course.find({ _id: '605b9a2dc00228d310ffc256' });
```

But `.findById()` is:
- Shorter
- More readable
- Returns single document (not array)

</div>

---

## ✨ Best Practice: run() Function

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Organized Code Structure

```javascript
const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();
```

### Benefits

✅ Separate query logic from execution  
✅ Reusable query functions  
✅ Easier to test  
✅ Clean code structure

</div>

---

## 💡 Best Practices

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Querying Guidelines

✅ **DO:**
- Use `.select()` to limit returned fields
- Use `.limit()` for large datasets
- Add pagination with `.skip()` and `.limit()`
- Use indexes for frequently queried fields
- Handle cases where no documents found

❌ **DON'T:**
- Query all fields when you only need some
- Return all documents without limit
- Forget to sort results
- Use complex regex on large collections
- Block the event loop with huge queries

</div>

---

## 🎯 Key Takeaways

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px;">

### Reading Documents Summary

- `.find()` - Get all or filtered documents
- `.findById()` - Get single document by _id
- `.limit()` - Limit number of results
- `.sort()` - Order results (1 = asc, -1 = desc)
- `.select()` - Choose which fields to return
- `.count()` - Count matching documents
- `.skip()` + `.limit()` - Pagination
- Comparison operators: `$gt`, `$gte`, `$lt`, `$lte`, `$in`
- Logical operators: `.or()`, `.and()`
- Regex for text patterns

**Next:** Learn how to update documents!

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 7 Home](./README.md)

[← Previous: Creating Documents](./03-creating-documents.md) | [Next: Updating Documents →](./05-updating-documents.md)

</div>
