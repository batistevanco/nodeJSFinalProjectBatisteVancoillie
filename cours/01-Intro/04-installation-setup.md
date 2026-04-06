# 💻 Installation & Setup

## 📥 Installing Node.js

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Node.js Official Website

🔗 **https://nodejs.org/en/**

Download the **LTS (Long Term Support)** version for stability

</div>

---

## 🖥️ Platform-Specific Installation

### 🪟 Windows

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px;">

**Direct Download:**

```
https://nodejs.org/dist/v24.13.0/node-v24.13.0-x64.msi
```

**Steps:**

1. Download the `.msi` installer
2. Run the installer
3. Follow the installation wizard
4. Accept the license agreement
5. Choose installation directory (default is fine)
6. ✅ Complete installation

</div>

---

### 🍎 macOS

<div style="background-color: #f3e5f5; padding: 20px; border-radius: 10px;">

#### Option 1: Official Installer

**For Intel & Apple Silicon (M1/M2/M3):**

```
https://nodejs.org/dist/v24.13.0/node-v24.13.0.pkg
```

#### Option 2: Homebrew (Recommended)

```bash
brew install node
```

**Advantages of Homebrew:**

- ✅ Easy to update
- ✅ Manages dependencies
- ✅ Simple version management

</div>

---

### 🐧 Linux

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px;">

#### Ubuntu/Debian

```bash
sudo apt update
sudo apt install nodejs npm
```

#### Direct Download

```
https://nodejs.org/dist/v24.13.0/node-v24.13.0-linux-x64.tar.xz
```

**Extract and install:**

```bash
tar -xf node-v22.12.0-linux-x64.tar.xz
sudo mv node-v22.12.0-linux-x64 /usr/local/node
export PATH=/usr/local/node/bin:$PATH
```

</div>

---

### 🐳 Docker

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px;">

**Official Node.js Docker Images:**

```bash
# Pull the latest LTS version
docker pull node:lts

# Run a container
docker run -it node:lts
```

🔗 **Docker Hub:** https://hub.docker.com/_/node/

</div>

---

## ✅ Verify Installation

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50;">

After installation, verify that Node.js is correctly installed:

```bash
# Check Node.js version
node --version
# Expected output: v23.5.0 (or similar)

# Check npm version (Node Package Manager)
npm --version
# Expected output: 10.x.x (or similar)
```

### Example Output

```bash
~ ➤ brew install node
Running `brew update --preinstall`...
==> Downloading https://nodejs.org/dist/v23.5.0/node-v23.5.0.tar.gz
...
✅ Installation successful!

~ ➤ node --version
v23.5.0
```

</div>

---

## 🛠️ IDE Setup

### Choosing Your IDE

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px;">

You have **freedom of choice**! Popular options:

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 20px 0;">

<div style="background-color: #007acc; color: white; padding: 15px; border-radius: 8px; text-align: center;">
<strong>VS Code</strong><br/>⭐ Recommended
</div>

<div style="background-color: #000; color: white; padding: 15px; border-radius: 8px; text-align: center;">
<strong>WebStorm</strong><br/>Professional
</div>

<div style="background-color: #4caf50; color: white; padding: 15px; border-radius: 8px; text-align: center;">
<strong>Atom</strong><br/>Lightweight
</div>

<div style="background-color: #ff6b6b; color: white; padding: 15px; border-radius: 8px; text-align: center;">
<strong>Sublime Text</strong><br/>Fast
</div>

<div style="background-color: #fa8231; color: white; padding: 15px; border-radius: 8px; text-align: center;">
<strong>IntelliJ IDEA</strong><br/>Full-featured
</div>

<div style="background-color: #9c27b0; color: white; padding: 15px; border-radius: 8px; text-align: center;">
<strong>Brackets</strong><br/>Web-focused
</div>

</div>

</div>

---

## 🎨 Visual Studio Code (Recommended)

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 15px; color: white;">

### Why VS Code?

- ✅ Free and Open Source
- ✅ Excellent Node.js support
- ✅ Integrated terminal
- ✅ Rich extension ecosystem
- ✅ IntelliSense & debugging

🔗 **Download:** https://code.visualstudio.com/

</div>

---

### 🔌 Essential VS Code Extensions

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">

Install these extensions for optimal Node.js development:

#### Must-Have Extensions

| Extension               | Purpose                          |
| ----------------------- | -------------------------------- |
| 📦 **npm intellisense** | Auto-complete npm modules        |
| 🔍 **ESLint**           | Code quality and error detection |
| 🎨 **Prettier**         | Code formatting                  |
| 🌐 **REST Client**      | Test APIs directly in VS Code    |
| 📝 **Document This**    | Generate JSDoc comments          |

#### How to Install

1. Open VS Code
2. Click Extensions icon (Ctrl+Shift+X)
3. Search for extension name
4. Click "Install"

</div>

---

### ⌨️ Essential VS Code Shortcuts

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px;">

#### Terminal Management

```
Ctrl + `              → Open integrated terminal
Ctrl + Shift + `      → Create new terminal
```

#### Editing

```
Shift + Alt + ↓/↑     → Copy line above/below
Ctrl/Cmd + Shift + L  → Select all instances of selection
Alt + Shift + A       → Toggle block comment
Ctrl/Cmd + /          → Toggle line comment
```

#### General

```
Ctrl + Shift + P      → Command Palette (access all commands)
Ctrl + P              → Quick file open
F2                    → Rename symbol
```

</div>

> 📄 **Full Shortcut Reference:**
>
> - Windows: [keyboard-shortcuts-windows.pdf](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)
> - macOS: [keyboard-shortcuts-macos.pdf](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf)

---

## 📚 Additional Resources

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px;">

### 🎥 Video Tutorial

**Beginners Series to Node.js - Episode 5**  
_How to Setup VS Code for Node.js Development_

🔗 [Microsoft Docs Video Series](https://docs.microsoft.com/en-us/shows/beginners-series-tonodejs/how-to-setup-vs-code-for-nodejs-development-5-of-26)

### 📖 Official Documentation

**VS Code Node.js Tutorial**

🔗 [VS Code Node.js Docs](https://code.visualstudio.com/docs/nodejs/nodejs-tutorial)

</div>

---

## 🔤 JavaScript, TypeScript, or JSDoc?

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

### Understanding Your Options

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #f9d71c;">
<th style="padding: 15px;">JavaScript</th>
<th style="padding: 15px;">TypeScript</th>
<th style="padding: 15px;">JSDoc</th>
</tr>
<tr>
<td style="padding: 15px; background-color: #fff;">

**What you know!**

- From web dev course
- Dynamic typing
- Standard ECMAScript

</td>
<td style="padding: 15px; background-color: #fff;">

**Microsoft's Enhancement**

- Static typing
- Compile-time checks
- Used in Angular
- Own compiler

</td>
<td style="padding: 15px; background-color: #fff;">

**Documentation + Types**

- Markup language
- Type checking via annotations
- No compilation needed
- 🔗 [jsdoc.app](https://jsdoc.app/)

</td>
</tr>
</table>

**In this course:** We'll primarily use **JavaScript** with optional **JSDoc** annotations for better IntelliSense!

</div>

---

## ✅ Installation Checklist

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px;">

Before moving on, make sure you have:

- [ ] ✅ Node.js installed (`node --version` works)
- [ ] ✅ npm installed (`npm --version` works)
- [ ] ✅ VS Code (or your preferred IDE) installed
- [ ] ✅ Essential VS Code extensions installed
- [ ] ✅ Terminal accessible and working

</div>

---

## 🎉 Ready to Code!

<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Your Development Environment is Ready!

Time to create your first Node.js application! 🚀

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 1 Home](./README.md)

[← Previous: Node.js Architecture](./03-nodejs-architecture.md) | [Next: First Application →](./05-first-application.md)

</div>
