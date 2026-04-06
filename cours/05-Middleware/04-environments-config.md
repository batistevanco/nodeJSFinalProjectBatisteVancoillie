# 🌍 Environments & Configuration

## 🎯 Managing Different Environments

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Development, Test, Production

Configure your app for different environments

</div>

---

## 🌐 What are Environments?

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Three Main Environments

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e8f5e9;">
<th style="padding: 15px;">Environment</th>
<th style="padding: 15px;">Purpose</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>Development</strong></td>
<td style="padding: 15px;">Local machine, debugging enabled</td>
</tr>
<tr style="background-color: #f5f5f5;">
<td style="padding: 15px;"><strong>Test</strong></td>
<td style="padding: 15px;">Running automated tests</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Production</strong></td>
<td style="padding: 15px;">Live server, optimized for performance</td>
</tr>
</table>

### Why Different Environments?

- Different database connections
- Enable/disable logging
- Debug vs optimized builds
- Different API keys

</div>

---

## 🔍 process.env.NODE_ENV

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Checking the Environment

```javascript
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app.get('env'): ${app.get('env')}`);
```

**Output (default):**
```
NODE_ENV: undefined
app.get('env'): development
```

### Key Difference

- `process.env.NODE_ENV` - Can be undefined
- `app.get('env')` - Defaults to 'development'

</div>

---

## ⚙️ Setting NODE_ENV

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Different Platforms

**Mac/Linux:**
```bash
export NODE_ENV=production
nodemon index.js
```

**Windows CMD:**
```cmd
set NODE_ENV=production
nodemon index.js
```

**Windows PowerShell:**
```powershell
$Env:NODE_ENV = "production"
nodemon index.js
```

**Output:**
```
NODE_ENV: production
app.get('env'): production
```

</div>

---

## 📊 Environment-Dependent Logging

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Only Log in Development

```javascript
const express = require('express');
const morgan = require('morgan');
const app = express();

// Only use morgan in development
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(3000);
```

**Development:**
```
Morgan enabled...
Listening on port 3000...
GET / 200 - 2.059 ms
```

**Production:**
```
Listening on port 3000...
(no morgan logs)
```

</div>

---

## ⚙️ Configuration Management with config

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### The config Package

Most popular: **rc**  
More user-friendly: **config**

### Installation

```bash
npm i config
```

### Directory Structure

```
project/
├── config/
│   ├── default.json
│   ├── development.json
│   └── production.json
├── index.js
└── package.json
```

</div>

---

## 📄 Configuration Files

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### config/default.json

```json
{
  "name": "My Express App"
}
```

### config/development.json

```json
{
  "name": "My Express App - Development",
  "mail": {
    "host": "dev-mail-server"
  }
}
```

### config/production.json

```json
{
  "name": "My Express App - Production",
  "mail": {
    "host": "prod-mail-server"
  }
}
```

</div>

---

## 🔧 Using config in Your App

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### index.js

```javascript
const config = require('config');

console.log('Application Name:', config.get('name'));
console.log('Mail Host:', config.get('mail.host'));
```

**Development:**
```bash
Application Name: My Express App - Development
Mail Host: dev-mail-server
```

**Production (export NODE_ENV=production):**
```bash
Application Name: My Express App - Production
Mail Host: prod-mail-server
```

### How It Works

1. Loads `default.json`
2. Loads environment-specific file
3. Merges them (environment overrides default)

</div>

---

## 🔐 Storing Secrets Securely

<div style="background-color: #ffebee; padding: 25px; border-radius: 10px; border-left: 5px solid #f44336; color: #1a1a1a;">

### ⚠️ NEVER Store Passwords in Config Files!

**❌ Bad Practice:**
```json
{
  "mail": {
    "password": "supersecret123"
  }
}
```

Config files get committed to git!

### ✅ Use Environment Variables

```bash
export app_password=1234
```

</div>

---

## 🔒 custom-environment-variables.json

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #1a1a1a;">

### Map Environment Variables

**config/custom-environment-variables.json:**

```json
{
  "mail": {
    "password": "app_password"
  }
}
```

**Set environment variable:**
```bash
export app_password=1234
```

**Access in code:**
```javascript
const config = require('config');
console.log('Password:', config.get('mail.password'));
```

**Output:**
```
Password: 1234
```

### Security Benefits

✅ Passwords not in code  
✅ Not committed to git  
✅ Different per environment

</div>

---

## 💡 Best Practices

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid #4caf50; color: #1a1a1a;">

### Configuration Guidelines

✅ **DO:** Use environment variables for secrets  
✅ **DO:** Use config package for settings  
✅ **DO:** Have separate configs per environment  
✅ **DO:** Set NODE_ENV in production  
✅ **DO:** Add config files to .gitignore if they contain secrets

❌ **DON'T:** Commit passwords to git  
❌ **DON'T:** Hardcode environment-specific values  
❌ **DON'T:** Use same config for all environments  
❌ **DON'T:** Expose secrets in error messages

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 5 Home](./README.md)

[← Previous: Third-party Middleware](./03-third-party-middleware.md) | [Next: Templating & Structure →](./05-templating-structure.md)

</div>
