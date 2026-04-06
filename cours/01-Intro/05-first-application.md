# 🚀 Your First Node.js Application

## 🏗️ Project Setup

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px;">

### Creating Your Project

Let's create your first Node.js application step by step:

```bash
# Create a new directory for your project
mkdir first-app

# Navigate into the directory
cd first-app

# Open VS Code in the current directory
code .
```

</div>

---

## 📝 Creating app.js

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px; border-left: 5px solid #4caf50;">

### Step 1: Create the File

In VS Code, create a new file called `app.js`

### Step 2: Write Your First Code

```javascript
function sayHello(name) {
    console.log('Hello ' + name);
}

sayHello('Vives');
```

### Step 3: Run Your Application

Open the integrated terminal (Ctrl + \`) and run:

```bash
node app.js
```

### Expected Output

```bash
milan@first-app〽 node app.js
Hello Vives
milan@first-app〽
```

</div>

---

## 🎉 Congratulations!

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### You Just Ran Your First Node.js Application! 🎊

This simple program demonstrates that you can run JavaScript **outside the browser** using Node.js!

</div>

---

## 🧪 Try This Experiment

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px; border-left: 5px solid #ff9800;">

### Testing Browser-Specific Objects

Add this line to your `app.js`:

```javascript
console.log(window);
```

**Now run the application again:**

```bash
node app.js
```

### What Happens?

```bash
ReferenceError: window is not defined
```

**Why?** 🤔

The `window` object only exists in **browsers**, not in Node.js!

This proves that Node.js is a **different runtime environment** from the browser.

</div>

---

## 🔍 Understanding the Difference

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e3f2fd;">
<th style="padding: 15px;">🌐 Browser Environment</th>
<th style="padding: 15px;">🟢 Node.js Environment</th>
</tr>
<tr>
<td style="padding: 15px; background-color: #fff;">

**Available Objects:**
```javascript
window
document
navigator
localStorage
```

**Purpose:**
- DOM manipulation
- User interactions
- Web APIs

</td>
<td style="padding: 15px; background-color: #fff;">

**Available Objects:**
```javascript
process
global
module
require
fs (file system)
```

**Purpose:**
- File operations
- Server creation
- System interactions

</td>
</tr>
</table>

---

## 💡 Code Explanation

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">

Let's break down the code:

```javascript
// 1. Function Declaration
function sayHello(name) {
    // 2. Output to console
    console.log('Hello ' + name);
}

// 3. Function Call
sayHello('Vives');
```

**Line by Line:**

| Line | What It Does |
|------|--------------|
| `function sayHello(name)` | Declares a function named `sayHello` that accepts one parameter |
| `console.log('Hello ' + name)` | Prints text to the console (terminal) |
| `sayHello('Vives')` | Calls the function with the argument `'Vives'` |

</div>

---

## 🎨 Making It Better

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px;">

### Modern JavaScript Syntax

Let's improve our code with **ES6+ features**:

```javascript
// Using arrow function
const sayHello = (name) => {
    console.log(`Hello ${name}!`); // Template literal
}

sayHello('Vives');

// Even shorter!
const greet = name => console.log(`Hello ${name}!`);
greet('Node.js');
```

### With JSDoc Documentation

```javascript
/**
 * Prints a greeting message to the console
 * @param {string} name - The name to greet
 */
function sayHello(name) {
    console.log(`Hello ${name}!`);
}

sayHello('Vives');
```

</div>

---

## 📚 Lab Exercise

<div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 15px; color: white;">

### 🎯 Student Group Assignment

**Task:** Write a program that divides students into 7 different groups based on their date of birth.

**Download:** Get the starter code from **GitHub Classroom** (link on Toledo)

</div>

---

### 📋 Lab Requirements

<div style="background-color: #f5f5f5; padding: 25px; border-radius: 10px;">

#### ✅ Basic Version

Create `groepen.js`:

```javascript
// Hardcoded date of birth
const dateOfBirth = 20201010; // YYYYMMDD format

// Calculate group number (0-6) using modulus
const groupNumber = dateOfBirth % 7;

console.log(`You are assigned to group ${groupNumber}`);
```

**Expected Output:**
```bash
milan@first-app〽 node groepen.js
You are assigned to group 5
```

</div>

---

### 🌟 Extra 1: User Input

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px;">

Make the program **interactive** by asking for user input:

```javascript
// Import readline module for user input
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask for user input
rl.question('Insert date of birth (YYYYMMDD): ', (dateOfBirth) => {
    const groupNumber = dateOfBirth % 7;
    console.log(`You are assigned to group ${groupNumber}`);
    rl.close();
});
```

**Expected Output:**
```bash
milan@first-app〽 node groepen.js
Insert date of birth (YYYYMMDD): 20201010
You are assigned to group 5
milan@first-app〽
```

</div>

---

### 🎨 Extra 2: Switch Statement with Quotes

<div style="background-color: #fff3e0; padding: 25px; border-radius: 10px;">

Add a **quote of the day** based on the group number:

```javascript
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Insert date of birth (YYYYMMDD): ', (dateOfBirth) => {
    const groupNumber = dateOfBirth % 7;
    console.log(`You are assigned to group ${groupNumber}`);
    console.log('Your quote of the day is:');
    
    switch(groupNumber) {
        case 0:
            console.log('Lorem ipsum dolor sit amet...');
            break;
        case 1:
            console.log('Consectetur adipiscing elit...');
            break;
        case 2:
            console.log('Sed do eiusmod tempor incididunt...');
            break;
        case 3:
            console.log('Ut labore et dolore magna aliqua...');
            break;
        case 4:
            console.log('Duis aute irure dolor in reprehenderit...');
            break;
        case 5:
            console.log('Sed ut perspiciatis unde omnis iste natus error...');
            break;
        case 6:
            console.log('Nemo enim ipsam voluptatem...');
            break;
        default:
            console.log('No quote available');
    }
    
    rl.close();
});
```

</div>

---

### 📤 Expected Output (Extra 2)

```bash
milan@first-app〽 node groepen-switch.js
Insert date of birth (YYYYMMDD): 20201010
You are assigned to group 5
Your quote of the day is:
Sed ut perspiciatis unde omnis iste natus error sit
voluptatem accusantium doloremque laudantium, totam rem
aperiam, eaque ipsa quae ab illo inventore veritatis et
quasi architecto beatae vitae dicta sunt explicabo.
milan@first-app〽
```

---

## 💡 Learning Points

<div style="background-color: #e8f5e9; padding: 20px; border-radius: 10px;">

### What You've Learned

✅ **Running Node.js applications** from the command line  
✅ **Understanding Node.js runtime** vs browser environment  
✅ **Basic JavaScript syntax** in Node.js  
✅ **User input handling** with readline module  
✅ **Modulus operator** for mathematical operations  
✅ **Control flow** with switch statements

</div>

---

## 🔧 Debugging Tips

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px; border-left: 5px solid #ff9800;">

### Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| `node: command not found` | Node.js not installed or not in PATH |
| `Cannot find module 'readline'` | This is a core module, no installation needed |
| `ReferenceError: variable is not defined` | Check variable spelling and declaration |
| Output not showing | Make sure you're calling the function |

### Using VS Code Debugger

1. Set a breakpoint (click left of line number)
2. Press `F5` to start debugging
3. Step through code with `F10` (Step Over)
4. Inspect variables in Debug panel

</div>

---

## 🎯 Challenge Yourself

<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 25px; border-radius: 15px; color: white;">

### Additional Exercises

Try these to practice:

1. **Modify the program** to use groups 1-7 instead of 0-6
2. **Add validation** to ensure date is in correct format
3. **Create a function** that checks if the date is valid
4. **Add colors** to console output using ANSI codes
5. **Save group assignments** to a file using the `fs` module

</div>

---

## 📚 Additional Resources

<div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px;">

### Want to Learn More?

- 📖 **Node.js Documentation**: [nodejs.org/docs](https://nodejs.org/docs/)
- 🎥 **Node.js Tutorial for Beginners**: YouTube search
- 💻 **Practice**: Try modifying the examples
- 👥 **Forum**: Ask questions on Toledo

</div>

---

## ✅ Completion Checklist

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px;">

Before moving to the next chapter:

- [ ] ✅ Created and ran `app.js` successfully
- [ ] ✅ Understood why `window` is not available in Node.js
- [ ] ✅ Completed the basic lab (group assignment)
- [ ] ✅ (Optional) Completed Extra 1 with user input
- [ ] ✅ (Optional) Completed Extra 2 with switch statement
- [ ] ✅ Pushed your code to GitHub

</div>

---

## 🎊 Well Done!

<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### You've Completed Chapter 1! 🎉

You now understand:
- ✅ What Node.js is and why it's powerful
- ✅ How Node.js works (architecture & async)
- ✅ How to install and set up your environment
- ✅ How to create and run Node.js applications

**Next Chapter:** We'll dive deeper into Node.js modules and npm! 🚀

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [📘 Chapter 1 Home](./README.md)

[← Previous: Installation & Setup](./04-installation-setup.md) | [Next Chapter: Node Modules →](../02-Node-Module-System/README.md)

</div>

