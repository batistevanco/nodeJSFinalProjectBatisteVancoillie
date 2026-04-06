# ✍️ Writing Your First Test

## Chapter 12: Basic Test Structure

---

## 🎯 Test Anatomy

Every test has three parts (AAA Pattern):

```mermaid
graph LR
    A[🔧 Arrange<br/>Setup] --> B[⚡ Act<br/>Execute]
    B --> C[✅ Assert<br/>Verify]
    
    style A fill:#4299e1,stroke:#2b6cb0,color:#fff
    style B fill:#9f7aea,stroke:#6b46c1,color:#fff
    style C fill:#38a169,stroke:#2f855a,color:#fff
```

---

## 📝 Basic Test Structure

```javascript
import { test } from 'node:test';
import assert from 'node:assert';

test('description of what you are testing', () => {
  // Arrange - Set up test data
  const input = 5;
  
  // Act - Execute the code
  const result = input * 2;
  
  // Assert - Verify the result
  assert.strictEqual(result, 10);
});
```

---

## 🗂️ Organizing Tests with `describe`

```javascript
import { describe, test } from 'node:test';
import assert from 'node:assert';

describe('Calculator', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      const result = 2 + 3;
      assert.strictEqual(result, 5);
    });
    
    test('adds negative numbers', () => {
      const result = -2 + -3;
      assert.strictEqual(result, -5);
    });
  });
  
  describe('multiply', () => {
    test('multiplies two numbers', () => {
      const result = 3 * 4;
      assert.strictEqual(result, 12);
    });
  });
});
```

---

## 🎨 Example: Testing a Function

### 📄 `math.js`

```javascript
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}
```

---

## 🧪 Test File: `math.test.js`

```javascript
import { describe, test } from 'node:test';
import assert from 'node:assert';
import { add, multiply, divide } from './math.js';

describe('Math utilities', () => {
  describe('add', () => {
    test('adds positive numbers', () => {
      assert.strictEqual(add(2, 3), 5);
    });
    
    test('adds negative numbers', () => {
      assert.strictEqual(add(-5, -3), -8);
    });
  });
  
  describe('multiply', () => {
    test('multiplies numbers correctly', () => {
      assert.strictEqual(multiply(4, 5), 20);
    });
  });
  
  describe('divide', () => {
    test('divides numbers correctly', () => {
      assert.strictEqual(divide(10, 2), 5);
    });
    
    test('throws error when dividing by zero', () => {
      assert.throws(() => divide(10, 0), {
        message: 'Cannot divide by zero'
      });
    });
  });
});
```

---

## 🏃 Running Tests

### Basic Command

```bash
node --test
```

### Run Specific File

```bash
node --test math.test.js
```

### Watch Mode

```bash
node --test --watch
```

### With Test Pattern

```bash
node --test --test-name-pattern="add"
```

---

## 📊 Test Output

```
✔ Math utilities > add > adds positive numbers (0.5ms)
✔ Math utilities > add > adds negative numbers (0.3ms)
✔ Math utilities > multiply > multiplies numbers correctly (0.2ms)
✔ Math utilities > divide > divides numbers correctly (0.4ms)
✔ Math utilities > divide > throws error when dividing by zero (0.6ms)

ℹ tests 5
ℹ suites 3
ℹ pass 5
ℹ fail 0
ℹ duration_ms 125.3
```

---

## 💡 Best Practices

### ✅ DO

- **Clear names** - Describe what is being tested
- **One assertion per test** - Keep tests focused
- **Independent tests** - No shared state
- **Fast tests** - Avoid slow operations

### ❌ DON'T

- **Test implementation** - Test behavior, not internals
- **Share state** - Each test should be isolated
- **Skip assertions** - Always verify results
- **Write long tests** - Keep them simple

---

## 📁 File Naming Conventions

```
src/
├── math.js
├── math.test.js      ✅ Recommended
├── __tests__/
│   └── math.test.js  ✅ Also good
└── test/
    └── math.test.js  ✅ Works too
```

---

## 🎯 Test Naming Guidelines

```javascript
// ✅ Good - Clear and descriptive
test('returns sum of two positive numbers', () => {});
test('throws error when input is null', () => {});
test('returns empty array when no results found', () => {});

// ❌ Bad - Vague or unclear
test('test1', () => {});
test('works', () => {});
test('checking stuff', () => {});
```

---

[← Previous: Introduction](./01-introduction.md) | [🏠 Home](../README.md) | [Next: Assertions →](./03-assertions.md)
