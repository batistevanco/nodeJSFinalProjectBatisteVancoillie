# 🌐 Chapter 4: Building RESTful APIs with Express

## 🎯 Chapter Overview

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

### Build Professional Web APIs

Learn Express.js and RESTful API development

</div>

---

## 🤔 What You'll Learn

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; color: #000;">

This chapter covers:

- 🌐 **RESTful APIs** - Architectural style for web services
- ⚡ **Express.js** - Fast, minimalist web framework
- 🛣️ **Routing** - GET, POST, PUT, DELETE endpoints
- 📝 **Request & Response** - Handling HTTP requests
- ✅ **Validation** - Input validation with Joi
- 🔧 **Tools** - Postman, nodemon, environment variables

</div>

---

## 📚 What is a RESTful API?

<div style="background-color: #e3f2fd; padding: 25px; border-radius: 10px; color: #000;">

### REST = Representational State Transfer

A standard way to build web APIs using HTTP methods:

| HTTP Method | Operation | Example |
|-------------|-----------|---------|
| **GET** | Read/Retrieve | Get all courses |
| **POST** | Create | Add new course |
| **PUT** | Update (full) | Update entire course |
| **PATCH** | Update (partial) | Update course name |
| **DELETE** | Remove | Delete course |

</div>

---

## 🗂️ Chapter Slides

<div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; color: #000;">

1. **[Introduction to REST & Express](./01-rest-and-express.md)** - RESTful concepts and setup
2. **[GET Requests](./02-get-requests.md)** - Retrieving data and route parameters
3. **[POST Requests](./03-post-requests.md)** - Creating resources and validation
4. **[PUT & DELETE Requests](./04-put-delete-requests.md)** - Updating and deleting
5. **[Tools & Best Practices](./05-tools-best-practices.md)** - Postman, nodemon, validation

</div>

---

## 💡 Key Concepts

<table style="width: 100%; border-collapse: collapse;">
<tr style="background-color: #e8f5e9; color: #000;">
<th style="padding: 15px;">Concept</th>
<th style="padding: 15px;">Description</th>
</tr>
<tr>
<td style="padding: 15px;"><strong>REST</strong></td>
<td style="padding: 15px;">Architectural style using HTTP methods</td>
</tr>
<tr style="background-color: #f5f5f5; color: #000;">
<td style="padding: 15px;"><strong>Express</strong></td>
<td style="padding: 15px;">Minimal web framework for Node.js</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Endpoint</strong></td>
<td style="padding: 15px;">URL path for API access</td>
</tr>
<tr style="background-color: #f5f5f5; color: #000;">
<td style="padding: 15px;"><strong>Route Parameters</strong></td>
<td style="padding: 15px;">Dynamic parts of URL (e.g., /api/courses/:id)</td>
</tr>
<tr>
<td style="padding: 15px;"><strong>Middleware</strong></td>
<td style="padding: 15px;">Functions that process requests</td>
</tr>
<tr style="background-color: #f5f5f5; color: #000;">
<td style="padding: 15px;"><strong>Validation</strong></td>
<td style="padding: 15px;">Checking input data is correct</td>
</tr>
</table>

---

## 🎯 Learning Objectives

By the end of this chapter, you will:

<div style="background-color: #fff3e0; padding: 20px; border-radius: 10px; color: #000;">

✅ Understand RESTful API principles  
✅ Install and configure Express.js  
✅ Create GET endpoints with route parameters  
✅ Handle POST requests and create resources  
✅ Implement PUT and DELETE operations  
✅ Validate user input with Joi  
✅ Use Postman to test APIs  
✅ Work with environment variables  
✅ Use nodemon for development

</div>

---

## 🛠️ Tools You'll Use

<div style="background-color: #e8f5e9; padding: 25px; border-radius: 10px; color: #000;">

### Development Tools

- 📦 **Express.js** - Web framework
- ✅ **Joi** - Input validation
- 🔄 **nodemon** - Auto-restart on changes
- 📮 **Postman** - API testing tool
- 🔌 **REST Client** - VS Code extension for testing

**Install:**

```bash
npm i express joi
npm i -g nodemon
```

</div>

---

## 🚀 Let's Get Started!

<div style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 30px; border-radius: 15px; color: white; text-align: center;">

Ready to build your first API?

**[Start with REST & Express →](./01-rest-and-express.md)**

</div>

---

<div style="text-align: center; padding: 20px; color: #666;">

[🏠 Course Home](../README.md) | [← Previous: Chapter 3](../03-Node-NPM/README.md) | [Next Chapter: Middleware →](../05-Middleware/README.md)

</div>
