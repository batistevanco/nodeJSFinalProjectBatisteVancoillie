# 📤 POST Requests & Validation

## 🎯 Creating Resources

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### POST - Create New Resources

Learn to handle data creation and validate input

</div>

---

## 📝 POST Request Basics

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### Creating a Course

```javascript
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    
    courses.push(course);
    res.send(course);
});
```

### Reading Request Body

To access `req.body`, we need middleware:

```javascript
// Add at the top of your file
app.use(express.json());
```

This parses incoming JSON in request bodies.

</div>

---

## 🔌 Enable JSON Parsing

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #000;">

### Complete Setup

```javascript
const express = require('express');
const app = express();

// Enable JSON body parsing
app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' }
];

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    
    courses.push(course);
    res.send(course);  // Return created resource
});

app.listen(3000, () => {
    console.log('Listening on port 3000...');
});
```

</div>

---

## 📮 Testing with Postman

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #000;">

### Using Postman

**1. Create Request**
- Method: **POST**
- URL: `http://localhost:3000/api/courses`

**2. Set Body**
- Body → **raw** → **JSON**

```json
{
    "name": "new course"
}
```

**3. Send**

**Response:**
```json
{
    "id": 4,
    "name": "new course"
}
```

</div>

---

## 🔌 REST Client (VS Code Extension)

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #000;">

### Alternative to Postman

Create `test.http` file:

```http
### Get all courses
GET http://localhost:3000/api/courses

### Create a course
POST http://localhost:3000/api/courses
Content-Type: application/json

{
    "name": "new course"
}

### Get specific course
GET http://localhost:3000/api/courses/1
```

Click "Send Request" above each request!

</div>

---

## ⚠️ Input Validation Problem

<div style="background-color: #ffebee; padding: 25px; border-radius: 10px; border-left: 5px solid #f44336; color: #000;">

### Never Trust User Input!

What if:
- Client forgets to send `name`?
- Name is empty string?
- Name is too short?
- Name contains invalid characters?

### Without Validation

```javascript
const course = {
    id: courses.length + 1,
    name: req.body.name  // Could be undefined, empty, or invalid!
};
```

⚠️ **This will cause problems!**

</div>

---

## ✅ Basic Validation

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### Manual Validation

```javascript
app.post('/api/courses', (req, res) => {
    // Validate
    if (!req.body.name || req.body.name.length < 3) {
        // 400 Bad Request
        return res.status(400).send('Name required, min 3 chars');
    }
    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    
    courses.push(course);
    res.send(course);
});
```

### Problems with Manual Validation

- ❌ Gets complex quickly
- ❌ Repetitive code
- ❌ Hard to maintain
- ❌ Doesn't scale well

</div>

---

## 🎯 Validation with Joi

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #000;">

### Install Joi

```bash
npm i joi
```

### Import and Use

```javascript
const Joi = require('joi');

app.post('/api/courses', (req, res) => {
    // Define schema
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    // Validate
    const result = schema.validate(req.body);
    console.log(result);
    
    // ... rest of code
});
```

</div>

---

## 🔍 Joi Validation Result

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #000;">

### With Invalid Input

**Send:** `{ "name": "n" }`

**Console output:**

```javascript
{
  value: { name: 'n' },
  error: [Error [ValidationError]: "name" length must be at least 3 characters long] {
    _original: { name: 'n' },
    details: [ [Object] ]
  }
}
```

### With Missing Name

**Send:** `{ "name": "" }`

**Console output:**

```javascript
{
  value: { name: '' },
  error: [Error [ValidationError]: "name" is not allowed to be empty]
}
```

</div>

---

## ✅ Complete Joi Validation

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #000;">

### Full Implementation

```javascript
app.post('/api/courses', (req, res) => {
    // Define validation schema
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    
    // Validate request body
    const result = schema.validate(req.body);
    
    // Check for validation errors
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }
    
    // Create course
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    
    courses.push(course);
    res.send(course);
});
```

</div>

---

## 📋 User-Friendly Error Messages

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### Extracting the Message

Instead of sending the entire error object:

```javascript
// ❌ Too much information
res.status(400).send(result.error);
```

Send just the message:

```javascript
// ✅ Clean error message
res.status(400).send(result.error.details[0].message);
```

### Examples

**Empty name:**
```
"name" is not allowed to be empty
```

**Too short:**
```
"name" length must be at least 3 characters long
```

</div>

---

## 💡 Joi Schema Examples

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #000;">

### Different Validation Rules

```javascript
// String with min/max length
const schema = Joi.object({
    name: Joi.string().min(3).max(50).required()
});

// Number with range
const schema = Joi.object({
    age: Joi.number().integer().min(0).max(120).required()
});

// Email
const schema = Joi.object({
    email: Joi.string().email().required()
});

// Multiple fields
const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(18)
});

// Optional field
const schema = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().optional()
});
```

</div>

---

## 🎯 Best Practices

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50; color: #000;">

### POST Request Guidelines

✅ **DO:** Always validate input  
✅ **DO:** Return the created resource  
✅ **DO:** Use 400 status for validation errors  
✅ **DO:** Send user-friendly error messages  
✅ **DO:** Use Joi for complex validation

❌ **DON'T:** Trust user input  
❌ **DON'T:** Expose sensitive error details  
❌ **DON'T:** Forget `app.use(express.json())`  
❌ **DON'T:** Create resources without validation

</div>

---

## 📊 HTTP Status Codes for POST

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e8f5e9; color: #000;">
<th style="padding: 15px;">Status</th>
<th style="padding: 15px;">Meaning</th>
<th style="padding: 15px;">When to Use</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>200 OK</strong></td>
<td style="padding: 15px;">Success</td>
<td style="padding: 15px;">Resource created successfully</td>
</tr>
<tr style="background-color: #f5f5f5; color: #000;">
<td style="padding: 15px;"><strong>201 Created</strong></td>
<td style="padding: 15px;">Resource created</td>
<td style="padding: 15px;">Preferred for POST (best practice)</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>400 Bad Request</strong></td>
<td style="padding: 15px;">Invalid input</td>
<td style="padding: 15px;">Validation failed</td>
</tr>
<tr style="background-color: #f5f5f5; color: #000;">
<td style="padding: 15px;"><strong>401 Unauthorized</strong></td>
<td style="padding: 15px;">Not authenticated</td>
<td style="padding: 15px;">Login required</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>403 Forbidden</strong></td>
<td style="padding: 15px;">Not allowed</td>
<td style="padding: 15px;">No permission</td>
</tr>
</table>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 4 Home](./README.md)

[← Previous: GET Requests](./02-get-requests.md) | [Next: PUT & DELETE →](./04-put-delete-requests.md)

</div>
