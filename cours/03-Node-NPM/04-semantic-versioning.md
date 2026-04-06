# 🔢 Semantic Versioning

## 🎯 Understanding Version Numbers

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### SemVer: Major.Minor.Patch

Learn to read and manage package versions

</div>

---

## 📊 What is Semantic Versioning?

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #333;">

### Version Format

```
^1.8.3
```

Breaking it down:

| Symbol | Version | Type | Meaning |
|--------|---------|------|---------|
| `^` | **Caret** | Modifier | Compatible updates allowed |
| `1` | **Major** | Breaking | Incompatible API changes |
| `8` | **Minor** | Feature | New features (backwards-compatible) |
| `3` | **Patch** | Fix | Bug fixes (backwards-compatible) |

</div>

---

## 🔄 Version Modifiers

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #333;">

### Caret (^) - Default

```json
"underscore": "^1.8.3"
```

**Allows:** Minor and patch updates
- ✅ 1.8.4 (patch)
- ✅ 1.9.0 (minor)
- ❌ 2.0.0 (major - breaking)

---

### Tilde (~) - More Restrictive

```json
"underscore": "~1.8.3"
```

**Allows:** Only patch updates
- ✅ 1.8.4 (patch)
- ❌ 1.9.0 (minor)
- ❌ 2.0.0 (major)

---

### Exact Version - Most Restrictive

```json
"underscore": "1.8.3"
```

**Allows:** Nothing - only this exact version

</div>

---

## 📈 Version Number Meanings

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #333;">

### Major Version (1.x.x)

**Breaking changes** that are NOT backwards-compatible

```
1.8.3 → 2.0.0
```

**Examples:**
- Removed functions
- Changed API signatures
- Renamed modules
- Different behavior

⚠️ **May break your code!**

---

### Minor Version (x.8.x)

**New features** that ARE backwards-compatible

```
1.8.3 → 1.9.0
```

**Examples:**
- New functions added
- New optional parameters
- Performance improvements
- New features

✅ **Safe to update**

---

### Patch Version (x.x.3)

**Bug fixes** that don't add features

```
1.8.3 → 1.8.4
```

**Examples:**
- Security fixes
- Bug fixes
- Documentation updates

✅ **Should always update**

</div>

---

## 📖 Alternative Notation

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #333;">

### Using X for Wildcards

Sometimes you'll see:

```json
"package": "1.x"
```

This is equivalent to:

```json
"package": "^1.0.0"
```

**Meaning:** Any version 1.x.x

</div>

---

## 🔍 Checking Versions

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #333;">

### In package.json

Look at your dependencies:

```json
{
  "dependencies": {
    "express": "^5.2.1",
    "mongoose": "~9.2.1",
    "lodash": "4.17.23"
  }
}
```

---

### With npm list

```bash
milan@npm-demo〽 npm list
npm-demo@1.0.0 /Users/milan/Dev/nodeVb/npm-demo
├── mongoose@9.2.1
└── underscore@1.13.8
```

**With depth:**

```bash
milan@npm-demo〽 npm list --depth=1
npm-demo@1.0.0 /Users/milan/Dev/nodeVb/npm-demo
├─┬ mongoose@9.2.1
│ ├── bson@6.10.3
│ ├── mongodb@6.15.0
│ └── ...
└── underscore@1.13.8
```

</div>

---

## 📦 View Package Information

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #333;">

### npm view

Get detailed package information:

```bash
milan@npm-demo〽 npm view mongoose

mongoose@9.2.1 | MIT | deps: 4 | versions: 1050
Mongoose MongoDB ODM
https://mongoosejs.com

dependencies:
bson: ^6.10.3
mongodb: ~6.15.0
mpath: ^0.9.0
...
```

---

### View Just Dependencies

```bash
milan@npm-demo〽 npm view mongoose dependencies

{
  'bson': '^6.10.3',
  'mongodb': '~6.15.0',
  'mpath': '^0.9.0',
  ...
}
```

---

### View All Versions

```bash
milan@npm-demo〽 npm view mongoose versions

[
  '0.0.1',
  '0.0.2',
  '0.0.3',
  ...
  '8.13.2',
  '9.2.1'
]
```

</div>

---

## 🎯 Best Practices

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50; color: #333;">

### Version Management

✅ **DO:** Use `^` for most dependencies (allows minor updates)  
✅ **DO:** Read changelog before major updates  
✅ **DO:** Test after updating dependencies  
✅ **DO:** Keep dependencies reasonably up-to-date  

❌ **DON'T:** Use exact versions unless necessary  
❌ **DON'T:** Update major versions without testing  
❌ **DON'T:** Ignore security updates  
❌ **DON'T:** Let dependencies get too old

</div>

---

## 📊 Quick Reference

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e3f2fd; color: #333;">
<th style="padding: 15px;">Notation</th>
<th style="padding: 15px;">Updates Allowed</th>
<th style="padding: 15px;">Example</th>
</tr>
<tr>
<td style="padding: 15px;"><code>^1.8.3</code></td>
<td style="padding: 15px;">Minor & Patch</td>
<td style="padding: 15px;">1.8.3 → 1.9.5 ✅</td>
</tr>
<tr style="background-color: #f5f5f5; color: #333;">
<td style="padding: 15px;"><code>~1.8.3</code></td>
<td style="padding: 15px;">Patch only</td>
<td style="padding: 15px;">1.8.3 → 1.8.9 ✅</td>
</tr>
<tr>
<td style="padding: 15px;"><code>1.8.3</code></td>
<td style="padding: 15px;">None</td>
<td style="padding: 15px;">Only 1.8.3</td>
</tr>
<tr style="background-color: #f5f5f5; color: #333;">
<td style="padding: 15px;"><code>*</code></td>
<td style="padding: 15px;">All</td>
<td style="padding: 15px;">Latest version ⚠️</td>
</tr>
</table>

---

<div style="text-align: center; padding: 20px; color: #333;">

[🏠 Course Home](../README.md) | [📘 Chapter 3 Home](./README.md)

[← Previous: Installing Packages](./03-installing-packages.md) | [Next: Managing Dependencies →](./05-managing-dependencies.md)

</div>
