# Sim Racing League API

## Links

- Live API: [https://nodeproject.batistevancoillie.be/](https://nodeproject.batistevancoillie.be/)
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

## Examenvoorbereiding: mogelijke mondelinge vragen

Deze sectie is bedoeld als verdedigingssamenvatting. De vragen zijn geformuleerd zoals ze tijdens een mondeling examen zouden kunnen komen. Bij elk antwoord staat kort waar je dit in de code kunt terugvinden.

### Projectarchitectuur

#### 1. Wat is het doel van dit project?

Dit project is een REST API voor een sim racing league. Gebruikers kunnen registreren, inloggen, teams en races bekijken en zich inschrijven voor races. Admins kunnen users, teams, races en registraties beheren.

Komt voor in:

- `app.js`: koppelt alle API-routes
- `routes/`: bevat de endpointlogica
- `models/`: bevat de databankstructuur

#### 2. Waarom is het project opgesplitst in `app.js` en `server.js`?

`app.js` bouwt de Express-app op: JSON middleware, routes, 404-handler en error handler. `server.js` is verantwoordelijk voor het echte opstarten: `.env` laden, connectie maken met MongoDB en daarna pas `app.listen()` uitvoeren.

Die splitsing maakt testen makkelijker, want de tests kunnen `app.js` importeren zonder dat er echt een serverpoort geopend wordt.

Komt voor in:

- `app.js`
- `server.js`
- `tests/auth.test.js`
- `tests/authorization.integration.test.js`

#### 3. Waarom connecteert `server.js` eerst met MongoDB en start daarna pas de server?

De API is afhankelijk van de database. Als MongoDB niet bereikbaar is, heeft het weinig zin om de HTTP-server toch te starten. Daarom gebeurt eerst `await connectDB()` en pas daarna `app.listen(PORT)`.

Komt voor in:

- `server.js`
- `config/db.js`

#### 4. Wat doet `express.json()`?

`express.json()` zorgt ervoor dat JSON-bodies uit requests worden omgezet naar `req.body`. Zonder deze middleware zouden POST- en PUT-routes de doorgestuurde JSON-data niet correct kunnen lezen.

Komt voor in:

- `app.js`
- alle POST- en PUT-routes in `routes/`

#### 5. Waarom staat de 404-handler na alle routes?

Express verwerkt middleware van boven naar beneden. Eerst moeten alle echte routes de kans krijgen om een request te behandelen. Als geen enkele route matcht, komt de request bij de 404-handler terecht.

Komt voor in:

- `app.js`

#### 6. Waarom staat de globale error handler helemaal op het einde?

De error handler moet fouten opvangen die via `next(error)` uit routes of middleware komen. Daarom staat hij na de normale routes en na de 404-handler. In Express herken je een error handler aan vier parameters: `err, req, res, next`.

Komt voor in:

- `app.js`
- `middleware/errorHandler.js`

### Datamodel en MongoDB

#### 7. Welke collecties gebruikt de API?

De API gebruikt vier collecties:

- `users`: accounts, wachtwoordhashes en rollen
- `teams`: racing teams
- `races`: races met een verwijzing naar een team
- `registrations`: inschrijvingen die een user aan een race koppelen

Komt voor in:

- `models/user.js`
- `models/team.js`
- `models/race.js`
- `models/registration.js`

#### 8. Wat zijn de relaties tussen de collecties?

Een `Race` verwijst naar een `Team`. Een `Registration` verwijst naar een `User` en naar een `Race`.

Belangrijkste relaties:

- `Race.team -> Team`
- `Registration.user -> User`
- `Registration.race -> Race`

Komt voor in:

- `models/race.js`
- `models/registration.js`

#### 9. Waarom gebruikt dit project references in plaats van embedded documents?

Dit project gebruikt references omdat de data gedeeld wordt. Een team kan aan meerdere races gekoppeld zijn. Een race kan meerdere registraties hebben. Een user kan meerdere registraties hebben. Als we volledige users, teams of races zouden embedden, zouden dezelfde gegevens op meerdere plaatsen dubbel opgeslagen worden.

Met references vermijden we duplicatie en kunnen we gedeelde data op een centrale plaats aanpassen.

Komt voor in:

- `models/race.js`
- `models/registration.js`
- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`

#### 10. Wanneer zou embedded data wel logisch zijn?

Embedded data is logisch wanneer data alleen bij het parent-document hoort en bijna altijd samen gelezen wordt. Bijvoorbeeld: als een race vaste checkpoints of simpele settings had die nergens anders gebruikt worden, zouden die embedded kunnen staan in het race-document.

In dit project zijn users, races en teams aparte entiteiten die op meerdere plaatsen gebruikt worden. Daarom zijn references logischer.

Komt voor in:

- ontwerpkeuze zichtbaar in `models/`

#### 11. Wat doet `populate()`?

`populate()` vervangt een ObjectId-reference in de response door de echte gekoppelde documentdata. Een race bewaart bijvoorbeeld alleen een `team` ObjectId, maar met `.populate("team")` krijg je de teamgegevens mee terug in de response.

Komt voor in:

- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`

#### 12. Waarom wordt bij users vaak `.select("-password")` gebruikt?

Het wachtwoord staat gehasht in de database, maar zelfs een hash wil je niet terugsturen naar clients. Met `.select("-password")` wordt het passwordveld uitgesloten uit de response.

Komt voor in:

- `routes/authRoutes.js`
- `routes/userRoutes.js`
- `routes/registrationRoutes.js`

#### 13. Wat betekent `unique: true` op het emailveld?

`unique: true` zorgt ervoor dat MongoDB geen twee users met hetzelfde emailadres toelaat. Daarnaast controleert de code zelf ook met `User.findOne({ email })` of de gebruiker al bestaat, zodat de API een duidelijke foutmelding kan teruggeven.

Komt voor in:

- `models/user.js`
- `routes/authRoutes.js`
- `routes/userRoutes.js`
- `middleware/errorHandler.js`

#### 14. Waarom staat de rol als enum in het User-model?

De rol mag alleen `user` of `admin` zijn. De enum in Mongoose voorkomt dat andere rollen zomaar opgeslagen worden. Joi valideert dat ook al vroeger in de requestflow.

Komt voor in:

- `models/user.js`
- `validation/generalValidation.js`
- `tests/validation.test.js`

### Validatie

#### 15. Waarom gebruikt het project Joi-validatie?

Joi controleert input voordat de code database-acties uitvoert. Daardoor worden foute requests vroeg gestopt met een duidelijke `400 Bad Request`. Voorbeelden zijn een ongeldig emailadres, een te kort wachtwoord, een ontbrekende teamreferentie of een lege update.

Komt voor in:

- `validation/authValidation.js`
- `validation/generalValidation.js`
- alle routebestanden
- `tests/validation.test.js`

#### 16. Waarom is Joi niet hetzelfde als Mongoose-validatie?

Joi valideert de inkomende requestdata voordat er een databasequery gebeurt. Mongoose valideert op modelniveau wanneer data wordt opgeslagen of geupdatet. Joi is dus de eerste controlelaag, Mongoose de tweede controlelaag.

Komt voor in:

- `validation/`
- `models/`
- routes met `runValidators: true`

#### 17. Waarom gebruiken updatevalidaties `.min(1)`?

`.min(1)` zorgt ervoor dat een updatebody minstens één veld bevat. Zonder die check zou een lege PUT-request geldig zijn, terwijl er dan niets aangepast wordt.

Komt voor in:

- `validation/generalValidation.js`
- `tests/validation.test.js`

#### 18. Waarom worden ObjectIds apart gecontroleerd met `mongoose.Types.ObjectId.isValid()`?

Als een route een id verwacht, controleert de code eerst of het technisch een geldige MongoDB ObjectId is. Zo kan de API meteen `400 Invalid ID` teruggeven en vermijden we onnodige of foutgevoelige databasequeries.

Komt voor in:

- `routes/userRoutes.js`
- `routes/teamRoutes.js`
- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`
- `tests/authorization.integration.test.js`

#### 19. Wat is het verschil tussen `400` en `404` bij IDs?

`400 Bad Request` betekent dat de meegestuurde id technisch ongeldig is, bijvoorbeeld `not-a-valid-id`. `404 Not Found` betekent dat de id technisch geldig is, maar dat er geen document met die id bestaat.

Komt voor in:

- `routes/userRoutes.js`
- `routes/teamRoutes.js`
- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`

#### 20. Waarom checkt de race-route of het team bestaat?

Een race bevat een reference naar een team. De code controleert eerst of de `team` ObjectId geldig is en daarna of dat team echt bestaat. Zo vermijd je races die verwijzen naar niet-bestaande teams.

Komt voor in:

- `routes/raceRoutes.js`
- `tests/authorization.integration.test.js`

#### 21. Waarom checkt de registration-route of user en race bestaan?

Een registration koppelt een user aan een race. Beide references moeten geldig en bestaand zijn. Anders zou je een inschrijving kunnen opslaan voor een niet-bestaande gebruiker of race.

Komt voor in:

- `routes/registrationRoutes.js`
- `validation/generalValidation.js`

### Authenticatie

#### 22. Hoe werkt registratie?

Bij registratie valideert de route eerst de body met Joi. Daarna controleert ze of het emailadres al bestaat. Vervolgens wordt het wachtwoord gehasht met bcrypt en wordt de nieuwe user opgeslagen met standaardrol `user`.

Komt voor in:

- `routes/authRoutes.js`
- `models/user.js`
- `validation/authValidation.js`

#### 23. Waarom worden wachtwoorden gehasht?

Wachtwoorden mogen nooit plain text in de database staan. Met bcrypt wordt een hash opgeslagen. Bij login wordt het ingevoerde wachtwoord opnieuw vergeleken met de hash via `bcrypt.compare()`.

Komt voor in:

- `routes/authRoutes.js`
- `routes/userRoutes.js`
- `scripts/seed.js`

#### 24. Wat is een salt bij bcrypt?

Een salt is extra willekeurige data die bcrypt gebruikt bij het hashen. Daardoor krijgen twee gebruikers met hetzelfde wachtwoord normaal niet dezelfde hash. In de code wordt een salt gemaakt met `bcrypt.genSalt(10)`.

Komt voor in:

- `routes/authRoutes.js`
- `routes/userRoutes.js`

#### 25. Hoe werkt login?

Bij login valideert de route eerst email en password. Daarna zoekt ze de user op email. Als de user bestaat, vergelijkt ze het meegestuurde wachtwoord met de opgeslagen hash. Als dat klopt, maakt de API een JWT-token aan.

Komt voor in:

- `routes/authRoutes.js`
- `tests/auth.test.js`

#### 26. Wat zit er in het JWT-token?

Het JWT-token bevat de user id en de rol:

```js
{ id: user._id, role: user.role }
```

Die informatie wordt later gebruikt door de middleware om te weten wie de request doet en welke rechten die gebruiker heeft.

Komt voor in:

- `routes/authRoutes.js`
- `middleware/authMiddleware.js`

#### 27. Waarom vervalt het token na 1 uur?

Een vervaltijd beperkt het risico als een token uitlekt. Na 1 uur is het token niet meer geldig en moet de gebruiker opnieuw inloggen.

Komt voor in:

- `routes/authRoutes.js`

#### 28. Hoe werkt `authMiddleware`?

`authMiddleware` leest de `Authorization` header, haalt het bearer token eruit, verifieert het met `jwt.verify()` en zet de payload op `req.user`. Als er geen token is of het token ongeldig is, stopt de middleware met `401`.

Komt voor in:

- `middleware/authMiddleware.js`
- protected routes in `routes/`

#### 29. Waarom gebruikt `authMiddleware` `401` en `adminMiddleware` `403`?

`401` betekent dat de gebruiker niet geldig geauthenticeerd is: geen token of ongeldig token. `403` betekent dat de gebruiker wel gekend is, maar onvoldoende rechten heeft. Daarom geeft `adminMiddleware` `403 Access denied`.

Komt voor in:

- `middleware/authMiddleware.js`
- `middleware/adminMiddleware.js`

### Autorisatie en ownership

#### 30. Wat is role-based authorization?

Role-based authorization betekent dat rechten afhangen van de rol van de gebruiker. In dit project zijn er twee rollen: `user` en `admin`. Admins mogen beheeracties uitvoeren. Gewone users mogen vooral lezen en hun eigen data beheren.

Komt voor in:

- `models/user.js`
- `middleware/adminMiddleware.js`
- `routes/userRoutes.js`
- `routes/teamRoutes.js`
- `routes/raceRoutes.js`

#### 31. Waarom staan `authMiddleware` en `adminMiddleware` vaak achter elkaar?

Eerst moet de API weten wie de gebruiker is. Daarna kan ze pas controleren of die gebruiker admin is. Daarom staat `authMiddleware` vóór `adminMiddleware`.

Komt voor in:

- `routes/userRoutes.js`
- `routes/teamRoutes.js`
- `routes/raceRoutes.js`

#### 32. Wat is ownership-controle?

Ownership-controle betekent dat een gewone user alleen zijn eigen data mag bekijken of aanpassen. In dit project geldt dat vooral voor users en registrations. Een gewone user mag bijvoorbeeld niet de registration van een andere user lezen.

Komt voor in:

- `routes/userRoutes.js`
- `routes/registrationRoutes.js`
- `tests/authorization.integration.test.js`

#### 33. Hoe werkt ownership bij registrations?

De helper `canAccessRegistration()` vergelijkt de user id uit de registration met `req.user.id`. Als de ingelogde gebruiker admin is, mag die alles. Anders moet de registration van dezelfde user zijn.

Komt voor in:

- `routes/registrationRoutes.js`

#### 34. Waarom filtert `GET /api/registrations` gewone users?

Admins krijgen alle registrations. Gewone users krijgen alleen registrations waar `user` gelijk is aan hun eigen id. Zo wordt datalek voorkomen.

Komt voor in:

- `routes/registrationRoutes.js`
- `tests/authorization.integration.test.js`

#### 35. Hoe voorkomt het project dat een gewone user zichzelf admin maakt?

Bij user updates wordt eerst gecontroleerd of de user zichzelf of een ander probeert aan te passen. Daarna wordt voor gewone users `role` uit de update verwijderd met `delete updates.role`. Zelfs als ze `{ "role": "admin" }` meesturen, wordt dat dus niet opgeslagen.

Komt voor in:

- `routes/userRoutes.js`
- `tests/authorization.integration.test.js`

#### 36. Mag een gewone user een registration voor iemand anders maken?

Nee. Bij `POST /api/registrations` controleert de route of `req.body.user` gelijk is aan `req.user.id`, behalve als de gebruiker admin is. Zo kan een gewone user alleen zichzelf inschrijven.

Komt voor in:

- `routes/registrationRoutes.js`
- `tests/authorization.integration.test.js`

### CRUD en database-acties

#### 37. Wat betekent CRUD in dit project?

CRUD staat voor Create, Read, Update en Delete. In dit project bestaan CRUD-routes voor users, teams, races en registrations.

Komt voor in:

- `routes/userRoutes.js`
- `routes/teamRoutes.js`
- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`

#### 38. Waarom wordt `findByIdAndUpdate()` gebruikt met `returnDocument: "after"`?

Standaard kan een updatequery het oude document teruggeven. Met `returnDocument: "after"` krijgt de API het aangepaste document terug, zodat de response de nieuwste data bevat.

Komt voor in:

- `routes/userRoutes.js`
- `routes/teamRoutes.js`
- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`

#### 39. Waarom staat bij updates `runValidators: true`?

Bij Mongoose update-methodes worden schema validators niet altijd automatisch uitgevoerd zoals bij `save()`. Met `runValidators: true` verplichten we Mongoose om ook bij updates de modelregels te controleren.

Komt voor in:

- `routes/userRoutes.js`
- `routes/teamRoutes.js`
- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`

#### 40. Worden er transacties gebruikt in dit project?

Nee, er worden momenteel geen MongoDB-transacties gebruikt. De meeste acties wijzigen maar één document tegelijk, bijvoorbeeld één user, één team, één race of één registration. Voor zulke eenvoudige acties is een transactie meestal niet nodig.

Een transactie zou wel nuttig kunnen zijn als één actie meerdere collecties tegelijk consistent moet aanpassen. Bijvoorbeeld: als je bij het verwijderen van een race automatisch ook alle gekoppelde registrations moet verwijderen, en je wil zeker zijn dat beide acties samen slagen of samen falen.

Komt voor in:

- geen transacties in de huidige code
- deletion routes in `routes/userRoutes.js`, `routes/teamRoutes.js`, `routes/raceRoutes.js`, `routes/registrationRoutes.js`

#### 41. Wat gebeurt er momenteel bij deletion van gelinkte data?

De delete-routes verwijderen momenteel alleen het document zelf. Als je een race verwijdert, worden gekoppelde registrations niet automatisch mee verwijderd. Als je een team verwijdert, kunnen races nog naar dat verwijderde team verwijzen.

Dat is een belangrijk verdedigingspunt: de huidige code doet eenvoudige deletion, maar geen cascade deletion. Een verbetering zou zijn om gekoppelde documenten mee op te ruimen, eventueel met een transactie.

Komt voor in:

- `routes/userRoutes.js`
- `routes/teamRoutes.js`
- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`

#### 42. Wat is cascade deletion?

Cascade deletion betekent dat gekoppelde data automatisch mee verwijderd wordt. Bijvoorbeeld: als een race verwijderd wordt, verwijder je ook alle registrations voor die race. Dat voorkomt dangling references.

In dit project is cascade deletion nog niet geïmplementeerd. De delete-routes zijn bewust eenvoudig gehouden.

Komt voor in:

- niet geïmplementeerd
- relevant bij `routes/raceRoutes.js` en `routes/registrationRoutes.js`

#### 43. Wat zijn dangling references?

Een dangling reference is een reference die verwijst naar een document dat niet meer bestaat. Bijvoorbeeld: een race verwijst naar een team dat verwijderd is. Omdat dit project references gebruikt, moet je bij deletions nadenken over zulke situaties.

Komt voor in:

- mogelijk bij deletion in `routes/teamRoutes.js`
- mogelijk bij deletion in `routes/raceRoutes.js`
- mogelijk bij deletion in `routes/userRoutes.js`

#### 44. Waarom wordt bij aanmaken van linked data gecontroleerd of de gekoppelde documenten bestaan?

Omdat references alleen ObjectIds zijn. MongoDB controleert niet automatisch of een referenced document echt bestaat. Daarom doet de applicatie zelf checks met `Team.findById()`, `User.findById()` en `Race.findById()`.

Komt voor in:

- `routes/raceRoutes.js`
- `routes/registrationRoutes.js`

### Error handling en statuscodes

#### 45. Wat doet de globale error handler?

De globale error handler logt technische details en zet bekende fouten om naar duidelijke HTTP-responses. Voorbeelden zijn `CastError`, `ValidationError`, duplicate key errors, JWT errors en token expiry.

Komt voor in:

- `middleware/errorHandler.js`
- `app.js`

#### 46. Waarom gebruiken routes `try/catch` en `next(error)`?

Asynchrone database-acties kunnen falen. Met `try/catch` vangt de route die fout op en geeft ze die door aan de globale error handler via `next(error)`. Daardoor blijft foutafhandeling centraal.

Komt voor in:

- alle routebestanden
- `middleware/errorHandler.js`

#### 47. Welke statuscodes gebruikt het project vaak?

Veelgebruikte statuscodes:

- `200`: succesvolle GET, PUT of login
- `201`: succesvol aangemaakt
- `400`: slechte input of invalid credentials
- `401`: geen of ongeldig token
- `403`: geen rechten
- `404`: document of route niet gevonden
- `500`: onverwachte serverfout

Komt voor in:

- `routes/`
- `middleware/`

#### 48. Waarom geeft login bij fout wachtwoord `Invalid credentials`?

De API zegt niet of het emailadres of het wachtwoord fout is. Dat is veiliger, omdat een aanvaller zo minder makkelijk kan achterhalen welke emailadressen bestaan.

Komt voor in:

- `routes/authRoutes.js`
- `tests/auth.test.js`

### Tests

#### 49. Welke testtools gebruikt het project?

Het project gebruikt Jest als testrunner, Supertest om HTTP-requests naar de Express-app te sturen en `mongodb-memory-server` om tests te draaien tegen een tijdelijke in-memory MongoDB.

Komt voor in:

- `package.json`
- `tests/auth.test.js`
- `tests/authorization.integration.test.js`

#### 50. Waarom gebruiken de tests een in-memory MongoDB?

Met een in-memory database zijn tests geïsoleerd en herhaalbaar. Ze gebruiken geen echte lokale of productie-database. Elke test kan data opzetten en opruimen zonder gevaar voor echte gegevens.

Komt voor in:

- `tests/auth.test.js`
- `tests/authorization.integration.test.js`

#### 51. Waarom importeert Supertest `app` en niet `server.js`?

Supertest heeft de Express-app nodig, niet een echte draaiende server op een poort. Omdat `app.js` apart staat, kunnen tests requests uitvoeren zonder `app.listen()` te starten.

Komt voor in:

- `app.js`
- `server.js`
- `tests/auth.test.js`
- `tests/authorization.integration.test.js`

#### 52. Welke belangrijke beveiligingscases worden getest?

De tests controleren onder andere:

- registreren met geldige en ongeldige data
- login met correct en fout wachtwoord
- `/me` met en zonder token
- gewone users krijgen geen admin-only user list
- gewone users kunnen hun rol niet verhogen
- gewone users kunnen geen registrations van andere users beheren
- admins kunnen registrations voor andere users aanmaken

Komt voor in:

- `tests/auth.test.js`
- `tests/authorization.integration.test.js`
- `tests/validation.test.js`

### Seed data en deployment

#### 53. Waarvoor dient `scripts/seed.js`?

`scripts/seed.js` vult de database met testdata: users, teams, races en registrations. Eerst worden bestaande documenten verwijderd, daarna worden nieuwe documenten aangemaakt. Wachtwoorden worden ook in de seed gehasht.

Komt voor in:

- `scripts/seed.js`
- `package.json`

#### 54. Waarom gebruikt het project environment variables?

Gevoelige of omgevingsafhankelijke instellingen horen niet hardcoded in de code. `MONGO_URL`, `JWT_SECRET` en `PORT` komen uit environment variables. Lokaal staan ze in `.env`, op Render worden ze ingesteld in de deploymentomgeving.

Komt voor in:

- `server.js`
- `config/db.js`
- `routes/authRoutes.js`
- `DeploymentGuide.md`

#### 55. Waarom mag `JWT_SECRET` niet publiek zijn?

Met `JWT_SECRET` worden tokens ondertekend en geverifieerd. Als iemand die secret kent, kan die mogelijk zelf geldige tokens maken. Daarom hoort die secret in environment variables en niet in de repository.

Komt voor in:

- `routes/authRoutes.js`
- `middleware/authMiddleware.js`
- `.env` lokaal, niet in Git

#### 56. Hoe is het project gedeployed?

De API is gedeployed op Render en gebruikt MongoDB Atlas als cloud database. Render voert `npm install` uit als build command en `node server.js` als start command.

Komt voor in:

- `DeploymentGuide.md`
- `README.md`

### Korte studeerantwoorden

#### 57. Wat zeg je als ze vragen waarom je geen embedded documents gebruikt?

Omdat users, teams en races gedeelde entiteiten zijn. Een team kan aan meerdere races hangen en een race kan meerdere registrations hebben. References vermijden duplicatie en houden updates centraal.

#### 58. Wat zeg je als ze vragen waarom je geen transacties gebruikt?

Omdat de huidige CRUD-acties meestal één document tegelijk aanpassen. Een transactie zou vooral nuttig zijn bij acties die meerdere collecties samen moeten aanpassen, zoals race verwijderen plus alle registrations mee verwijderen.

#### 59. Wat zeg je als ze vragen wat een zwak punt of verbetering is?

Een realistische verbetering is cascade deletion of transacties bij deletion van gelinkte data. Nu verwijdert de API alleen het hoofdobject. Daardoor kunnen dangling references ontstaan als bijvoorbeeld een team of race verwijderd wordt.

#### 60. Wat zeg je als ze vragen waar de belangrijkste security zit?

De belangrijkste security zit in JWT-authenticatie, role-based authorization, ownership-controles, bcrypt password hashing, Joi-validatie, ObjectId-validatie en het niet terugsturen van password hashes.

Komt voor in:

- `middleware/authMiddleware.js`
- `middleware/adminMiddleware.js`
- `routes/authRoutes.js`
- `routes/userRoutes.js`
- `routes/registrationRoutes.js`
- `validation/`

#### 61. Wat zeg je als ze vragen wat het verschil is tussen authenticatie en autorisatie?

Authenticatie is controleren wie iemand is, via login en JWT. Autorisatie is controleren wat die persoon mag doen, via rollen en ownership.

Komt voor in:

- authenticatie: `routes/authRoutes.js`, `middleware/authMiddleware.js`
- autorisatie: `middleware/adminMiddleware.js`, `routes/userRoutes.js`, `routes/registrationRoutes.js`

#### 62. Wat zeg je als ze vragen waarom er tests zijn?

Tests bewijzen dat de belangrijkste flows blijven werken: register, login, validatie, JWT-protected routes, adminrechten, ownership en linked data checks. Ze maken het project betrouwbaarder en tonen dat de beveiligingslogica effectief gecontroleerd wordt.

Komt voor in:

- `tests/auth.test.js`
- `tests/authorization.integration.test.js`
- `tests/validation.test.js`

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
