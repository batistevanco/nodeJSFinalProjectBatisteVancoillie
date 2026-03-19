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