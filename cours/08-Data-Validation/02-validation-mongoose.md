# 🔐 Validation in Mongoose

## Understanding Mongoose Validation

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2rem; border-radius: 10px; color: white; margin: 1rem 0;">
  <h3>📊 Schema-Based Validation</h3>
  <p>Mongoose validates data based on the schema definition before saving to the database.</p>
</div>

---

## 🎯 Built-in Validators

### Common Validators for All Types

```javascript
{
  type: String,
  required: true,        // Field must be present
  default: 'value'       // Default value if not provided
}
```

### 📝 String Validators

```javascript
name: {
  type: String,
  required: true,
  minlength: 5,         // Minimum length
  maxlength: 255,       // Maximum length
  match: /pattern/      // Must match regex pattern
}
```

### 🔢 Number Validators

```javascript
price: {
  type: Number,
  required: true,
  min: 10,              // Minimum value
  max: 200              // Maximum value
}
```

### 📅 Date Validators

```javascript
publishDate: {
  type: Date,
  min: '1970-01-01',    // Minimum date
  max: '2030-12-31'     // Maximum date
}
```

---

## 🎨 Enum Validator

Restrict values to a predefined set:

```javascript
category: {
  type: String,
  required: true,
  enum: ['web', 'mobile', 'network']
}
```

<div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; margin: 1rem 0;">
  <strong>⚠️ Note:</strong> Only these exact values are allowed. Any other value will fail validation.
</div>

---

## 💡 Example: Course Schema

```javascript
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  price: Number
});
```

---

<div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 1rem; margin: 1rem 0;">
  <strong>✅ Best Practice:</strong> Always define validation rules in your schema to maintain data integrity.
</div>

---

[← Previous: Introduction](01-introduction.md) | [🏠 Home](../README.md) | [Next: Custom Validators →](03-custom-validators.md)
