Sim Racing League API

Beschrijving

Dit project is een REST API ontwikkeld met Node.js en Express voor het beheren van sim racing leagues en race-events.

Gebruikers kunnen zich registreren, inloggen, deelnemen aan leagues, zich inschrijven voor races en race-resultaten bekijken.

De API is opgebouwd volgens moderne backend best practices en gebruikt MongoDB als database.

Functionaliteiten
	•	Registreren en inloggen van gebruikers
	•	Authenticatie met JSON Web Tokens (JWT)
	•	CRUD-operaties voor leagues
	•	CRUD-operaties voor race-events
	•	Inschrijven voor races
	•	Race resultaten beheren
	•	Inputvalidatie met Joi
	•	Error handling via middleware
	•	API testen via REST Client in Visual Studio Code

Technologieën
	•	Node.js
	•	Express.js
	•	MongoDB
	•	Mongoose
	•	Joi (inputvalidatie)
	•	JSON Web Tokens (JWT)
	•	REST Client (VS Code)

Projectstructuur

config
databaseconfiguratie

models
Mongoose schema’s voor de database

routes
API endpoints

middleware
authenticatie en error handling

validation
validatieschema’s voor inputdata

tests
unit- en integratietests

Testing

Alle API endpoints worden getest via een .http bestand met de REST Client extensie in Visual Studio Code.

Requests worden gescheiden met ###.





## Live API
https://simracing-api.onrender.com

## Test login
POST /api/auth/login

Body:
{
  "email": "admin@test.com",
  "password": "123456"
}

## Endpoints

### Auth
POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/me  

---

### Users
GET /api/users  
GET /api/users/:id  
POST /api/users  
PUT /api/users/:id  
DELETE /api/users/:id  

---

### Teams
GET /api/teams  
GET /api/teams/:id  
POST /api/teams  
PUT /api/teams/:id  
DELETE /api/teams/:id  

---

### Races
GET /api/races  
GET /api/races/:id  
POST /api/races  
PUT /api/races/:id  
DELETE /api/races/:id  


### Hoe testen

1. Login via /api/auth/login
2. Kopieer token
3. Gebruik Authorization header:

Authorization: Bearer TOKEN