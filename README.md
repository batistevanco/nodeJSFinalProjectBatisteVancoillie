# Sim Racing League API

## Beschrijving

Dit project is een REST API gemaakt met Node.js, Express en MongoDB voor het beheren van een sim racing league.
De API bevat authenticatie met JWT en CRUD-functionaliteit voor gebruikers, teams, races en registraties.

Het project is opgezet als eindopdracht backend development en is bewust simpel gehouden, zodat de code duidelijk blijft en vlot uitgelegd kan worden.

## Doel van het project

Met deze API kan je:

- gebruikers registreren en inloggen
- beveiligde routes gebruiken met een JWT token
- users beheren
- teams beheren
- races beheren
- registraties beheren

## Gebruikte technologieën

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Joi
- JSON Web Token
- REST Client voor handmatige tests
- Jest en Supertest voor testing
- Render voor deployment

## Projectstructuur

De applicatie is opgesplitst in duidelijke mappen:

- `config/` voor de databaseverbinding
- `models/` voor de Mongoose schema's
- `routes/` voor de API endpoints
- `middleware/` voor authentication en authorization middleware
- `validation/` voor Joi-validatie
- `tests/` voor REST Client en Jest tests
- `scripts/` voor seed data

## Hoe het project is opgebouwd

Ik ben begonnen met een basis Express-server en heb daarna de MongoDB connectie toegevoegd.
Vervolgens heb ik de modellen gemaakt voor `User`, `Team`, `Race` en `Registration`.

Daarna heb ik stap voor stap de routes uitgewerkt:

1. eerst authentication
2. daarna users
3. daarna teams
4. daarna races
5. daarna registrations

Nadien heb ik validatie toegevoegd met Joi, een auth middleware gemaakt voor protected routes en een admin middleware voor authorisatie.
Daarna heb ik de foutafhandeling verbeterd en tests toegevoegd.

## Database

De database draait op MongoDB Atlas.
De connectie gebeurt via Mongoose in [config/db.js](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/config/db.js).

In de database worden vier collecties gebruikt:

- `users`
- `teams`
- `races`
- `registrations`

## Authenticatie en authorisatie

De API gebruikt JWT authenticatie.
Bij het inloggen krijgt de gebruiker een token terug.
Dat token moet daarna meegestuurd worden in de header van protected routes:

```http
Authorization: Bearer YOUR_TOKEN



De auth routes zitten in routes/authRoutes.js.

De middleware staat in:

middleware/authMiddleware.js
middleware/adminMiddleware.js
Er wordt gewerkt met rollen via het role veld in de user collectie.
Een gewone gebruiker krijgt standaard de rol user.
Admin-routes controleren expliciet of de ingelogde gebruiker de rol admin heeft.

Validatie
Voor inputvalidatie wordt Joi gebruikt.
De validaties staan in:

validation/authValidation.js
validation/generalValidation.js
Hier worden onder andere volgende zaken gecontroleerd:

verplichte velden
minimum lengte van tekst
geldig emailformaat
correcte types
geldige rolwaarden
geldige update bodies
Daarnaast wordt in meerdere routes gecontroleerd of een MongoDB ObjectId geldig is vooraleer er een query uitgevoerd wordt.

Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
Users
GET /api/users
GET /api/users/:id
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
Teams
GET /api/teams
GET /api/teams/:id
POST /api/teams
PUT /api/teams/:id
DELETE /api/teams/:id
Races
GET /api/races
GET /api/races/:id
POST /api/races
PUT /api/races/:id
DELETE /api/races/:id
Registrations
GET /api/registrations
GET /api/registrations/:id
POST /api/registrations
PUT /api/registrations/:id
DELETE /api/registrations/:id
In totaal bevat de API 23 hoofdendpoints inclusief root en test endpoint, en 18 CRUD/auth endpoints die rechtstreeks relevant zijn voor de opdracht.

Lokaal opstarten
1. Repository clonen
git clone <repository-url>
cd nodeJSFinalProjectBatisteVancoillie
2. Dependencies installeren
npm install
3. .env bestand maken
Maak in de root van het project een .env bestand aan met:

PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Server starten
npm start
Normaal krijg je dan in de terminal iets zoals:

MongoDB connected
Server running on port 3000
Testing
REST Client
In tests/api.http staan voorbeeldrequests om de API handmatig te testen.

Jest en Supertest
Er is ook een testbestand aanwezig in tests/auth.test.js.

Tests starten:

npm test
Deployment
De API is online gedeployed via Render en gebruikt MongoDB Atlas als cloud database.

Live URL:

https://simracing-api.onrender.com

Volledige API-documentatie:

API_DOCUMENTATION.md

Deployment guide:

DeploymentGuide.md

Render configuratie
Voor Render werd deze configuratie gebruikt:

Build command: npm install
Start command: node server.js
Besluit
Deze API voldoet aan de basisvereisten van een Node.js REST API met authentication, authorization, validatie, MongoDB-persistentie en testing.
Ze is online beschikbaar, lokaal reproduceerbaar en gedocumenteerd.


**Nieuw: `API_DOCUMENTATION.md`**
```md
# API Documentation

## Base URL

Lokaal:

```text
http://localhost:3000
Online:

https://simracing-api.onrender.com
Authentication
Gebruik voor protected routes een bearer token:

Authorization: Bearer YOUR_TOKEN
Roles
De applicatie gebruikt rollen via het role veld op een gebruiker.

Mogelijke waarden:

user
admin
Bepaalde routes zijn alleen toegankelijk voor admins.

Endpoints
Root

GET /
Response:

"Sim Racing League API is running..."
Auth
POST /api/auth/register
Beschrijving:
Nieuwe gebruiker registreren.

Body:

{
  "name": "Batiste",
  "email": "batiste@email.com",
  "password": "test123"
}
Succes:

201 Created
Response:

{
  "message": "User created successfully"
}
POST /api/auth/login
Beschrijving:
Gebruiker inloggen en JWT ontvangen.

Body:

{
  "email": "batiste@email.com",
  "password": "test123"
}
Succes:

200 OK
Response:

{
  "message": "Login successful",
  "token": "jwt_token_here"
}
GET /api/auth/me
Beschrijving:
Ingelogde gebruiker ophalen.

Auth:

vereist token
Succes:

200 OK
Response:

{
  "message": "Protected user data",
  "user": {
    "_id": "user_id",
    "name": "Batiste",
    "email": "batiste@email.com",
    "role": "user"
  }
}
Users
GET /api/users
Beschrijving:
Alle gebruikers ophalen.

Auth:

admin only
Succes:

200 OK
GET /api/users/:id
Beschrijving:
Specifieke gebruiker ophalen.

Auth:

admin of de gebruiker zelf
Succes:

200 OK
Mogelijke fouten:

400 Invalid user ID
403 Access denied
404 User not found
POST /api/users
Beschrijving:
Nieuwe gebruiker aanmaken via admin-route.

Auth:

admin only
Body:

{
  "name": "Admin User",
  "email": "admin@test.com",
  "password": "123456",
  "role": "admin"
}
Succes:

201 Created
PUT /api/users/:id
Beschrijving:
Gebruiker updaten.

Auth:

admin of de gebruiker zelf
Body voorbeeld:

{
  "name": "Updated Name"
}
Succes:

200 OK
Mogelijke fouten:

400 Invalid user ID
400 Validatiefout
403 Access denied
404 User not found
DELETE /api/users/:id
Beschrijving:
Gebruiker verwijderen.

Auth:

admin only
Succes:

200 OK
Response:

{
  "message": "User deleted"
}
Teams
GET /api/teams
Beschrijving:
Alle teams ophalen.

Auth:

ingelogde gebruiker
Succes:

200 OK
GET /api/teams/:id
Beschrijving:
Specifiek team ophalen.

Auth:

ingelogde gebruiker
Succes:

200 OK
POST /api/teams
Beschrijving:
Nieuw team aanmaken.

Auth:

admin only
Body:

{
  "name": "Red Bull Racing",
  "country": "Austria"
}
Succes:

201 Created
PUT /api/teams/:id
Beschrijving:
Team updaten.

Auth:

admin only
Body:

{
  "name": "Updated Team"
}
Succes:

200 OK
DELETE /api/teams/:id
Beschrijving:
Team verwijderen.

Auth:

admin only
Succes:

200 OK
Response:

{
  "message": "Team deleted"
}
Races
GET /api/races
Beschrijving:
Alle races ophalen.

Auth:

ingelogde gebruiker
Succes:

200 OK
GET /api/races/:id
Beschrijving:
Specifieke race ophalen.

Auth:

ingelogde gebruiker
Succes:

200 OK
POST /api/races
Beschrijving:
Nieuwe race aanmaken.

Auth:

admin only
Body:

{
  "name": "Spa GP",
  "track": "Spa-Francorchamps",
  "date": "2026-04-01",
  "team": "TEAM_ID_HERE"
}
Succes:

201 Created
PUT /api/races/:id
Beschrijving:
Race updaten.

Auth:

admin only
Body:

{
  "name": "Updated Race"
}
Succes:

200 OK
DELETE /api/races/:id
Beschrijving:
Race verwijderen.

Auth:

admin only
Succes:

200 OK
Response:

{
  "message": "Race deleted"
}
Registrations
GET /api/registrations
Beschrijving:
Alle registraties ophalen.

Auth:

ingelogde gebruiker
Succes:

200 OK
GET /api/registrations/:id
Beschrijving:
Specifieke registratie ophalen.

Auth:

ingelogde gebruiker
Succes:

200 OK
POST /api/registrations
Beschrijving:
Nieuwe registratie aanmaken.

Auth:

ingelogde gebruiker
Body:

{
  "user": "USER_ID_HERE",
  "race": "RACE_ID_HERE",
  "position": 1
}
Succes:

201 Created
PUT /api/registrations/:id
Beschrijving:
Registratie updaten.

Auth:

ingelogde gebruiker
Body:

{
  "position": 2
}
Succes:

200 OK
DELETE /api/registrations/:id
Beschrijving:
Registratie verwijderen.

Auth:

ingelogde gebruiker
Succes:

200 OK
Response:

{
  "message": "Registration deleted"
}
Algemene foutcodes
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
