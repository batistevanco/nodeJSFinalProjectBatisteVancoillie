# 🎭 Hybrid Approach

> **Combining the best of both worlds**

---

## 🤝 What is a Hybrid Approach?

A **hybrid approach** combines referencing and embedding to optimize for both **performance** and **consistency**.

### The Concept

```mermaid
graph LR
    A[Full Author Document] -->|Reference ID| B[Course]
    A -->|Selected Properties| B
    style A fill:#4299e1,stroke:#2c5282,color:#fff
    style B fill:#48bb78,stroke:#2f855a,color:#fff
```

---

## 💡 The Pattern

### Full Author Document

```javascript
// Complete author in Authors collection
let author = {
  _id: '123',
  name: 'Vives',
  bio: 'Educational institution...',
  website: 'https://vives.be',
  email: 'info@vives.be',
  address: { /* ... */ },
  socialMedia: { /* ... */ },
  // ... 50 other properties
}
```

### Course with Hybrid Reference

```javascript
// Course with reference + snapshot
let course = {
  name: 'Node.js Course',
  author: {
    id: '123',           // Reference for lookups
    name: 'Vives'        // Snapshot for quick display
  }
}
```

---

## 🎯 Benefits

### ⚡ Performance

- ✅ Quick access to frequently needed data (name)
- ✅ No need to populate for simple displays
- ✅ Single query for basic information

### 🔗 Flexibility

- ✅ Can still reference full document when needed
- ✅ Can update author details separately
- ✅ Maintains relationship integrity

---

## 📊 Use Cases

### 1️⃣ Snapshot in Time

Perfect for **order history** where you need to preserve data as it was:

```javascript
// Product details at time of order
{
  order: {
    _id: 'order123',
    date: '2024-02-09',
    product: {
      id: 'product456',        // Reference to current product
      name: 'Node.js Book',    // Snapshot of name
      price: 29.99,            // Price at time of order!
      version: '3rd Edition'   // Version at time of order!
    },
    quantity: 2
  }
}
```

**Why?** If the product price changes to €39.99, this order still shows the €29.99 that was actually paid!

---

### 2️⃣ Frequently Displayed Properties

Perfect for **user profiles** in comments or posts:

```javascript
// Comment with user snapshot
{
  comment: {
    _id: 'comment789',
    text: 'Great course!',
    author: {
      id: 'user123',        // Reference for profile link
      name: 'Milan D.',     // Display in comment
      avatar: 'url...'      // Display in comment
    },
    timestamp: '2024-02-09T10:30:00Z'
  }
}
```

**Why?** Display comments without querying user collection every time!

---

### 3️⃣ Large Documents with Summary

Perfect for **courses with detailed instructor info**:

```javascript
// Course listing with instructor summary
{
  course: {
    _id: 'course101',
    title: 'Advanced Node.js',
    instructor: {
      id: 'instructor456',       // Reference to full profile
      name: 'Prof. Smith',       // For course listing
      title: 'Senior Developer', // For course listing
      rating: 4.8                // For course listing
      // Full profile has 50+ more properties
    },
    price: 99.99
  }
}
```

**Why?** Course listings load fast, full instructor profile on demand!

---

## 🔄 Implementation Example

```javascript
const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
  email: String,
  // ... 45 more properties
});

const Author = mongoose.model('Author', authorSchema);

const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
});

const Course = mongoose.model('Course', courseSchema);
```

---

## ✍️ Creating a Course

```javascript
async function createCourse(name, author) {
  const course = new Course({
    name,
    author: {
      id: author._id,      // Store reference
      name: author.name    // Store snapshot
    }
  });
  
  await course.save();
  return course;
}

// Usage
const author = await Author.findById('123');
await createCourse('Node.js Course', author);
```

---

## 🔍 Querying

### Quick Display (No Population Needed)

```javascript
// Fast query - no populate needed
const courses = await Course.find().select('name author.name');
// Returns: { name: 'Node.js Course', author: { name: 'Vives' } }
```

### Full Author Details (When Needed)

```javascript
// Populate full author when needed
const course = await Course
  .findById('courseId')
  .populate('author.id');
  
// Now you have access to all author properties
console.log(course.author.id.bio);
console.log(course.author.id.website);
```

---

## ⚖️ Trade-offs

| Aspect | Impact |
|--------|--------|
| **Storage** | 💾 Slightly more (duplicated snapshots) |
| **Query Speed** | ⚡ Much faster for common queries |
| **Consistency** | ⚠️ Snapshot may be outdated |
| **Complexity** | 📊 Medium (must manage snapshots) |
| **Flexibility** | ✅ High (choose when to populate) |

---

## 💭 When to Use Hybrid?

✅ **Use hybrid when:**
- Document has many properties but you only need a few frequently
- You need historical accuracy (snapshots in time)
- Performance is important but you occasionally need full data
- Data changes infrequently

❌ **Avoid hybrid when:**
- Embedded data must always be current
- Snapshot properties change very frequently
- Simplicity is more important than performance

---

[← Previous: Referencing & Embedding](02-referencing-embedding.md) | [🏠 Home](../README.md) | [Next: Referencing Documents →](04-referencing-documents.md)
