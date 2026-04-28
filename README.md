# Sim Racing League API

## Links

- Live API: [https://simracing-api.onrender.com](https://simracing-api.onrender.com)
- Volledige API-documentatie: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Deploymenthandleiding: [DeploymentGuide.md](./DeploymentGuide.md)
- REST Client testbestand: [tests/api.http](./tests/api.http)

## Projectbeschrijving

Dit project is een Node.js REST API voor een sim racing league. Gebruikers kunnen registreren, inloggen, teams en races bekijken en zich registreren voor races. Admin-gebruikers kunnen users, teams, races en alle registraties beheren.

De API gebruikt Express, MongoDB, Mongoose, JWT-authenticatie, Joi-validatie, Jest, Supertest en REST Client.

## Belangrijkste functies

- Express REST API met meer dan 17 endpoints
- Vier gelinkte MongoDB-collecties: `users`, `teams`, `races`, `registrations`
- JWT-authenticatie met tokens die vervallen
- Role-based authorization met `user` en `admin`
- Ownership-controles voor registraties
- Joi-validatie voor inkomende data
- ObjectId-validatie voor MongoDB reads en writes
- Globale error handling middleware
- Unit- en integratietests
- REST Client bestand voor handmatige API-tests

## Datamodel

De API gebruikt deze gelinkte collecties:

- `User`: accountdata, wachtwoordhash en rol
- `Team`: data van een racing team
- `Race`: racedata met een verwijzing naar `Team`
- `Registration`: koppelt een `User` aan een `Race`

De belangrijkste relaties zijn:

- `Race.team -> Team`
- `Registration.user -> User`
- `Registration.race -> Race`

## Waarom references gebruikt worden

De opdracht vraagt om standaard embedded documents te gebruiken. In dit project gebruik ik toch references voor de belangrijkste relaties, omdat deze data gedeeld wordt tussen meerdere documenten.

- Users staan apart omdat ze authenticatiedata, wachtwoordhashes en rollen bevatten.
- Teams staan apart omdat meerdere races naar hetzelfde team kunnen verwijzen.
- Races staan apart omdat meerdere registraties naar dezelfde race kunnen verwijzen.
- Registrations zijn koppel-documenten tussen users en races. Volledige users of races embedden zou data dupliceren en updates minder betrouwbaar maken.

Daarom passen references beter bij dit datamodel.

## Authenticatie en autorisatie

Gebruikers loggen in via:

```http
POST /api/auth/login
```

De API geeft dan een JWT-token terug. Beveiligde routes verwachten:

```http
Authorization: Bearer YOUR_TOKEN
```

Tokens vervallen na 1 uur. Gewone gebruikers kunnen geen admin-account aanmaken en kunnen hun eigen rol niet verhogen. Admin-only routes gebruiken `authMiddleware` gevolgd door `adminMiddleware`.

Registratieroutes gebruiken ownership-controles:

- gewone gebruikers kunnen alleen hun eigen registraties beheren
- admins kunnen alle registraties beheren

## Overzicht endpoints

Auth:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

Users:

- `GET /api/users`
- `GET /api/users/:id`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

Teams:

- `GET /api/teams`
- `GET /api/teams/:id`
- `POST /api/teams`
- `PUT /api/teams/:id`
- `DELETE /api/teams/:id`

Races:

- `GET /api/races`
- `GET /api/races/:id`
- `POST /api/races`
- `PUT /api/races/:id`
- `DELETE /api/races/:id`

Registrations:

- `GET /api/registrations`
- `GET /api/registrations/:id`
- `POST /api/registrations`
- `PUT /api/registrations/:id`
- `DELETE /api/registrations/:id`

Meer details staan in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## Lokaal opstarten

Installeer de dependencies:

```bash
npm install
```

Maak een `.env` bestand in de root van het project:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start de API:

```bash
npm start
```

Vul de database met seeddata:

```bash
npm run seed
```

Draai de automatische tests:

```bash
npm test
```

## Handmatig testen

Gebruik [tests/api.http](./tests/api.http) met de REST Client extensie.

Seed-accounts:

- Admin: `admin@test.com` / `123456`
- User: `lewis@f1.com` / `123456`

Log in, kopieer het token uit de response, plak het in `@adminToken` of `@userToken` en voer daarna de protected requests uit.

## Deployment

De API is gedeployed op Render en gebruikt MongoDB Atlas als cloud database.

Render configuratie:

- Build command: `npm install`
- Start command: `node server.js`

Vereiste environment variables op Render:

- `MONGO_URL`
- `JWT_SECRET`
- `PORT`

De volledige stap-voor-stap deploymenthandleiding staat in [DeploymentGuide.md](./DeploymentGuide.md).
