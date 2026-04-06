# 📦 What is NPM?

## 🎯 Introduction to npm

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### npm = Node Package Manager

Two things in one!

</div>

---

## 🔧 npm is TWO Things

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #333;">

### 1. Command-Line Tool

A tool you use in your terminal to:
- Install packages
- Manage dependencies
- Run scripts
- Publish your own packages

### 2. Online Registry

A massive registry of third-party libraries:
- 🔗 **https://www.npmjs.com/**
- **3.4 million+** packages
- All **free and open-source**
- Anyone can publish packages

</div>

---

## 📊 The npm Registry

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #333;">

### Growth Over Time

```
📦 Started:  ~500,000 packages
📦 2020:     ~2,300,000 packages  
📦 Now:      ~3,400,000 packages! 🚀
```

### What Can You Find?

- Web frameworks (Express, Koa)
- Database drivers (MongoDB, MySQL)
- Utility libraries (Lodash, Moment)
- Testing tools (Jest, Mocha)
- Build tools (Webpack, Babel)
- And millions more!

</div>

> 🔗 **Explore:** Visit [npmjs.com](https://www.npmjs.com/) to search for packages

---

## 🌍 Free and Open Source

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; border-left: 5px solid #4caf50; color: #333;">

### Community-Driven

✅ **Free to use** - All packages are free  
✅ **Open source** - Code is publicly available  
✅ **Community maintained** - Anyone can contribute  
✅ **Anyone can publish** - Share your own code

</div>

---

## 💻 npm is Installed with Node.js

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #333;">

### Check Your Installation

When you installed Node.js, npm was automatically installed!

**Verify in your terminal:**

```bash
~ ➤ npm -v
11.8.0

~ ➤ node -v
v23.5.0
```

If these commands work, you're all set! ✅

</div>

---

## 🔄 Upgrading or Downgrading npm

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #333;">

### Update npm Itself

npm can update itself!

```bash
npm i -g npm@11.8.0
```

**Breaking down the command:**

| Part | Meaning |
|------|---------|
| `npm` | The package manager |
| `i` | Short for `install` |
| `-g` | Global installation (not in current project) |
| `npm` | The package name (yes, npm updates itself!) |
| `@11.8.0` | Optional: specific version |

</div>

---

## 🔑 Command Syntax Pattern

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #333;">

### Understanding npm Commands

```bash
npm i -g package@version
```

This pattern works for **all packages**, not just npm!

### Common Variations

```bash
# Install latest version
npm i package-name

# Install specific version
npm i package-name@1.2.3

# Install globally
npm i -g package-name

# Install as dev dependency
npm i package-name --save-dev
```

</div>

---

## 🍎 Note for Mac/Linux Users

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px; border-left: 5px solid #ff9800; color: #333;">

### Permission Issues

Sometimes you need `sudo` for global installations:

```bash
sudo npm i -g package-name
```

**Better solution:** Configure npm to use a directory you own:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

Add to your `.bashrc` or `.zshrc`:
```bash
export PATH=~/.npm-global/bin:$PATH
```

</div>

---

## 🎨 npm Command Shortcuts

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #333;">

### Save Time with Shortcuts

| Full Command | Shortcut |
|--------------|----------|
| `npm install` | `npm i` |
| `npm install --global` | `npm i -g` |
| `npm install --save-dev` | `npm i -D` |
| `npm uninstall` | `npm un` |
| `npm test` | `npm t` |
| `npm start` | n/a (already short!) |

</div>

---

## 🔍 Exploring the Registry

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #333;">

### How to Find Packages

**1. Visit npmjs.com**
- Search for what you need
- Check download stats
- Read documentation
- View source code

**2. Check Package Quality**
- 📊 Weekly downloads
- ⭐ GitHub stars
- 📅 Last updated date
- 📝 Documentation quality
- 🐛 Open issues

</div>

---

## 💡 What You Can Do with npm

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e3f2fd; color: #333;">
<th style="padding: 15px;">Action</th>
<th style="padding: 15px;">Command</th>
</tr>
<tr>
<td style="padding: 15px;">Install a package</td>
<td style="padding: 15px;"><code>npm i package-name</code></td>
</tr>
<tr style="background-color: #f5f5f5; color: #333;">
<td style="padding: 15px;">Uninstall a package</td>
<td style="padding: 15px;"><code>npm un package-name</code></td>
</tr>
<tr>
<td style="padding: 15px;">Update packages</td>
<td style="padding: 15px;"><code>npm update</code></td>
</tr>
<tr style="background-color: #f5f5f5; color: #333;">
<td style="padding: 15px;">List installed packages</td>
<td style="padding: 15px;"><code>npm list</code></td>
</tr>
<tr>
<td style="padding: 15px;">View package info</td>
<td style="padding: 15px;"><code>npm view package-name</code></td>
</tr>
<tr style="background-color: #f5f5f5; color: #333;">
<td style="padding: 15px;">Publish your package</td>
<td style="padding: 15px;"><code>npm publish</code></td>
</tr>
</table>

---

## 🎯 Key Takeaways

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px; color: #333;">

✅ npm is both a **CLI tool** and a **registry**  
✅ Comes **installed with Node.js**  
✅ Access to **millions of packages**  
✅ All packages are **free and open source**  
✅ Can **update itself** with `npm i -g npm`  
✅ Same syntax for **all package installations**

</div>

---

## 🔜 What's Next?

Now that you know what npm is, let's learn about **package.json** - the configuration file for every Node.js project!

---

<div style="text-align: center; padding: 20px; color: #333;">

[🏠 Course Home](../README.md) | [📘 Chapter 3 Home](./README.md)

[← Previous: Chapter 3 Intro](./README.md) | [Next: package.json →](./02-package-json.md)

</div>
