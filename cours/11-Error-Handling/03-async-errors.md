# ⚡ Asynchronous Error Handling

> **Chapter 11: Handling Asynchronous Errors**

---

## 📋 The Challenge with Async Code

Traditional try-catch **does NOT work** with asynchronous code:

```javascript
// ❌ THIS WILL NOT WORK!
try {
  setTimeout(() => {
    throw new Error('Async error');
  }, 1000);
} catch (error) {
  console.error(error); // Never executed!
}

// ❌ THIS WILL NOT WORK!
try {
  fs.readFile('file.txt', (err, data) => {
    throw new Error('Something wrong');
  });
} catch (error) {
  console.error(error); // Never executed!
}
```

**Why?** The try-catch block finishes before the async operation completes!

---

## 🔄 Error-First Callbacks Pattern

Node.js convention: **first parameter is always error**

```javascript
const fs = require('fs');

// Error-first callback pattern
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    // Handle error
    console.error('Error reading file:', err.message);
    return;
  }
  
  // Process data
  console.log(data);
});
```

---

## ✅ Callback Error Handling Best Practices

### ✅ Always Check for Errors First

```javascript
const fs = require('fs');

function readConfigFile(callback) {
  fs.readFile('config.json', 'utf8', (err, data) => {
    if (err) {
      return callback(err); // Pass error up
    }
    
    try {
      const config = JSON.parse(data);
      callback(null, config);
    } catch (parseError) {
      callback(parseError); // Handle parse errors too
    }
  });
}

// Usage
readConfigFile((err, config) => {
  if (err) {
    console.error('Failed to load config:', err.message);
    return;
  }
  
  console.log('Config loaded:', config);
});
```

---

## 🎯 Nested Callbacks (Callback Hell)

```javascript
// ❌ Pyramid of Doom
fs.readFile('user.json', (err, userData) => {
  if (err) return handleError(err);
  
  db.connect((err, connection) => {
    if (err) return handleError(err);
    
    connection.query('SELECT * FROM posts', (err, posts) => {
      if (err) return handleError(err);
      
      processData(posts, (err, result) => {
        if (err) return handleError(err);
        
        console.log(result);
      });
    });
  });
});
```

**Solution:** Use Promises or async/await!

---

## 🎁 Promise Error Handling

### Basic Promise Error Handling

```javascript
const fs = require('fs').promises;

// Using .catch()
fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log(data);
    return processData(data);
  })
  .then(result => {
    console.log('Processed:', result);
  })
  .catch(error => {
    console.error('Error:', error.message);
  })
  .finally(() => {
    console.log('Cleanup');
  });
```

---

## 🔗 Promise Chain Error Handling

```javascript
function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    });
}

function enrichUserData(user) {
  return fetch(`/api/posts?userId=${user.id}`)
    .then(response => response.json())
    .then(posts => {
      user.posts = posts;
      return user;
    });
}

// Chain with error handling
fetchUser(123)
  .then(user => enrichUserData(user))
  .then(enrichedUser => {
    console.log('User with posts:', enrichedUser);
  })
  .catch(error => {
    // Catches errors from ANY step in the chain
    console.error('Failed to fetch user data:', error.message);
  });
```

---

## ⚡ Async/Await Error Handling

### Basic Try-Catch with Async/Await

```javascript
const fs = require('fs').promises;

async function readAndParseFile(path) {
  try {
    const content = await fs.readFile(path, 'utf8');
    const data = JSON.parse(content);
    return data;
  } catch (error) {
    console.error('Error reading/parsing file:', error.message);
    throw error; // Rethrow or return default value
  }
}

// Usage
async function main() {
  try {
    const data = await readAndParseFile('config.json');
    console.log('Config:', data);
  } catch (error) {
    console.error('Failed to load config:', error.message);
  }
}

main();
```

---

## 🎨 Multiple Async Operations

### Sequential Operations

```javascript
async function processUserData(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(userId);
    const comments = await fetchUserComments(userId);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Error processing user data:', error.message);
    throw error;
  }
}
```

### Parallel Operations with Error Handling

```javascript
async function fetchAllData(userId) {
  try {
    // Run in parallel with Promise.all
    const [user, posts, comments] = await Promise.all([
      fetchUser(userId),
      fetchUserPosts(userId),
      fetchUserComments(userId)
    ]);
    
    return { user, posts, comments };
  } catch (error) {
    // If ANY promise fails, this catches it
    console.error('Error fetching data:', error.message);
    throw error;
  }
}
```

---

## 🛡️ Graceful Degradation with Promise.allSettled

```javascript
async function fetchUserDashboard(userId) {
  const results = await Promise.allSettled([
    fetchUser(userId),
    fetchUserPosts(userId),
    fetchUserComments(userId),
    fetchUserStats(userId)
  ]);
  
  const dashboard = {};
  
  // User data (required)
  if (results[0].status === 'fulfilled') {
    dashboard.user = results[0].value;
  } else {
    throw new Error('User data is required');
  }
  
  // Posts (optional - graceful degradation)
  dashboard.posts = results[1].status === 'fulfilled' 
    ? results[1].value 
    : [];
  
  // Comments (optional)
  dashboard.comments = results[2].status === 'fulfilled'
    ? results[2].value
    : [];
  
  // Stats (optional)
  dashboard.stats = results[3].status === 'fulfilled'
    ? results[3].value
    : { posts: 0, comments: 0 };
  
  return dashboard;
}
```

---

## 🔍 Error Handler Wrapper

```javascript
// Wrapper function to avoid repetitive try-catch
function asyncHandler(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error); // Pass to Express error middleware
    }
  };
}

// Usage in Express routes
app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotFoundError('User not found');
  }
  res.json(user);
}));
```

---

## 💡 Best Practices

### ✅ DO's

```javascript
// ✅ Always use try-catch with async/await
async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

// ✅ Handle Promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic
});

// ✅ Use async/await over raw promises for readability
async function betterReadability() {
  try {
    const user = await getUser();
    const posts = await getPosts(user.id);
    return { user, posts };
  } catch (error) {
    handleError(error);
  }
}
```

---

## 📊 Error Propagation Pattern

```javascript
class UserService {
  async getUserProfile(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      
      if (!user) {
        throw new NotFoundError(`User ${userId} not found`);
      }
      
      return user;
    } catch (error) {
      // Log error with context
      logger.error('Failed to get user profile', {
        userId,
        error: error.message,
        stack: error.stack
      });
      
      // Rethrow to let caller decide what to do
      throw error;
    }
  }
}

// In your route handler
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.params.id);
    res.json(user);
  } catch (error) {
    next(error); // Pass to error middleware
  }
});
```

---

## 🧪 Lab Exercise

Create an async application that:
1. Reads multiple files in parallel
2. Handles errors gracefully
3. Uses Promise.allSettled for optional operations
4. Implements proper error logging
5. Demonstrates async/await error patterns

---

[⬅️ Previous: Synchronous Errors](./02-synchronous-errors.md) | [🏠 Home](../README.md) | [➡️ Next: Express Error Middleware](./04-express-errors.md)
