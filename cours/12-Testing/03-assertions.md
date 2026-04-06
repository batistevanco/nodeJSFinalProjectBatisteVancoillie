# ✅ Assertions

## Chapter 12: Testing with Assert Module

---

## 🎯 What are Assertions?

Assertions verify that your code produces expected results.

```javascript
import assert from 'node:assert';

// If this is false, test fails
assert.strictEqual(actualValue, expectedValue);
```

### Types of Assertions

- **Equality** - Compare values
- **Type** - Check data types
- **Errors** - Verify exceptions
- **Objects** - Deep comparisons
- **Async** - Promise assertions

---

## 🔍 Equality Assertions

### `strictEqual()` - Exact Equality (===)

```javascript
import assert from 'node:assert';

test('strict equality', () => {
  assert.strictEqual(2 + 2, 4);
  assert.strictEqual('hello', 'hello');
  assert.strictEqual(true, true);
});

// ❌ This fails - different types
test('fails with different types', () => {
  assert.strictEqual(5, '5'); // Error!
});
```

### `notStrictEqual()` - Not Equal (!==)

```javascript
test('not equal', () => {
  assert.notStrictEqual(5, 10);
  assert.notStrictEqual('hello', 'world');
});
```

---

## 🧮 Deep Equality

### `deepStrictEqual()` - Compare Objects/Arrays

```javascript
test('deep equality for objects', () => {
  const obj1 = { name: 'John', age: 30 };
  const obj2 = { name: 'John', age: 30 };
  
  assert.deepStrictEqual(obj1, obj2); // ✅ Pass
});

test('deep equality for arrays', () => {
  const arr1 = [1, 2, 3];
  const arr2 = [1, 2, 3];
  
  assert.deepStrictEqual(arr1, arr2); // ✅ Pass
});

test('nested objects', () => {
  const user1 = {
    name: 'Alice',
    address: { city: 'NYC', zip: 10001 }
  };
  const user2 = {
    name: 'Alice',
    address: { city: 'NYC', zip: 10001 }
  };
  
  assert.deepStrictEqual(user1, user2); // ✅ Pass
});
```

---

## 🚨 Error Assertions

### `throws()` - Verify Exceptions

```javascript
function divide(a, b) {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
}

test('throws error on division by zero', () => {
  // Check that function throws
  assert.throws(() => divide(10, 0));
  
  // Check error message
  assert.throws(
    () => divide(10, 0),
    { message: 'Division by zero' }
  );
  
  // Check error type
  assert.throws(
    () => divide(10, 0),
    Error
  );
});
```

### `doesNotThrow()` - No Exception Expected

```javascript
test('does not throw on valid input', () => {
  assert.doesNotThrow(() => divide(10, 2));
});
```

---

## 🎯 Truthiness Assertions

### `ok()` - Truthy Value

```javascript
test('truthy values', () => {
  assert.ok(true);
  assert.ok(1);
  assert.ok('hello');
  assert.ok([1, 2, 3]);
  assert.ok({ name: 'John' });
});

test('falsy values fail', () => {
  // These would fail:
  // assert.ok(false);
  // assert.ok(0);
  // assert.ok('');
  // assert.ok(null);
  // assert.ok(undefined);
});
```

---

## 📊 Array Assertions

```javascript
test('array contains element', () => {
  const arr = [1, 2, 3, 4, 5];
  
  assert.ok(arr.includes(3));
  assert.strictEqual(arr.length, 5);
});

test('array properties', () => {
  const users = ['Alice', 'Bob', 'Charlie'];
  
  assert.strictEqual(users[0], 'Alice');
  assert.strictEqual(users.length, 3);
  assert.ok(Array.isArray(users));
});
```

---

## 🔤 String Assertions

```javascript
test('string assertions', () => {
  const str = 'Hello World';
  
  assert.ok(str.includes('World'));
  assert.ok(str.startsWith('Hello'));
  assert.ok(str.endsWith('World'));
  assert.strictEqual(str.length, 11);
});

test('string matching with regex', () => {
  const email = 'test@example.com';
  
  assert.match(email, /@/);
  assert.match(email, /^[^@]+@[^@]+\.[^@]+$/);
});
```

---

## 🏗️ Object Assertions

```javascript
test('object properties', () => {
  const user = {
    name: 'Alice',
    age: 30,
    email: 'alice@example.com'
  };
  
  assert.strictEqual(user.name, 'Alice');
  assert.strictEqual(user.age, 30);
  assert.ok('email' in user);
  assert.ok(Object.keys(user).length === 3);
});

test('object structure', () => {
  const response = {
    status: 200,
    data: { id: 1, name: 'Product' }
  };
  
  assert.deepStrictEqual(response, {
    status: 200,
    data: { id: 1, name: 'Product' }
  });
});
```

---

## 🔄 Promise Assertions

### `rejects()` - Promise Rejection

```javascript
async function fetchData(id) {
  if (id < 0) {
    throw new Error('Invalid ID');
  }
  return { id, name: 'Item' };
}

test('rejects with invalid ID', async () => {
  await assert.rejects(
    async () => fetchData(-1),
    { message: 'Invalid ID' }
  );
});
```

### `doesNotReject()` - Promise Success

```javascript
test('does not reject with valid ID', async () => {
  await assert.doesNotReject(async () => fetchData(1));
});
```

---

## 💡 Common Assertion Patterns

### Testing API Responses

```javascript
test('API response structure', () => {
  const response = {
    status: 200,
    data: {
      users: [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
    }
  };
  
  assert.strictEqual(response.status, 200);
  assert.ok(Array.isArray(response.data.users));
  assert.strictEqual(response.data.users.length, 2);
  assert.strictEqual(response.data.users[0].name, 'Alice');
});
```

---

## 📋 Assertion Cheat Sheet

| Assertion | Use Case |
|-----------|----------|
| `strictEqual(a, b)` | Exact equality (===) |
| `deepStrictEqual(a, b)` | Objects/Arrays |
| `throws(fn)` | Function throws error |
| `rejects(promise)` | Promise rejects |
| `ok(value)` | Truthy value |
| `match(str, regex)` | String pattern |

---

## ⚠️ Common Mistakes

```javascript
// ❌ Using == instead of ===
test('wrong equality', () => {
  // assert.equal(5, '5');  // Use strictEqual!
});

// ❌ Comparing objects with ===
test('wrong object comparison', () => {
  const obj1 = { a: 1 };
  const obj2 = { a: 1 };
  // assert.strictEqual(obj1, obj2); // Use deepStrictEqual!
});

// ❌ Forgetting async/await
test('wrong async test', async () => {
  // await assert.rejects(...);  // Don't forget await!
});
```

---

[← Previous: First Test](./02-first-test.md) | [🏠 Home](../README.md) | [Next: Async Testing →](./04-async-testing.md)
