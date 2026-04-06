# ✏️ Updating Documents

## 🎯 CRUD: Update

<div style="background: linear-gradient(135deg, #00c853 0%, #64dd17 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Modifying Existing Data

Two approaches: Query First vs Update First

</div>

---

## 🔍 Approach 1: Query First

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### The Process

1. **Find** the document
2. **Modify** its properties
3. **Save** back to database

### When to Use

✅ Good when you need to:
- Validate before updating
- Apply business logic
- Check current state
- Trigger middleware (pre/post hooks)

</div>

---

## 📝 Query First: Basic Example

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Find, Modify, Save

```javascript
async function updateCourse(id) {
    const course = await Course.findById(id);
    
    if (!course) return;  // Course not found
    
    // Modify properties
    course.isPublished = true;
    course.author = 'Another author';
    
    const result = await course.save();
    console.log(result);
}

updateCourse('605b9bed4dfe11d32a7548f1');
```

### Direct Property Assignment

```javascript
course.isPublished = true;
course.author = 'Another author';
```

</div>

---

## 🎨 Query First: Using .set()

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Alternative Syntax

```javascript
async function updateCourse(id) {
    const course = await Course.findById(id);
    
    if (!course) return;
    
    // Use .set() method
    course.set({
        isPublished: true,
        author: 'Another author'
    });
    
    const result = await course.save();
    console.log(result);
}

updateCourse('605b9bed4dfe11d32a7548f1');
```

### Benefits of .set()

- Update multiple properties at once
- Cleaner code
- More readable

</div>

---

## ⚡ Approach 2: Update First

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### The Process

1. **Update** directly in database
2. **No retrieval** needed
3. **Faster** for simple updates

### When to Use

✅ Good when:
- Simple updates
- No validation needed
- Performance is critical
- Don't need current document

### MongoDB Update Operators

See [MongoDB Update Operators](https://docs.mongodb.com/manual/reference/operator/update/)

</div>

---

## 🔄 Update First: Basic Example

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Using .update()

```javascript
async function updateCourse2(id) {
    const result = await Course.update(
        { _id: id },  // Filter
        {
            $set: {   // Update operator
                author: 'M. Dima',
                isPublished: false
            }
        }
    );
    console.log(result);
}

updateCourse2('605b9bed4dfe11d32a7548f1');
```

**Terminal Output:**
```javascript
{ n: 1, nModified: 1, ok: 1 }
```

### Result Object

- `n` - Number of documents matched
- `nModified` - Number of documents modified
- `ok` - Operation status (1 = success)

</div>

---

## 🎯 MongoDB Update Operators

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Common Operators

| Operator | Purpose | Example |
|----------|---------|---------|
| `$set` | Set field value | `{ $set: { name: 'New' } }` |
| `$unset` | Remove field | `{ $unset: { field: 1 } }` |
| `$inc` | Increment value | `{ $inc: { age: 1 } }` |
| `$push` | Add to array | `{ $push: { tags: 'new' } }` |
| `$pull` | Remove from array | `{ $pull: { tags: 'old' } }` |
| `$rename` | Rename field | `{ $rename: { old: 'new' } }` |

### Examples

```javascript
// Set values
{ $set: { author: 'John', isPublished: true } }

// Increment price by 5
{ $inc: { price: 5 } }

// Add tag to array
{ $push: { tags: 'javascript' } }

// Remove tag from array
{ $pull: { tags: 'angular' } }
```

</div>

---

## 🔙 Returning the Updated Document

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Using findByIdAndUpdate()

```javascript
async function updateCourse2(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            author: 'Jack',
            isPublished: true
        }
    });
    console.log(course);
}

updateCourse2('605b9bed4dfe11d32a7548f1');
```

⚠️ **Returns the ORIGINAL document** (before update)!

### Get Updated Document

```javascript
const course = await Course.findByIdAndUpdate(id, {
    $set: {
        author: 'Jack',
        isPublished: true
    }
}, { new: true });  // ← Add this option!

console.log(course);  // Returns updated document
```

</div>

---

## 🆚 Query First vs Update First

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Comparison

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #c8e6c9;">
<th style="padding: 15px;">Aspect</th>
<th style="padding: 15px;">Query First</th>
<th style="padding: 15px;">Update First</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>Steps</strong></td>
<td style="padding: 15px;">Find → Modify → Save</td>
<td style="padding: 15px;">Update directly</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Speed</strong></td>
<td style="padding: 15px;">Slower (2 operations)</td>
<td style="padding: 15px;">Faster (1 operation)</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Validation</strong></td>
<td style="padding: 15px;">Full Mongoose validation</td>
<td style="padding: 15px;">Limited validation</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Middleware</strong></td>
<td style="padding: 15px;">Triggers hooks</td>
<td style="padding: 15px;">May not trigger</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Return Value</strong></td>
<td style="padding: 15px;">Full document</td>
<td style="padding: 15px;">Update result</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Use Case</strong></td>
<td style="padding: 15px;">Complex logic</td>
<td style="padding: 15px;">Simple updates</td>
</tr>
</table>

</div>

---

## 📚 Update Methods Summary

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Available Methods

```javascript
// Update many documents
Course.updateMany({ filter }, { update })

// Update one document
Course.updateOne({ filter }, { update })

// Find and update, return document
Course.findByIdAndUpdate(id, { update })
Course.findOneAndUpdate({ filter }, { update })

// Query first approach
const doc = await Course.findById(id);
doc.property = value;
await doc.save();
```

### Choose Based On

- **Simple update** → `updateOne()` or `updateMany()`
- **Need document** → `findByIdAndUpdate()` with `{ new: true }`
- **Complex logic** → Query First approach
- **Performance** → Update First approach

</div>

---

## ⚠️ Update with Validation

<div style="background-color: #ffebee; padding: 25px; border-radius: 10px; border-left: 5px solid #f44336;">

### Query First: Full Validation

```javascript
async function updateCourse(id) {
    try {
        const course = await Course.findById(id);
        if (!course) {
            console.log('Course not found');
            return;
        }
        
        course.isPublished = true;
        course.author = 'New Author';
        
        const result = await course.save();
        console.log('Updated:', result);
    } catch (err) {
        console.error('Validation error:', err.message);
    }
}
```

### Benefits

- Mongoose runs all validators
- Business logic in middleware executes
- Can check current state before updating

</div>

---

## 💡 Best Practices

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Update Guidelines

✅ **DO:**
- Use Query First for complex updates
- Use Update First for simple batch updates
- Check if document exists before updating
- Handle errors with try/catch
- Use `{ new: true }` to get updated document
- Use appropriate update operators ($set, $inc, etc.)

❌ **DON'T:**
- Update without checking existence
- Forget to use $set operator
- Mix update approaches inconsistently
- Update without validation when needed
- Ignore update result

</div>

---

## 🎯 Key Takeaways

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">

### Updating Documents Summary

**Query First:**
- Find → Modify → Save
- Full validation
- Triggers middleware
- Good for complex updates

**Update First:**
- Direct database update
- Faster
- Limited validation
- Good for simple updates

**Methods:**
- `.update()`, `.updateOne()`, `.updateMany()`
- `.findByIdAndUpdate()`, `.findOneAndUpdate()`
- Update operators: `$set`, `$inc`, `$push`, `$pull`

**Next:** Learn how to delete documents!

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 7 Home](./README.md)

[← Previous: Reading Documents](./04-reading-documents.md) | [Next: Deleting Documents →](./06-deleting-documents.md)

</div>
