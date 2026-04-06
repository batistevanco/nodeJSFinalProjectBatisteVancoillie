# ⏱️ Async Testing

## Chapter 12: Testing Asynchronous Code

---

## 🎯 Why Async Testing?

Modern Node.js apps are heavily asynchronous:

- 🌐 **API Calls** - HTTP requests
- 💾 **Database Operations** - Queries and updates
- 📁 **File I/O** - Reading/writing files
- ⏰ **Timers** - setTimeout, setInterval
- 🔄 **Streams** - Data processing

All require async testing!

---

## ✨ Testing Promises

### Basic Promise Test

```javascript
import { test } from 'node:test';
import assert from 'node:assert';

async function fetchUser(id) {
  return { id, name: 'Alice' };
}

test('fetches user successfully', async () => {
  const user = await fetchUser(1);
  assert.strictEqual(user.name, 'Alice');
});
```

### Testing Promise Rejection

```javascript
async function fetchUser(id) {
  if (id < 0) {
    throw new Error('Invalid user ID');
  }
  return { id, name: 'User' };
}

test('rejects with invalid ID', async () => {
  await assert.rejects(
    async () => fetchUser(-1),
    { message: 'Invalid user ID' }
  );
});
```

---

## 🌐 Testing HTTP Requests

### Example Service

```javascript
// userService.js
export async function getUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}
```

### Testing with Mock

```javascript
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { getUser } from './userService.js';

test('fetches user from API', async () => {
  // Mock fetch
  global.fetch = mock.fn(async () => ({
    ok: true,
    json: async () => ({ id: 1, name: 'Alice' })
  }));
  
  const user = await getUser(1);
  
  assert.strictEqual(user.name, 'Alice');
  assert.strictEqual(fetch.mock.calls.length, 1);
});
```

---

## 💾 Testing Database Operations

```javascript
// userRepository.js
export class UserRepository {
  constructor(db) {
    this.db = db;
  }
  
  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    const [rows] = await this.db.execute(query, [id]);
    return rows[0];
  }
  
  async create(user) {
    const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const [result] = await this.db.execute(query, [user.name, user.email]);
    return { id: result.insertId, ...user };
  }
}
```

---

## 🧪 Testing Repository

```javascript
import { test, beforeEach } from 'node:test';
import assert from 'node:assert';
import { UserRepository } from './userRepository.js';

// Mock database
class MockDb {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }
  
  async execute(query, params) {
    if (query.includes('SELECT')) {
      const [id] = params;
      const user = this.users.find(u => u.id === id);
      return [[user]];
    }
    
    if (query.includes('INSERT')) {
      const [name, email] = params;
      const user = { id: this.nextId++, name, email };
      this.users.push(user);
      return [{ insertId: user.id }];
    }
  }
}

test('finds user by ID', async () => {
  const db = new MockDb();
  db.users = [{ id: 1, name: 'Alice', email: 'alice@example.com' }];
  
  const repo = new UserRepository(db);
  const user = await repo.findById(1);
  
  assert.strictEqual(user.name, 'Alice');
});

test('creates new user', async () => {
  const db = new MockDb();
  const repo = new UserRepository(db);
  
  const newUser = await repo.create({
    name: 'Bob',
    email: 'bob@example.com'
  });
  
  assert.strictEqual(newUser.id, 1);
  assert.strictEqual(newUser.name, 'Bob');
});
```

---

## ⏰ Testing with Timers

### Using setTimeout

```javascript
function delayedGreeting(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Hello, ${name}!`);
    }, 1000);
  });
}

test('returns greeting after delay', async () => {
  const greeting = await delayedGreeting('Alice');
  assert.strictEqual(greeting, 'Hello, Alice!');
});
```

### Mock Timers (if needed)

```javascript
import { test, mock } from 'node:test';

test('with mock timers', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  
  let resolved = false;
  const promise = delayedGreeting('Bob').then(result => {
    resolved = true;
    return result;
  });
  
  // Fast-forward time
  t.mock.timers.tick(1000);
  
  await promise;
  assert.ok(resolved);
});
```

---

## 🔄 Testing Async Patterns

### Parallel Operations

```javascript
async function fetchMultipleUsers(ids) {
  const promises = ids.map(id => fetchUser(id));
  return Promise.all(promises);
}

test('fetches multiple users', async () => {
  const users = await fetchMultipleUsers([1, 2, 3]);
  
  assert.strictEqual(users.length, 3);
  assert.ok(users.every(u => u.id));
});
```

### Sequential Operations

```javascript
async function processInOrder(items) {
  const results = [];
  for (const item of items) {
    results.push(await processItem(item));
  }
  return results;
}

test('processes items in order', async () => {
  const results = await processInOrder([1, 2, 3]);
  assert.deepStrictEqual(results, ['processed-1', 'processed-2', 'processed-3']);
});
```

---

## 📁 Testing File Operations

```javascript
import { readFile, writeFile } from 'node:fs/promises';
import { test, beforeEach, afterEach } from 'node:test';
import { unlink } from 'node:fs/promises';

const testFile = 'test-data.json';

afterEach(async () => {
  try {
    await unlink(testFile);
  } catch (err) {
    // File might not exist
  }
});

test('writes and reads JSON file', async () => {
  const data = { name: 'Alice', age: 30 };
  
  // Write
  await writeFile(testFile, JSON.stringify(data));
  
  // Read
  const content = await readFile(testFile, 'utf-8');
  const parsed = JSON.parse(content);
  
  assert.deepStrictEqual(parsed, data);
});
```

---

## 🎣 Setup and Teardown Hooks

```javascript
import { describe, test, before, after, beforeEach, afterEach } from 'node:test';

describe('User API', () => {
  let db;
  
  // Runs once before all tests
  before(async () => {
    db = await connectToDatabase();
  });
  
  // Runs once after all tests
  after(async () => {
    await db.close();
  });
  
  // Runs before each test
  beforeEach(async () => {
    await db.clear();
    await db.seed();
  });
  
  // Runs after each test
  afterEach(async () => {
    await db.cleanup();
  });
  
  test('creates user', async () => {
    const user = await createUser({ name: 'Alice' });
    assert.strictEqual(user.name, 'Alice');
  });
  
  test('finds user', async () => {
    await createUser({ name: 'Bob' });
    const user = await findUser('Bob');
    assert.strictEqual(user.name, 'Bob');
  });
});
```

---

## ⚠️ Common Async Pitfalls

### ❌ Forgetting await

```javascript
// Wrong - test finishes before promise resolves
test('wrong - no await', () => {
  const user = fetchUser(1); // Missing await!
  assert.strictEqual(user.name, 'Alice'); // Fails!
});

// ✅ Correct
test('correct - with await', async () => {
  const user = await fetchUser(1);
  assert.strictEqual(user.name, 'Alice');
});
```

### ❌ Not Handling Rejections

```javascript
// Wrong - unhandled rejection
test('wrong - unhandled rejection', async () => {
  fetchUser(-1); // Missing await and error handling!
});

// ✅ Correct
test('correct - handling rejection', async () => {
  await assert.rejects(() => fetchUser(-1));
});
```

---

## 💡 Best Practices

### ✅ DO

- **Use async/await** - Clearer than callbacks
- **Test both success and failure** - Happy and sad paths
- **Clean up resources** - Use afterEach hooks
- **Mock external dependencies** - Don't hit real APIs
- **Keep tests fast** - Avoid real delays

### ❌ DON'T

- **Test real external services** - Use mocks
- **Share async state** - Keep tests isolated
- **Forget error cases** - Test rejections too
- **Use actual timers** - Mock when possible

---

## 🎯 Quick Reference

```javascript
// Promise success
test('async success', async () => {
  const result = await asyncFunction();
  assert.ok(result);
});

// Promise rejection
test('async rejection', async () => {
  await assert.rejects(() => asyncFunction());
});

// Multiple async operations
test('parallel async', async () => {
  const [a, b] = await Promise.all([
    asyncFunc1(),
    asyncFunc2()
  ]);
  assert.ok(a && b);
});
```

---

[← Previous: Assertions](./03-assertions.md) | [🏠 Home](../README.md) | [Next: Mocking →](./05-mocking.md)
