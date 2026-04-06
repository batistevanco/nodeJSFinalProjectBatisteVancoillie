# 📥 GET Requests

## 🎯 Retrieving Data

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### GET - Read Resources

Learn route parameters and query strings

</div>

---

## 🛣️ Route Parameters

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### Dynamic URL Segments

Route parameters allow dynamic parts in URLs:

```javascript
// Route with parameter
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});
```

**Test it:**
- `http://localhost:3000/api/courses/1` → Returns: `"1"`
- `http://localhost:3000/api/courses/42` → Returns: `"42"`

### Access Parameters

```javascript
req.params.id  // The value from :id
```

</div>

---

## 📝 Multiple Parameters

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #000;">

### More Than One Parameter

```javascript
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});
```

**Test:** `http://localhost:3000/api/posts/2021/12`

**Response:**
```json
{
  "year": "2021",
  "month": "12"
}
```

</div>

---

## 🔍 Query String Parameters

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #000;">

### Optional Parameters

Query strings are used for optional data:

```javascript
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});
```

**URL:** `http://localhost:3000/api/posts/2021/12?sortBy=name&limit=10`

**Response:**
```json
{
  "sortBy": "name",
  "limit": "10"
}
```

### Accessing Query Params

```javascript
req.query.sortBy  // "name"
req.query.limit   // "10"
```

</div>

---

## 🎯 GET One Course Example

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #000;">

### Setup: Course Array

```javascript
const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];
```

### Endpoint: Get All Courses

```javascript
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
```

**Test:** `http://localhost:3000/api/courses`

**Output:** All three courses

</div>

---

## 🔎 Finding a Specific Course

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### Using Array.find()

JavaScript's `.find()` method searches arrays:

```javascript
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    res.send(course);
});
```

### Important!

⚠️ `req.params.id` is a **string**, so we use `parseInt()`!

```javascript
parseInt(req.params.id)  // Converts "1" to 1
```

</div>

---

## ⚠️ Handling Not Found (404)

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; border-left: 5px solid #ff9800; color: #000;">

### Proper Error Handling

What if the course doesn't exist?

```javascript
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    // Course not found
    if (!course) {
        return res.status(404).send('Course with given ID not found');
    }
    
    // Course found
    res.send(course);
});
```

### HTTP Status Codes

- **200** - OK (default)
- **404** - Not Found
- **400** - Bad Request
- **500** - Internal Server Error

</div>

---

## 🧪 Testing GET Endpoints

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #000;">

### In the Browser

**Test existing course:**
```
http://localhost:3000/api/courses/1
```

**Response:**
```json
{"id":1,"name":"course1"}
```

**Test non-existing course:**
```
http://localhost:3000/api/courses/10
```

**Response:**
```
Course with given ID not found
```

Also check the **Network tab** in browser DevTools to see the 404 status!

</div>

---

## 🔧 Complete GET Example

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #000;">

### Full Implementation

```javascript
const express = require('express');
const app = express();

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

// Get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// Get specific course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    
    if (!course) {
        return res.status(404).send('Course with given ID not found');
    }
    
    res.send(course);
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
```

</div>

---

## 💡 Best Practices

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50; color: #000;">

### GET Request Guidelines

✅ **DO:** Use route parameters for required data (:id)  
✅ **DO:** Use query strings for optional filters (?sortBy=name)  
✅ **DO:** Return proper HTTP status codes  
✅ **DO:** Handle not found cases with 404  
✅ **DO:** Parse strings to numbers when needed

❌ **DON'T:** Modify data in GET requests  
❌ **DON'T:** Forget to validate the ID  
❌ **DON'T:** Return 200 when resource doesn't exist

</div>

---

## 🎯 Summary

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; color: #000;">

### GET Requests

- **Route parameters** (`:id`) for required parts of URL
- **Query strings** (`?key=value`) for optional filters
- **Array.find()** to search for items
- **parseInt()** to convert string IDs to numbers
- **404 status** when resource not found
- **Early return** to prevent further execution

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 4 Home](./README.md)

[← Previous: REST & Express](./01-rest-and-express.md) | [Next: POST Requests →](./03-post-requests.md)

</div>
