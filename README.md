# Sim Racing League API

## Beschrijving

Dit project is een REST API gemaakt met Node.js, Express en MongoDB voor het beheren van een sim racing league.
De API bevat authenticatie met JWT en CRUD-functionaliteit voor gebruikers, teams en races.

Het project is opgezet als eindopdracht backend development en is bewust simpel gehouden, zodat de code duidelijk blijft en vlot uitgelegd kan worden.

## Doel van het project

Met deze API kan je:

- gebruikers registreren en inloggen
- beveiligde routes gebruiken met een JWT token
- users beheren
- teams beheren
- races beheren

## Gebruikte technologieën

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Joi
- JSON Web Token
- REST Client voor handmatige tests
- Jest en Supertest voor basis testing
- Render voor deployment

## Projectstructuur

De applicatie is opgesplitst in duidelijke mappen:

- `config/` voor de databaseverbinding
- `models/` voor de Mongoose schema's
- `routes/` voor de API endpoints
- `middleware/` voor authentication middleware
- `validation/` voor Joi-validatie
- `tests/` voor REST Client en Jest tests
- `scripts/` voor seed data

## Hoe het project is opgebouwd

Ik ben begonnen met een basis Express-server en heb daarna de MongoDB connectie toegevoegd.
Vervolgens heb ik de modellen gemaakt voor `User`, `Team` en `Race`.

Daarna heb ik stap voor stap de routes uitgewerkt:

1. eerst authentication
2. daarna users
3. daarna teams
4. daarna races

Nadat de routes werkten, heb ik validatie toegevoegd met Joi en een auth middleware gemaakt voor protected routes.
Als laatste heb ik testrequests toegevoegd in een `.http` bestand en de API online gedeployed op Render.

## Database

De database draait op MongoDB Atlas.
De connectie gebeurt via Mongoose in [config/db.js](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/config/db.js).

In de database worden drie collecties gebruikt:

- `users`
- `teams`
- `races`

### Relaties

Een race verwijst naar een team via een MongoDB ObjectId.

## Authenticatie

De API gebruikt JWT authenticatie.
Bij het inloggen krijgt de gebruiker een token terug.
Dat token moet daarna meegestuurd worden in de header van protected routes:

```http
Authorization: Bearer YOUR_TOKEN
```

De auth routes zitten in [routes/authRoutes.js](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/routes/authRoutes.js) en de middleware staat in [middleware/authMiddleware.js](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/middleware/authMiddleware.js).

## Validatie

Voor inputvalidatie wordt Joi gebruikt.
De validaties staan in:

- [validation/authValidation.js](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/validation/authValidation.js)
- [validation/generalValidation.js](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/validation/generalValidation.js)

Hier worden onder andere volgende zaken gecontroleerd:

- verplichte velden
- minimum lengte van tekst
- geldig emailformaat
- correcte types

Daarnaast wordt in meerdere routes gecontroleerd of een MongoDB ObjectId geldig is vooraleer er een query uitgevoerd wordt.

## Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Users

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

### Teams

- `GET /api/teams`
- `GET /api/teams/:id`
- `POST /api/teams`
- `PUT /api/teams/:id`
- `DELETE /api/teams/:id`

### Races

- `GET /api/races`
- `GET /api/races/:id`
- `POST /api/races`
- `PUT /api/races/:id`
- `DELETE /api/races/:id`

In totaal bevat de API 18 hoofdendpoints voor de opdracht.

## Voorbeeld van gebruik

### 1. Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Batiste",
  "email": "batiste@email.com",
  "password": "test123"
}
```

### 2. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "batiste@email.com",
  "password": "test123"
}
```

### 3. Protected route

```http
GET /api/users
Authorization: Bearer YOUR_TOKEN
```

## Lokaal opstarten

### 1. Repository clonen

```bash
git clone <repository-url>
cd nodeJSFinalProjectBatisteVancoillie
```

### 2. Dependencies installeren

```bash
npm install
```

### 3. `.env` bestand maken

Maak in de root van het project een `.env` bestand aan met:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Opmerking: in de huidige code wordt `MONGO_URL` gebruikt als naam van de databasevariabele.

### 4. Server starten

```bash
npm start
```

Normaal krijg je dan in de terminal iets zoals:

```text
MongoDB connected
Server running on port 3000
```

## Seed script

Om snel testdata in de database te plaatsen is er een seed script voorzien:

```bash
npm run seed
```

Dit script maakt voorbeeldgebruikers, teams en races aan.

## Testing

### REST Client

In [tests/api.http](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/tests/api.http) staan voorbeeldrequests om de API handmatig te testen.

De flow is:

1. register of login uitvoeren
2. token kopiëren
3. token bovenaan in het `.http` bestand invullen
4. daarna de protected routes testen

### Jest en Supertest

Er is ook een basis testbestand aanwezig in [tests/auth.test.js](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/tests/auth.test.js).

Tests starten:

```bash
npm test
```

## Deployment

De API is online gedeployed via Render en gebruikt MongoDB Atlas als cloud database.

Live URL:

[https://simracing-api.onrender.com](https://simracing-api.onrender.com)

Meer uitleg over de deployment staat in [DeploymentGuide.md](/Users/batistevancoillie/Documents/GitHub%20school/nodeJSFinalProjectBatisteVancoillie/DeploymentGuide.md).

## Render configuratie

Voor Render werd deze basisconfiguratie gebruikt:

- Build command: `npm install`
- Start command: `node server.js`
- Environment variables:
- `PORT`
- `MONGO_URL`
- `JWT_SECRET`

## Belangrijke aandachtspunten

- secrets staan niet hardcoded in de code
- protected routes vragen een geldig JWT token
- de API geeft JSON responses terug
- de structuur is bewust eenvoudig gehouden
- de code is opgesplitst per verantwoordelijkheid

## Mogelijke uitbreidingen

Enkele logische uitbreidingen voor later:

- race registrations toevoegen
- rollen zoals admin en user verder uitwerken
- filtering en sorting toevoegen
- pagination toevoegen

## Besluit

Deze API voldoet aan de basis van een backend project met authenticatie, validatie, CRUD-routes en cloud deployment.
Het project is opgezet op een manier die overzichtelijk blijft en die ook mondeling goed uitgelegd kan worden.
