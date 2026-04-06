# 🗑️ Deleting Documents

## 🎯 CRUD: Delete

<div style="background: linear-gradient(135deg, #00c853 0%, #64dd17 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Removing Data from MongoDB

Delete one or many documents

</div>

---

## 🗑️ Delete Methods

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Available Methods

| Method | Purpose |
|--------|---------|
| `.deleteOne()` | Delete first matching document |
| `.deleteMany()` | Delete all matching documents |
| `.findByIdAndRemove()` | Delete by ID and return document |
| `.findOneAndRemove()` | Delete one and return document |

### When to Use Each

- **Delete single** → `deleteOne()` or `findByIdAndRemove()`
- **Delete multiple** → `deleteMany()`
- **Need deleted doc** → `findByIdAndRemove()` or `findOneAndRemove()`

</div>

---

## 🎯 Delete One Document

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Using deleteOne()

```javascript
async function removeCourse(id) {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
}

removeCourse('605b9bed4dfe11d32a7548f1');
```

**Terminal Output:**
```javascript
{ n: 1, ok: 1, deletedCount: 1 }
```

### Result Object

- `n` - Number of documents matched
- `ok` - Operation status (1 = success)
- `deletedCount` - Number of documents deleted

</div>

---

## 🔥 Delete Many Documents

<div style="background-color: #ffebee; padding: 25px; border-radius: 10px; border-left: 5px solid #f44336;">

### Using deleteMany()

```javascript
async function removeCourse(id) {
    const result = await Course.deleteMany({ isPublished: false });
    console.log(result);
}

removeCourse();
```

**Deletes ALL documents where `isPublished` is `false`!**

⚠️ **WARNING:** Be careful with `deleteMany()`!

```javascript
// ⚠️ DANGER: Deletes ALL documents in collection!
await Course.deleteMany({});
```

### Safety Check

```javascript
async function removeUnpublished() {
    // Count first
    const count = await Course.countDocuments({ isPublished: false });
    console.log(`About to delete ${count} documents`);
    
    // Then delete
    const result = await Course.deleteMany({ isPublished: false });
    console.log(`Deleted ${result.deletedCount} documents`);
}
```

</div>

---

## 🔙 Delete and Return Document

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Using findByIdAndRemove()

```javascript
async function removeCourse(id) {
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
}

removeCourse('605b9bed4dfe11d32a7548f1');
```

**Returns the deleted document:**
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

### Why Return Document?

- Show what was deleted
- Log for audit trail
- Undo functionality
- Send confirmation to user

</div>

---

## 🔍 Check Before Delete

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Safe Deletion Pattern

```javascript
async function removeCourse(id) {
    // Check if exists
    const course = await Course.findById(id);
    
    if (!course) {
        console.log('Course not found');
        return;
    }
    
    // Delete
    const result = await Course.deleteOne({ _id: id });
    console.log('Deleted:', result.deletedCount);
}

removeCourse('605b9bed4dfe11d32a7548f1');
```

### Benefits

✅ Confirm document exists  
✅ Can check permissions  
✅ Apply business logic  
✅ Provide meaningful feedback

</div>

---

## ⚠️ Error Handling

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

### Handle Deletion Errors

```javascript
async function removeCourse(id) {
    try {
        const course = await Course.findByIdAndRemove(id);
        
        if (!course) {
            console.log('Course not found');
            return;
        }
        
        console.log('Deleted course:', course.name);
    } catch (err) {
        console.error('Error deleting course:', err.message);
    }
}

removeCourse('605b9bed4dfe11d32a7548f1');
```

### Common Errors

- Document not found
- Invalid ID format
- Database connection error
- Permission errors

Always wrap delete operations in try/catch!

</div>

---

## 🎨 Delete vs Remove

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Method Names

**Old (Deprecated):**
```javascript
.remove()      // ⚠️ Deprecated
.findByIdAndRemove()  // Still works but consider Delete
```

**New (Recommended):**
```javascript
.deleteOne()
.deleteMany()
.findByIdAndDelete()
.findOneAndDelete()
```

### Modern Approach

```javascript
// Use these methods:
await Course.deleteOne({ _id: id });
await Course.deleteMany({ isPublished: false });
await Course.findByIdAndDelete(id);
```

</div>

---

## 💡 Soft Delete Pattern

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

### Alternative to Hard Delete

Instead of removing documents, mark them as deleted:

```javascript
// Add to schema
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isDeleted: { type: Boolean, default: false },
    deletedAt: Date
});

// "Delete" by marking
async function softDeleteCourse(id) {
    const course = await Course.findByIdAndUpdate(id, {
        $set: {
            isDeleted: true,
            deletedAt: new Date()
        }
    }, { new: true });
    
    return course;
}

// Filter out deleted
async function getActiveCourses() {
    return await Course.find({ isDeleted: false });
}
```

### Benefits

✅ Can restore deleted items  
✅ Maintain history  
✅ Audit trail  
✅ Legal compliance

</div>

---

## 📊 Delete with Conditions

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px;">

### Complex Filters

```javascript
// Delete old unpublished courses
async function cleanupOldCourses() {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const result = await Course.deleteMany({
        isPublished: false,
        date: { $lt: oneYearAgo }
    });
    
    console.log(`Deleted ${result.deletedCount} old courses`);
}
```

### Batch Deletion

```javascript
// Delete by author
async function deleteAuthorCourses(author) {
    const result = await Course.deleteMany({ author: author });
    return result.deletedCount;
}

// Delete by tags
async function deleteByTags(tags) {
    const result = await Course.deleteMany({ 
        tags: { $in: tags }
    });
    return result.deletedCount;
}
```

</div>

---

## 💡 Best Practices

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Delete Guidelines

✅ **DO:**
- Verify document exists before deleting
- Use try/catch for error handling
- Consider soft delete for important data
- Log deletions for audit trail
- Confirm user intent (especially for deleteMany)
- Use transactions for related deletions

❌ **DON'T:**
- Use `deleteMany({})` without confirmation
- Delete without checking permissions
- Forget to handle "not found" case
- Delete without backup strategy
- Ignore cascade deletions (related data)

</div>

---

## 🎯 Chapter 7 Complete!

<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### What You've Learned

✅ MongoDB basics and NoSQL concepts  
✅ Mongoose ODM and connection  
✅ Schemas to define structure  
✅ Models to create document classes  
✅ **CRUD Operations:**
- Create with `.save()`
- Read with `.find()`, `.findById()`
- Update with `.update()`, `.findByIdAndUpdate()`
- Delete with `.deleteOne()`, `.deleteMany()`
✅ Query operators and filters  
✅ Pagination and sorting  
✅ Regular expressions for text search

**Next:** Learn Data Validation with Joi!

</div>

---

## 📝 Assignment & Resources

<div style="background-color: #fce4ec; padding: 25px; border-radius: 10px;">

### GitHub Classroom Lab

Complete the Chapter 7 lab assignment:

🔗 **See Toledo for the GitHub Classroom link (Chapter 7)**

**Practice:** Create a full CRUD API with MongoDB!

### Class Code Repository

📦 [https://github.com/MilanVives/NodeLes7](https://github.com/MilanVives/NodeLes7)

### Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB University (Free Courses)](https://university.mongodb.com/)

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 7 Home](./README.md)

[← Previous: Updating Documents](./05-updating-documents.md) | [Next Chapter: Data Validation →](../08-Data-Validation/README.md)

</div>
