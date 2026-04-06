# 🔗 Referencing & Embedding

> **Understanding the two main data modeling approaches**

---

## 📊 The Two Approaches

### 🔗 Referencing (Normalization)

**✅ HIGH Consistency | ❌ LOW Performance**

```javascript
// Author stored separately
let author = {
  _id: 'author123',
  name: 'Vives'
}

// Course references the author by ID
let course = {
  name: 'Node.js Course',
  author: 'author123'  // Reference to author
}
```

**Characteristics:**
- 📌 Data stored in separate collections
- 🔄 Single source of truth
- 🔍 Requires multiple queries to get complete data
- ✨ Updates happen in one place

---

### 📦 Embedding Documents (Denormalization)

**✅ HIGH Performance | ❌ LOW Consistency**

```javascript
// Author embedded within course
let course = {
  name: 'Node.js Course',
  author: {
    name: 'Vives'
  }
}
```

**Characteristics:**
- ⚡ Single query retrieves all data
- 💾 Data duplicated across documents
- 🔄 Updates must happen in multiple places
- 🚀 Faster read operations

---

## 🎭 Visual Comparison

```mermaid
graph TB
    subgraph "Referencing (Normalization)"
    A1[Course Collection] -->|author_id| B1[Author Collection]
    end
    
    subgraph "Embedding (Denormalization)"
    A2[Course Collection<br/>contains author data]
    end
    
    style A1 fill:#4299e1,stroke:#2c5282,color:#fff
    style B1 fill:#48bb78,stroke:#2f855a,color:#fff
    style A2 fill:#ed8936,stroke:#c05621,color:#fff
```

---

## 🔄 Trade-Off Analysis

### Referencing Advantages

| ✅ Pros | ❌ Cons |
|---------|---------|
| Data consistency | Multiple queries needed |
| Single source of truth | Slower read operations |
| Easy updates | More complex queries |
| Less storage used | Requires JOIN operations |

### Embedding Advantages

| ✅ Pros | ❌ Cons |
|---------|---------|
| Fast queries | Data duplication |
| Single query reads | Update complexity |
| Better performance | Consistency challenges |
| Simpler code | Larger documents |

---

## 🤔 Decision Matrix

```mermaid
graph TD
    A[Need to model data] --> B{Read or<br/>Write heavy?}
    B -->|Read Heavy| C{Data changes<br/>frequently?}
    B -->|Write Heavy| D[Referencing]
    C -->|Yes| D
    C -->|No| E[Embedding]
    
    A --> F{Relationship<br/>cardinality?}
    F -->|1:Few| E
    F -->|1:Many| G{Use case?}
    F -->|Many:Many| D
    G -->|Mostly reads| E
    G -->|Many updates| D
    
    style E fill:#48bb78,stroke:#2f855a,color:#fff
    style D fill:#ed8936,stroke:#c05621,color:#fff
```

---

## 💡 Example Use Cases

### 🔗 Use Referencing When:

```javascript
// User and their orders (can have thousands)
{
  user: { _id: '123', name: 'John' },
  orders: ['order1', 'order2', 'order3', ...] // References
}

// Blog posts and comments (unbounded growth)
{
  post: { _id: 'post1', title: 'My Post' },
  comments: ['comment1', 'comment2', ...] // References
}
```

### 📦 Use Embedding When:

```javascript
// User profile with address (limited, rarely changes)
{
  user: {
    name: 'John',
    address: {
      street: '123 Main St',
      city: 'Brussels'
    }
  }
}

// Product with specifications (fixed structure)
{
  product: {
    name: 'Laptop',
    specs: {
      cpu: 'i7',
      ram: '16GB',
      storage: '512GB SSD'
    }
  }
}
```

---

[← Previous: Introduction](01-intro.md) | [🏠 Home](../README.md) | [Next: Hybrid Approach →](03-hybrid-approach.md)
