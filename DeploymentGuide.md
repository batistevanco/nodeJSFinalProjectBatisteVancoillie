# Deployment Guide

## Doel

In dit document leg ik stap voor stap uit hoe ik deze API online heb gezet.
De deployment bestaat uit twee delen:

1. MongoDB Atlas gebruiken voor de database
2. Render gebruiken om de Node.js API online te hosten

## Stap 1: MongoDB Atlas opzetten

### 1. Account aanmaken

Ik ben gestart op [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) en heb daar een gratis account aangemaakt.

### 2. Cluster maken

Daarna heb ik een gratis cluster aangemaakt.
Voor een schoolproject is de free tier voldoende.

### 3. Database user aanmaken

In Atlas heb ik onder `Database Access` een gebruiker aangemaakt met:

- een username
- een wachtwoord

Die gegevens heb ik nodig om de connectiestring te bouwen.

### 4. Network access instellen

Bij `Network Access` heb ik toegang toegestaan zodat Render ook met de database kan verbinden.
Voor eenvoudige deployment is dat meestal:

```text
0.0.0.0/0
```

### 5. Connection string ophalen

Via `Connect` en daarna `Drivers` heb ik de MongoDB connection string gekopieerd.

Die ziet er ongeveer zo uit:

```text
mongodb+srv://username:password@cluster.mongodb.net/databasenaam
```

## Stap 2: Lokaal testen met `.env`

Voor ik ging deployen, heb ik lokaal eerst getest met een `.env` bestand in de root van het project.

Voor dit project gebruik ik:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Opmerking:
In deze codebase gebruikt de databaseconnectie momenteel `MONGO_URL`.

Daarna kon ik lokaal opstarten met:

```bash
npm install
npm start
```

## Stap 3: Render account en service maken

### 1. Inloggen op Render

Ik ben naar [Render](https://render.com) gegaan en heb ingelogd met GitHub.

### 2. Nieuwe web service maken

Daar heb ik gekozen voor:

- `New +`
- `Web Service`
- mijn GitHub repository geselecteerd

## Stap 4: Render configureren

Bij het aanmaken van de service heb ik deze instellingen gebruikt:

- Name: `simracing-api`
- Branch: `main`
- Region: een Europese regio als dat beschikbaar is

### Build en start command

```text
Build Command: npm install
Start Command: node server.js
```

## Stap 5: Environment variables op Render

In Render heb ik dezelfde environment variables toegevoegd als lokaal:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Deze gegevens staan dus niet hardcoded in de code.

## Stap 6: Deploy uitvoeren

Na het opslaan van de instellingen start Render automatisch met deployen.

Tijdens die stap:

- installeert Render de dependencies
- start Render de Node.js server
- worden logs getoond als er iets fout loopt

## Stap 7: Live API controleren

Na een succesvolle deploy kreeg de API een publieke URL:

[https://simracing-api.onrender.com](https://simracing-api.onrender.com)

De root route kan je controleren in de browser:

```text
https://simracing-api.onrender.com
```

Als alles werkt, krijg je de melding:

```text
Sim Racing League API is running...
```

## Stap 8: API online testen

### Login testen

```http
POST https://simracing-api.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "admin@test.com",
  "password": "123456"
}
```

### Protected route testen

```http
GET https://simracing-api.onrender.com/api/users
Authorization: Bearer YOUR_TOKEN
```

## Handige opmerkingen

- Een gratis Render service kan even slapen als ze een tijd niet gebruikt is.
- De eerste request kan daardoor trager zijn.
- MongoDB Atlas en Render werken goed samen voor kleine schoolprojecten.
- Door environment variables te gebruiken blijven gevoelige gegevens uit de broncode.

## Auto deploy

Render kan automatisch opnieuw deployen wanneer er naar `main` gepusht wordt.
Zo blijft de online versie gelijklopen met de code in GitHub.

## Besluit

Door MongoDB Atlas te combineren met Render is deze API online beschikbaar gemaakt zonder eigen server te moeten beheren.
Dat maakt het gemakkelijk om de endpoints te demonstreren en te testen tijdens de evaluatie.
