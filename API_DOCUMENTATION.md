# API-documentatie

## Base URLs

Lokaal:

```text
http://localhost:3000
```

Live:

```text
https://simracing-api.onrender.com
```

## Authenticatie

Protected routes verwachten een bearer token:

```http
Authorization: Bearer YOUR_TOKEN
```

JWT-tokens vervallen na 1 uur.

## Rollen

- `user`: kan publieke league-data lezen en eigen registratiegegevens beheren
- `admin`: kan users, teams, races en alle registraties beheren

## Root

### `GET /`

Controleert of de API draait.

Succesresponse:

```json
"Sim Racing League API is running..."
```

## Auth

### `POST /api/auth/register`

Maakt een gewone gebruiker aan.

Body:

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "123456"
}
```

Succes:

- `201 Created`

### `POST /api/auth/login`

Logt een gebruiker in en geeft een JWT terug.

Body:

```json
{
  "email": "demo@example.com",
  "password": "123456"
}
```

Succesresponse:

```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### `GET /api/auth/me`

Geeft de huidige ingelogde gebruiker terug.

Auth:

- ingelogde gebruiker

## Users

### `GET /api/users`

Geeft alle gebruikers terug.

Auth:

- alleen admin

### `GET /api/users/:id`

Geeft een specifieke gebruiker terug.

Auth:

- admin of de gebruiker zelf

Mogelijke fouten:

- `400 Invalid user ID`
- `403 Access denied`
- `404 User not found`

### `POST /api/users`

Maakt een gebruiker aan via de admin-route.

Auth:

- alleen admin

Body:

```json
{
  "name": "Admin User",
  "email": "admin2@example.com",
  "password": "123456",
  "role": "admin"
}
```

### `PUT /api/users/:id`

Past een gebruiker aan.

Auth:

- admin of de gebruiker zelf

Opmerkingen:

- gewone gebruikers kunnen hun eigen `role` niet aanpassen
- wachtwoorden worden gehasht voor ze worden opgeslagen

### `DELETE /api/users/:id`

Verwijdert een gebruiker.

Auth:

- alleen admin

## Teams

### `GET /api/teams`

Geeft alle teams terug.

Auth:

- ingelogde gebruiker

### `GET /api/teams/:id`

Geeft een specifiek team terug.

Auth:

- ingelogde gebruiker

### `POST /api/teams`

Maakt een team aan.

Auth:

- alleen admin

Body:

```json
{
  "name": "Ferrari",
  "country": "Italy"
}
```

### `PUT /api/teams/:id`

Past een team aan.

Auth:

- alleen admin

### `DELETE /api/teams/:id`

Verwijdert een team.

Auth:

- alleen admin

## Races

### `GET /api/races`

Geeft alle races terug met gepopuleerde teamdata.

Auth:

- ingelogde gebruiker

### `GET /api/races/:id`

Geeft een specifieke race terug met gepopuleerde teamdata.

Auth:

- ingelogde gebruiker

### `POST /api/races`

Maakt een race aan.

Auth:

- alleen admin

Body:

```json
{
  "name": "Spa GP",
  "track": "Spa-Francorchamps",
  "date": "2026-09-01",
  "team": "TEAM_ID_HERE"
}
```

Validatie:

- `team` moet een geldige ObjectId zijn
- het gekoppelde team moet bestaan

### `PUT /api/races/:id`

Past een race aan.

Auth:

- alleen admin

### `DELETE /api/races/:id`

Verwijdert een race.

Auth:

- alleen admin

## Registrations

### `GET /api/registrations`

Geeft registraties terug.

Auth:

- admin krijgt alle registraties
- gewone gebruikers krijgen alleen hun eigen registraties

### `GET /api/registrations/:id`

Geeft een specifieke registratie terug.

Auth:

- admin of eigenaar

### `POST /api/registrations`

Maakt een registratie aan.

Auth:

- admin kan registraties aanmaken voor elke user
- gewone gebruikers kunnen alleen registraties voor zichzelf aanmaken

Body:

```json
{
  "user": "USER_ID_HERE",
  "race": "RACE_ID_HERE",
  "position": 1
}
```

Validatie:

- `user` moet een geldige ObjectId zijn en moet bestaan
- `race` moet een geldige ObjectId zijn en moet bestaan

### `PUT /api/registrations/:id`

Past een registratie aan.

Auth:

- admin of eigenaar

### `DELETE /api/registrations/:id`

Verwijdert een registratie.

Auth:

- admin of eigenaar

## Algemene foutcodes

- `400 Bad Request`: ongeldige input of ongeldige ObjectId
- `401 Unauthorized`: token ontbreekt, is ongeldig of is vervallen
- `403 Forbidden`: gebruiker is ingelogd maar heeft geen toegang
- `404 Not Found`: document bestaat niet
- `500 Internal Server Error`: onverwachte serverfout
