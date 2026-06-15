# Deploymenthandleiding

Deze handleiding legt stap voor stap uit hoe de Sim Racing League API online gezet is.
De deployment bestaat uit drie grote onderdelen:

1. Een MongoDB Atlas database aanmaken
2. De Node.js API verbinden met die database
3. De API deployen naar Hostinger via een ZIP-upload

De live API staat op:

```text
https://nodeproject.batistevancoillie.be/
```

## 1. MongoDB Atlas database aanmaken

Voor de database wordt MongoDB Atlas gebruikt. Dat is een online MongoDB database, zodat de API zowel lokaal als online dezelfde database kan gebruiken.

### 1.1 Account en cluster maken

1. Ga naar [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Maak een account aan of log in.
3. Maak een nieuw project aan voor deze API.
4. Maak daarna een gratis cluster aan.
5. Kies een cloud provider en regio. Voor dit project is de gratis tier voldoende.

### 1.2 Database user aanmaken

Daarna werd een database user aangemaakt:

1. Ga in MongoDB Atlas naar `Database Access`.
2. Klik op `Add New Database User`.
3. Kies een username en wachtwoord.
4. Geef de user lees- en schrijfrechten op de database.
5. Bewaar het wachtwoord, want dit komt later in de connection string.

### 1.3 Network access instellen

Omdat de API online op Hostinger draait, moet MongoDB Atlas verbindingen van buitenaf toelaten.

1. Ga naar `Network Access`.
2. Klik op `Add IP Address`.
3. Voeg het toegelaten IP-adres toe.

Voor een eenvoudige schoolproject-setup kan deze waarde gebruikt worden:

```text
0.0.0.0/0
```

Dit laat verbindingen toe vanaf elke locatie. Voor een echte productie-app is het veiliger om alleen specifieke IP-adressen toe te laten.

### 1.4 Connection string ophalen

Daarna werd de connection string opgehaald:

1. Ga naar `Database`.
2. Klik op `Connect`.
3. Kies `Drivers`.
4. Kies Node.js als driver.
5. Kopieer de connection string.

Voorbeeld:

```text
mongodb+srv://username:password@cluster.mongodb.net/simracing
```

In deze string worden `username`, `password` en eventueel de databasenaam aangepast naar de eigen gegevens.

## 2. API verbinden met MongoDB

De API gebruikt Mongoose om verbinding te maken met MongoDB Atlas.
De databaseverbinding staat in `config/db.js`.

```js
const mongoose = require("mongoose");

const connectDB = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
};

module.exports = connectDB;
```

De connection string wordt niet rechtstreeks in de code gezet.
In plaats daarvan wordt `process.env.MONGO_URL` gebruikt.
Zo blijven gevoelige gegevens uit de code en uit GitHub.

## 3. Environment variables lokaal instellen

Om de API lokaal te testen, werd in de root van het project een `.env` bestand gemaakt.

Voorbeeld:

```env
PORT=3000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
```

Betekenis van de variabelen:

- `PORT`: poort waarop de lokale server draait
- `MONGO_URL`: connection string naar MongoDB Atlas
- `JWT_SECRET`: geheime sleutel waarmee JWT-tokens ondertekend worden

Het `.env` bestand wordt niet gecommit naar GitHub en wordt ook niet mee geupload naar Hostinger.

## 4. API lokaal testen

Installeer eerst de dependencies:

```bash
npm install
```

Start daarna de API:

```bash
npm start
```

Als alles correct ingesteld is, verschijnt in de terminal:

```text
MongoDB connected
Server running on port 3000
```

De root route kan lokaal getest worden via:

```text
http://localhost:3000/
```

Verwachte response:

```text
Sim Racing League API is running...
```

Optioneel kan de database gevuld worden met seeddata:

```bash
npm run seed
```

De tests kunnen uitgevoerd worden met:

```bash
npm test
```

## 5. Project voorbereiden voor Hostinger

Omdat de GitHub repository van school is en niet rechtstreeks gekoppeld werd aan Hostinger, werd gekozen voor een handmatige ZIP-upload.

De ZIP bevat de projectbestanden die nodig zijn om de API te starten.

Wel meenemen:

```text
app.js
server.js
package.json
package-lock.json
config/
middleware/
models/
routes/
scripts/
validation/
README.md
API_DOCUMENTATION.md
DeploymentGuide.md
```

Niet meenemen:

```text
node_modules/
tests/
.env
```

`node_modules` wordt niet mee geupload, omdat Hostinger zelf `npm install` uitvoert.
`.env` wordt niet mee geupload, omdat de secrets in Hostinger zelf als environment variables worden ingesteld.

## 6. Hostinger Node.js app aanmaken

In Hostinger werd een nieuwe Node.js web app aangemaakt.

### 6.1 Domein of subdomein kiezen

Tijdens de setup vraagt Hostinger welk domein of subdomein gebruikt moet worden.

Voor dit project werd gekozen voor:

```text
nodeproject.batistevancoillie.be
```

Daarna werd op `Volgende` geklikt.

### 6.2 Uploadmethode kiezen

In het scherm `Implementeer je Node.js web app` biedt Hostinger twee opties:

- `Git-repository importeren`
- `Upload je bestanden`

Voor dit project werd gekozen voor:

```text
Upload je bestanden
```

Daarna werd het ZIP-bestand met de API-bestanden geupload.

## 7. Build-instellingen op Hostinger

Na de upload toont Hostinger het scherm `Bekijk de build-instellingen`.

De gebruikte instellingen:

```text
Framework preset: Express
Node-versie: 22.x
Hoofdmap: DeployNodeProject
```

De preset `Express` wordt gebruikt omdat de API gebouwd is met Express.js.
Node 22.x is geschikt voor de dependencies uit `package.json`.

Bij `Bouw- en uitvoerinstellingen` werd de standaardconfiguratie voor Express gebruikt.

Belangrijke instellingen:

```text
Install command: npm install
Start command: npm start
Entry file: server.js
```

Het startscript staat in `package.json`:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Daardoor start Hostinger de API via `server.js`.

## 8. Environment variables op Hostinger

In Hostinger werden dezelfde gevoelige instellingen toegevoegd via `Omgevingsvariabelen`.

Nodige variabelen:

```env
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
```

De variabele `PORT` werd niet handmatig ingesteld op Hostinger.
Hostinger kan zelf een poort doorgeven via `process.env.PORT`.

In `server.js` staat:

```js
const PORT = process.env.PORT || 3000;
```

Daardoor gebruikt de API de poort van Hostinger als die aanwezig is.
Als er lokaal geen poort wordt meegegeven, valt de app terug op poort `3000`.

## 9. Deployment uitvoeren

Na het controleren van de instellingen werd de deployment gestart.
Hostinger voert daarna automatisch deze stappen uit:

1. Het ZIP-bestand uitpakken
2. Dependencies installeren met `npm install`
3. De Express-app starten met `npm start`
4. De app koppelen aan het gekozen subdomein

Na een succesvolle deployment is de API bereikbaar via:

```text
https://nodeproject.batistevancoillie.be/
```

## 10. Live API testen

De root route kan getest worden in de browser:

```text
https://nodeproject.batistevancoillie.be/
```

Verwachte response:

```text
Sim Racing League API is running...
```

De API kan ook getest worden met REST Client, Postman of Insomnia.

Voorbeelden:

```http
GET https://nodeproject.batistevancoillie.be/
```

```http
POST https://nodeproject.batistevancoillie.be/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "test123"
}
```

```http
POST https://nodeproject.batistevancoillie.be/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```

Voor protected routes moet het JWT-token meegestuurd worden:

```http
Authorization: Bearer YOUR_TOKEN
```

## 11. Veelvoorkomende problemen

### De API start niet

Controleer:

- of `server.js` als entry file ingesteld staat
- of het start command `npm start` is
- of `MONGO_URL` en `JWT_SECRET` ingevuld zijn
- of `package.json` aanwezig is in de ZIP

### MongoDB verbindt niet

Controleer:

- of de MongoDB Atlas connection string correct is
- of de database user het juiste wachtwoord heeft
- of `Network Access` in MongoDB Atlas externe verbindingen toelaat
- of de `MONGO_URL` in Hostinger geen typfout bevat

### Routes geven 404

Controleer of de juiste route gebruikt wordt.
De meeste routes beginnen met `/api`.

Voorbeelden:

```text
/api/auth/register
/api/auth/login
/api/users
/api/teams
/api/races
/api/registrations
```

## 12. Submission checklist

Controleer voor het indienen:

- de live API URL staat in `README.md`
- de live API URL staat in `API_DOCUMENTATION.md`
- `tests/api.http` gebruikt de nieuwe base URL
- `DeploymentGuide.md` beschrijft MongoDB Atlas, de databaseconnectie en Hostinger
- er staan geen secrets in de repository
- `npm test` slaagt lokaal

## Besluit

De API gebruikt MongoDB Atlas als online database en maakt verbinding via de environment variable `MONGO_URL`.
Lokaal gebeurt dit via een `.env` bestand.
Online worden de environment variables in Hostinger ingesteld.
De API is gedeployed als Express Node.js app op Hostinger via een ZIP-upload en is beschikbaar via `https://nodeproject.batistevancoillie.be/`.
