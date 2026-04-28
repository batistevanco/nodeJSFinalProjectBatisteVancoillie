# Deploymenthandleiding

Deze handleiding legt stap voor stap uit hoe de Sim Racing League API online gezet wordt met MongoDB Atlas en Render.

## 1. MongoDB Atlas database aanmaken

1. Ga naar [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Maak een account aan of log in.
3. Maak een gratis cluster aan.
4. Ga naar `Database Access` en maak een database user aan.
5. Ga naar `Network Access` en geef Render toegang. Voor een eenvoudige schoolproject-setup kan `0.0.0.0/0` gebruikt worden.
6. Ga naar `Connect`, kies `Drivers` en kopieer de MongoDB connection string.

Voorbeeld:

```text
mongodb+srv://username:password@cluster.mongodb.net/simracing
```

## 2. De app lokaal testen

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

Als alles correct ingesteld is, toont de terminal:

```text
MongoDB connected
Server running on port 3000
```

Vul de database met seeddata:

```bash
npm run seed
```

Draai de tests:

```bash
npm test
```

## 3. Het project naar GitHub pushen

Commit en push het project naar de GitHub Classroom repository.

Zorg dat deze bestanden aanwezig zijn:

- applicatiecode
- `README.md`
- `API_DOCUMENTATION.md`
- `DeploymentGuide.md`
- `tests/api.http`
- automatische tests

Commit het `.env` bestand niet.

## 4. Render Web Service aanmaken

1. Ga naar [Render](https://render.com).
2. Log in met GitHub.
3. Kies `New`.
4. Kies `Web Service`.
5. Selecteer de GitHub Classroom repository.

Gebruik deze configuratie:

- Runtime: `Node`
- Build command: `npm install`
- Start command: `node server.js`

## 5. Environment variables toevoegen op Render

Voeg deze environment variables toe in het Render dashboard:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

Render kan ook zelf een poort voorzien via `process.env.PORT`. De code ondersteunt dat met:

```js
const PORT = process.env.PORT || 3000;
```

## 6. Deploy uitvoeren

Klik op deploy of laat Render automatisch deployen na een push naar GitHub.

Controleer de Render logs. Bij een geslaagde deploy zie je dat de dependencies geinstalleerd zijn en dat de server gestart is.

## 7. Live API testen

Live API:

[https://simracing-api.onrender.com](https://simracing-api.onrender.com)

Root route:

```text
https://simracing-api.onrender.com/
```

Verwachte response:

```text
Sim Racing League API is running...
```

## 8. Protected routes testen

Gebruik [tests/api.http](./tests/api.http).

Aanbevolen volgorde:

1. Run `npm run seed` lokaal of seed de live database indien nodig.
2. Voer de admin login request uit.
3. Kopieer het token naar `@adminToken`.
4. Voer de gewone user login request uit.
5. Kopieer het token naar `@userToken`.
6. Test de protected routes.

Seed-accounts:

- Admin: `admin@test.com` / `123456`
- User: `lewis@f1.com` / `123456`

## 9. Submission checklist

Controleer voor het indienen:

- de main/master branch bevat de finale versie
- de live API URL staat in `README.md`
- de API-documentatielink staat in `README.md`
- de deploymenthandleiding is gecommit
- `tests/api.http` is gecommit
- `npm test` slaagt
- er zijn geen secrets gecommit
