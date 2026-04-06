# 🔄 Synchronous Error Handling

> **Chapter 11: Handling Synchronous Errors**

---

## 📋 Try-Catch Blocks

The **try-catch** statement is used to handle synchronous errors:

```javascript
try {
  // Code that might throw an error
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // Handle the error
  console.error('An error occurred:', error.message);
} finally {
  // Always executed (optional)
  console.log('Cleanup code here');
}
```

---

## ✅ When to Use Try-Catch

### ✅ Good Use Cases

```javascript
// Parsing JSON
try {
  const data = JSON.parse(userInput);
  console.log(data);
} catch (error) {
  console.error('Invalid JSON:', error.message);
}

// File operations (synchronous)
try {
  const fs = require('fs');
  const content = fs.readFileSync('config.json', 'utf8');
  console.log(content);
} catch (error) {
  console.error('Could not read file:', error.message);
}

// Mathematical operations
try {
  const result = performCalculation(a, b);
  console.log(result);
} catch (error) {
  console.error('Calculation failed:', error.message);
}
```

---

## ❌ When NOT to Use Try-Catch

### ❌ Bad Use Cases

```javascript
// ❌ DON'T: Try-catch with async code (won't work!)
try {
  setTimeout(() => {
    throw new Error('Async error');
  }, 1000);
} catch (error) {
  // This will NEVER catch the error!
  console.error(error);
}

// ❌ DON'T: Catching everything without handling
try {
  doSomething();
} catch (error) {
  // Empty catch - error is silently ignored!
}

// ❌ DON'T: Using try-catch for flow control
try {
  user = findUser(id);
} catch (error) {
  user = createDefaultUser();
}
```

---

## 🎯 Creating Custom Errors

### Basic Custom Error

```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

// Usage
function validateAge(age) {
  if (age < 0 || age > 120) {
    throw new ValidationError('Age must be between 0 and 120');
  }
  return true;
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

---

## 🔍 Multiple Error Types

```javascript
class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.statusCode = 401;
  }
}

// Handling different error types
try {
  const user = getUserById(userId);
  if (!user) {
    throw new NotFoundError('User not found');
  }
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log('User does not exist');
  } else if (error instanceof DatabaseError) {
    console.log('Database connection failed');
  } else {
    console.log('Unexpected error:', error.message);
  }
}
```

---

## 💡 Best Practices

### ✅ DO's

```javascript
// ✅ Be specific about what you're catching
try {
  const data = JSON.parse(input);
} catch (error) {
  logger.error('Failed to parse JSON input:', error.message);
  return { error: 'Invalid JSON format' };
}

// ✅ Rethrow errors you can't handle
try {
  processPayment(amount);
} catch (error) {
  logger.error('Payment processing failed:', error);
  throw error; // Let higher level handle it
}

// ✅ Use finally for cleanup
try {
  const db = connectToDatabase();
  const data = db.query('SELECT * FROM users');
} catch (error) {
  console.error('Database error:', error);
} finally {
  db.close(); // Always close connection
}
```

---

## 🎨 Error Wrapping Pattern

```javascript
function readConfigFile(path) {
  try {
    const fs = require('fs');
    const content = fs.readFileSync(path, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    // Wrap low-level error with more context
    throw new Error(`Failed to read config from ${path}: ${error.message}`);
  }
}

try {
  const config = readConfigFile('./config.json');
  console.log(config);
} catch (error) {
  console.error('Configuration error:', error.message);
}
```

---

## 📊 Error Logging

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    
    // Capture stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

function logError(error) {
  console.error({
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    statusCode: error.statusCode || 500
  });
}

try {
  throw new AppError('Something went wrong', 500);
} catch (error) {
  logError(error);
}
```

---

## 🧪 Lab Exercise

Create a module that:
1. Defines custom error classes for different scenarios
2. Implements proper error handling with try-catch
3. Logs errors with context
4. Demonstrates error wrapping

---

[⬅️ Previous: Introduction](./01-introduction.md) | [🏠 Home](../README.md) | [➡️ Next: Asynchronous Error Handling](./03-async-errors.md)
