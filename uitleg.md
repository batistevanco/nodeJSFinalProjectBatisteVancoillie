# Uitleg en verdediging van het project

## Doel van dit document

Dit document is geschreven als extra verdedigingsnota bij mijn project. Het doel is niet om alleen te beschrijven wat de code doet, maar vooral waarom ik bepaalde keuzes gemaakt heb. Tijdens een verdediging komen vragen vaak neer op:

- waarom is deze volgorde gekozen?
- waarom heb je hier middleware gebruikt?
- waarom staat validatie niet in het model maar in een aparte laag?
- waarom gebruik je JWT?
- waarom heb je een aparte `app.js` en `server.js`?
- waarom heb je eerst iets gecontroleerd en daarna pas de database aangesproken?

Daarom leg ik hieronder zeer uitgebreid mijn redenering uit.

## Korte samenvatting van het project

Dit project is een Node.js en Express API voor een sim racing league. De API laat toe om:

- gebruikers te registreren en in te loggen
- gebruikers op te halen, aan te maken, aan te passen en te verwijderen
- teams te beheren
- races te beheren
- registraties van gebruikers voor races te beheren

De applicatie gebruikt MongoDB via Mongoose als databanklaag. Authenticatie gebeurt via JWT. Invoer wordt gevalideerd met Joi. Testen gebeuren met Jest, Supertest en een in-memory MongoDB.

## Globale architectuur

De code is opgesplitst in duidelijke verantwoordelijkheden:

- `server.js`: start de applicatie echt op
- `app.js`: bouwt de Express-app op
- `config/db.js`: maakt de databankconnectie
- `routes/`: bevat de API-endpoints en businesslogica per domein
- `models/`: bevat de Mongoose schema's
- `middleware/`: bevat herbruikbare tussenlagen zoals authenticatie, autorisatie en error handling
- `validation/`: bevat Joi-validatie voor input
- `tests/`: bevat geautomatiseerde testen
- `scripts/seed.js`: vult de databank met testdata

Die opsplitsing is bewust gedaan. Ik had alles in een paar grote bestanden kunnen schrijven, maar dan wordt onderhoud veel moeilijker. Door elke laag één duidelijke taak te geven, blijft het project leesbaar, uitbreidbaar en verdedigbaar.

## Waarom een aparte `app.js` en `server.js`

Dit is een belangrijke architecturale keuze.

### Wat doet `app.js`?

`app.js` maakt de Express-app aan, koppelt middleware, koppelt routes, voegt de 404-handler toe en registreert de globale error handler.

### Wat doet `server.js`?

`server.js` laadt de environment variables, maakt verbinding met MongoDB en start daarna pas de HTTP-server.

### Waarom is die splitsing goed?

Er zijn drie hoofdredenen:

1. Testbaarheid

Voor testen wil ik de Express-app kunnen importeren zonder de server effectief op een poort te starten. In `tests/auth.test.js` importeer ik daarom `app` rechtstreeks. Dat werkt veel netter dan een file die meteen `listen()` uitvoert.

2. Single responsibility

`app.js` is verantwoordelijk voor de opbouw van de app.  
`server.js` is verantwoordelijk voor het bootstrappen van de runtime.

3. Betere foutafhandeling bij opstart

In `server.js` wordt eerst `connectDB()` uitgevoerd. Pas als de databankconnectie lukt, wordt `app.listen()` uitgevoerd. Zo voorkom ik dat mijn API "online lijkt" terwijl de database eigenlijk niet bereikbaar is.

### Waarom eerst database connecteren en dan pas luisteren op de poort?

De volgorde in `server.js` is:

1. `.env` laden
2. `app` importeren
3. `connectDB()` oproepen
4. pas daarna `app.listen()`

Dat is bewust. Als de databank essentieel is voor de meeste endpoints, is het veiliger om de server niet te starten wanneer die connectie mislukt. Anders zou een gebruiker requests kunnen sturen naar een API die eigenlijk niet correct functioneert.

## Waarom `express.json()` vroeg in de middleware-keten staat

In `app.js` wordt eerst:

```js
app.use(express.json());
```

uitgevoerd en daarna pas de routes.

Dat is logisch omdat:

- de meeste POST- en PUT-routes JSON-body's verwachten
- `req.body` anders leeg of onbruikbaar zou zijn
- validatie met Joi afhankelijk is van correct geparste JSON

Met andere woorden: eerst moet Express de body kunnen lezen, pas daarna kunnen routes iets met de body doen.

## Waarom de routes in `app.js` voor de 404-handler staan

De volgorde in `app.js` is:

1. JSON middleware
2. alle route-koppelingen
3. 404-handler
4. globale error handler

Dat is een standaard en correcte volgorde.

### Waarom komen de routes eerst?

Omdat Express middleware van boven naar beneden verwerkt. Als ik de 404-handler vóór mijn routes zou zetten, dan zou die bijna elke request meteen afbreken met "Route not found".

### Waarom komt de error handler als laatste?

Een error handler met vier parameters `err, req, res, next` hoort in Express op het einde te staan. Het idee is:

- eerst proberen normale middleware en routes de request te behandelen
- als ergens `next(error)` wordt aangeroepen, gaat Express verder naar de error middleware

Daarom staat `errorHandler` bewust op het einde.

## Waarom ik middleware gebruik

Middleware is ideaal voor logica die op meerdere plaatsen terugkomt.

### `authMiddleware`

Deze middleware controleert of er een JWT-token aanwezig is en geldig is. Als het token geldig is, wordt de gedecodeerde payload op `req.user` gezet.

Waarom is dat goed?

- ik vermijd duplicatie van tokencontrole in elke route
- routes blijven leesbaarder
- beveiliging zit op één centrale plaats

### `adminMiddleware`

Deze middleware controleert of de ingelogde gebruiker de rol `admin` heeft.

Waarom aparte middleware en niet overal een inline `if`?

- beter herbruikbaar
- duidelijker leesbaar
- makkelijker uitbreidbaar als rollen later complexer worden

### `errorHandler`

Een globale error handler is nuttig omdat:

- ik technische fouten centraal kan afvangen
- ik consistente JSON-responses kan teruggeven
- ik niet in elke route dezelfde foutblokken moet dupliceren

## Waarom in `authMiddleware` eerst de Authorization-header wordt gelezen

De logica in `authMiddleware` is:

1. lees `req.headers.authorization`
2. als die ontbreekt: meteen `401`
3. haal token uit de header
4. verifieer token
5. zet payload in `req.user`
6. roep `next()` aan

### Waarom die volgorde?

Omdat elke stap afhankelijk is van de vorige:

- zonder header kan ik geen token uitlezen
- zonder token kan ik niets verifiëren
- zonder geldige verificatie mag ik de request niet doorlaten

Dit is dus een defensieve opbouw: ik stop zo vroeg mogelijk als een voorwaarde niet vervuld is.

### Waarom `401` en geen `403` in deze middleware?

`401 Unauthorized` gebruik ik wanneer de gebruiker niet correct geauthenticeerd is:

- geen token
- ongeldig token
- vervallen token

`403 Forbidden` gebruik ik wanneer authenticatie wel gelukt is, maar de gebruiker onvoldoende rechten heeft. Daarom zit rolcontrole apart in `adminMiddleware`.

## Waarom `adminMiddleware` na `authMiddleware` komt

Bij routes zoals:

```js
router.get("/", authMiddleware, adminMiddleware, async (req, res, next) => {
```

wordt eerst authenticatie uitgevoerd en daarna autorisatie.

Dat is bewust omdat:

- je pas een rol kunt controleren als je weet wie de gebruiker is
- `adminMiddleware` `req.user` nodig heeft
- authenticatie logisch vóór permissiecontrole komt

Een verdediging hier is simpel: eerst identificeer ik de gebruiker, daarna controleer ik zijn rechten.

## Waarom ik Joi-validatie gebruik

Ik heb gekozen voor Joi-validatie in `validation/authValidation.js` en `validation/generalValidation.js`.

### Waarom valideren?

Validatie voorkomt dat ongeldige data de applicatie of databank binnenkomt. Zonder validatie kan je:

- lege of fout geformatteerde e-mails opslaan
- te korte wachtwoorden bewaren
- onvolledige records proberen inserten
- updates uitvoeren met lege body

### Waarom Joi en niet alleen Mongoose-validatie?

Mongoose-validatie is nuttig, maar gebeurt pas op het moment dat je echt met de databank werkt. Joi-validatie gebeurt vroeger in de requestflow. Dat heeft voordelen:

- de fout wordt sneller gedetecteerd
- de foutmelding kan gecontroleerder geformuleerd worden
- onnodige databankcalls worden vermeden

Met andere woorden: Joi is mijn eerste verdedigingslinie, Mongoose is een tweede veiligheid.

### Waarom aparte validation-files?

Omdat validatie een aparte verantwoordelijkheid is. Mijn routes blijven daardoor compacter en de validatieregels zijn herbruikbaar en overzichtelijk gegroepeerd.

## Waarom ik in bijna elke route eerst valideer en dan pas de database aanspreek

Dit is één van de belangrijkste patroonkeuzes in mijn project.

De typische volgorde is:

1. input valideren
2. technische checks doen, bijvoorbeeld ObjectId controleren
3. pas daarna de database raadplegen of muteren

### Waarom die volgorde belangrijk is

1. Performance

Als input al fout is, moet ik geen databankquery uitvoeren.

2. Veiligheid

Ik voorkom dat onzinnige of foutieve data dieper in de applicatie geraakt.

3. Duidelijkheid

Ik kan precieze foutcodes geven:

- `400` voor slechte input
- `404` wanneer een geldig id niet bestaat
- `500` voor onverwachte fouten

### Waarom eerst syntactische checks en dan pas businesslogica?

Omdat businesslogica alleen zin heeft wanneer de basisinput geldig is. Een e-mail opzoeken heeft geen zin als het formaat al ongeldig is. Een document opzoeken heeft geen zin als de meegegeven id zelfs geen geldige MongoDB ObjectId is.

## Waarom ObjectId-validatie expliciet gebeurt

In meerdere routes controleer ik:

```js
mongoose.Types.ObjectId.isValid(req.params.id)
```

of voor referenties:

```js
mongoose.Types.ObjectId.isValid(req.body.team)
```

### Waarom doe ik dat zelf?

Omdat het beter is om ongeldige id's vroeg te onderscheppen. Als ik dat niet doe, dan zou Mongoose later soms een `CastError` gooien. Door vooraf te checken:

- heb ik meer controle over de foutmelding
- blijft de flow duidelijk
- toon ik dat ik bewust omga met inputvalidatie

### Waarom niet volledig vertrouwen op de globale error handler?

De globale error handler is een vangnet. Maar een goede API probeert voorspelbare fouten al lokaal en expliciet af te handelen. Dat is properder dan alles laten mislopen en dan pas centraal opvangen.

## Uitleg per domein

## Authenticatie

Bestand: `routes/authRoutes.js`

### Register-flow

De volgorde in `/register` is:

1. request body valideren
2. e-mail uit body halen
3. controleren of gebruiker al bestaat
4. wachtwoord hashen
5. gebruiker aanmaken
6. gebruiker opslaan
7. `201 Created` teruggeven

### Waarom eerst valideren?

Omdat ik geen databankwerk wil doen voor input die toch fout is.

### Waarom eerst controleren of de gebruiker al bestaat?

Omdat het zinloos is om een wachtwoord te hashen voor een account die toch niet mag aangemaakt worden. Hashen kost bewust wat rekenwerk. Door eerst te checken op een bestaand account vermijd ik onnodige kost.

### Waarom het wachtwoord hashen vóór `save()`?

Omdat het databankmodel nooit een plain text wachtwoord mag krijgen. De veiligste aanpak is: voor het object wordt opgeslagen, is het wachtwoord al gehasht.

### Waarom `bcrypt` gebruiken?

Omdat wachtwoorden nooit leesbaar in de databank mogen staan. Een hash maakt van het wachtwoord een niet-rechtstreeks-omkeerbare representatie. `bcrypt` is daarvoor een courante en veilige keuze, omdat het hashing bewust traag maakt en geschikt is voor wachtwoorden.

### Waarom `genSalt(10)`?

De salt rounds bepalen hoeveel rekenwerk nodig is. `10` is een klassieke balans tussen veiligheid en performantie voor een schoolproject of standaard webapplicatie. Meer rounds zijn veiliger maar zwaarder. Minder rounds zijn sneller maar zwakker.

### Waarom geef ik bij register geen token terug?

Dat is een ontwerpkeuze. Ik heb registratie en login gescheiden gehouden:

- register maakt een account aan
- login levert een token op

Dat houdt de flow duidelijk. Je zou ook automatisch kunnen inloggen na registratie, maar ik heb gekozen voor expliciete stappen.

### Login-flow

De volgorde in `/login` is:

1. input valideren
2. gebruiker zoeken op e-mail
3. bij afwezige gebruiker: fout geven
4. wachtwoord vergelijken met bcrypt
5. JWT maken
6. token teruggeven

### Waarom eerst gebruiker ophalen en dan pas wachtwoord vergelijken?

Omdat ik een hash nodig heb uit de databank om het wachtwoord te vergelijken. Zonder gebruiker heb ik geen hash om mee te vergelijken.

### Waarom dezelfde foutboodschap bij foute gebruiker en fout wachtwoord?

Ik gebruik `"Invalid credentials"` in beide gevallen. Dat is een goede security-praktijk omdat je niet onthult of een e-mailadres bestaat. Anders kan een aanvaller accounts enumereren.

### Waarom JWT?

JWT is handig voor stateless authenticatie:

- de server hoeft geen sessie op te slaan
- de client stuurt bij elke request een token mee
- in het token kan ik nuttige info zetten zoals `id` en `role`

Voor een API-project is dat een logische keuze.

### Waarom zit `id` en `role` in de token payload?

Omdat ik daarmee:

- de gebruiker kan identificeren
- meteen rolgebaseerde checks kan doen

Daardoor moet ik niet bij elke request eerst de hele gebruiker opzoeken om te weten of hij admin is.

### Waarom een vervaltijd van `1h`?

Een token zonder vervaldatum blijft onbeperkt geldig en is riskanter. Met een vervaltijd beperk ik de impact als een token ooit uitlekt. `1h` is een redelijke balans tussen gebruiksgemak en veiligheid.

### Waarom `/me` een aparte route heeft

`/me` is handig omdat de client dan niet zelf een user-id moet kennen om de huidige gebruiker op te vragen. De identiteit zit al in de token. Dat is gebruiksvriendelijk en logisch voor "wie ben ik?"-functionaliteit.

### Waarom in `/me` alsnog de gebruiker uit de database ophalen

Ook al zit `id` in de token, ik haal de actuele gebruiker uit de database omdat:

- ik verse data wil
- de gebruiker mogelijk gewijzigd of verwijderd werd
- ik het wachtwoord niet wil meesturen en daarom `.select("-password")` gebruik

## Gebruikersbeheer

Bestand: `routes/userRoutes.js`

### Waarom `GET /api/users` alleen voor admins is

Alle gebruikers opvragen is gevoelige informatie. Daarom laat ik dit enkel toe voor admins. Dat is een duidelijke autorisatiekeuze:

- gewone gebruiker: enkel eigen data
- admin: alle data

### Waarom `GET /api/users/:id` zowel auth-check als extra rolcheck heeft

Hier heb ik een fijnere regel ingebouwd:

- admin mag iedereen bekijken
- gewone user enkel zichzelf

Dat is een realistischer model dan "ofwel iedereen, ofwel niemand". Het toont dat ik over autorisatieregels heb nagedacht.

### Waarom de vergelijking `req.user.id !== req.params.id`

Omdat ik wil controleren of de opgevraagde resource van de ingelogde gebruiker zelf is. Als dat niet zo is en hij geen admin is, krijgt hij een `403`.

### Waarom bij `POST /users` enkel admin een user mag maken

Ik heb al publieke registratie via `/api/auth/register`. De admin-route is bedoeld als beheersfunctionaliteit, bijvoorbeeld om gebruikers aan te maken via een backoffice-achtig scenario.

### Waarom ik in `POST /users` een standaardrol geef

```js
role: role || "user"
```

Dat is defensief programmeren:

- als geen rol is meegegeven, krijgt de gebruiker automatisch de veiligste standaardrol
- je voorkomt dat records zonder rol ontstaan

### Waarom gewone gebruikers hun rol niet mogen aanpassen in `PUT /users/:id`

Dit is een heel belangrijke beveiligingsbeslissing:

```js
if (req.user.role !== "admin") {
    delete updates.role;
}
```

Als ik dit niet zou doen, dan zou een gewone gebruiker zichzelf mogelijk admin kunnen maken door simpelweg `"role": "admin"` mee te sturen in een update. Deze regel voorkomt privilege escalation.

### Waarom wachtwoord bij update opnieuw gehasht wordt

Als het wachtwoord aangepast wordt, mag het nooit als gewone tekst in de databank terechtkomen. Daarom wordt er bij een password-update opnieuw gehasht vóór de database-update.

### Waarom `findByIdAndUpdate(..., { new: true, runValidators: true })`

Deze opties zijn bewust gekozen:

- `new: true`: ik wil het geüpdatete document terugkrijgen, niet de oude versie
- `runValidators: true`: ik wil dat Mongoose-validatie ook geldt tijdens updates

Zonder `runValidators: true` kunnen updates soms validatieregels omzeilen.

## Teams

Bestand: `routes/teamRoutes.js`

### Waarom teams relatief eenvoudig zijn

Een team is in dit project een ondersteunend domeinobject. Het heeft minder beveiligingslogica nodig dan een gebruiker. Daarom:

- iedereen die ingelogd is mag teams lezen
- enkel admins mogen teams aanmaken, updaten en verwijderen

Dit is logisch omdat teams eerder beheerdata zijn dan persoonlijke data.

### Waarom ik ook hier dezelfde CRUD-structuur gebruik

Ik heb consistentie belangrijk gevonden. Door per resource ongeveer hetzelfde patroon te volgen:

- route lezen
- valideren
- id checken
- databankbewerking doen
- correcte statuscode teruggeven

wordt de code voorspelbaar en onderhoudbaar.

## Races

Bestand: `routes/raceRoutes.js`

### Waarom `populate("team")` gebruikt wordt

Een race bevat een verwijzing naar een team. Met `populate("team")` wordt die referentie niet alleen als id teruggegeven, maar als ingevuld object.

Waarom is dat nuttig?

- de client krijgt rijkere data
- je hoeft niet apart nog eens een team op te vragen
- het toont dat de relatie tussen collecties correct is opgezet

### Waarom bij `POST /races` de `team`-id eerst gecontroleerd wordt

Voordat een race aangemaakt wordt, controleer ik of de meegegeven team-id een geldige ObjectId is. Dat is belangrijk omdat een race een relatie bevat naar een ander document. Ik wil voorkomen dat een technisch ongeldige id wordt opgeslagen.

### Waarom ik controleer of het team echt bestaat

Na de ObjectId-check controleer ik ook of het team-document echt bestaat met `Team.findById(req.body.team)`.

Dat is belangrijk omdat een syntactisch geldige ObjectId nog altijd kan verwijzen naar niets. Zonder die extra check zou je een race kunnen opslaan met een kapotte relatie naar een niet-bestaand team.

De volgorde is dus:

1. request body valideren
2. controleren of `team` een geldige ObjectId is
3. controleren of het team echt bestaat
4. pas daarna de race aanmaken of updaten

## Registraties

Bestand: `routes/registrationRoutes.js`

### Wat stelt een registratie voor?

Een registratie koppelt een gebruiker aan een race, eventueel met een eindpositie. Het is dus een koppelentiteit tussen twee andere domeinen.

### Waarom `populate("user", "-password")` en `populate("race")`

Omdat een registratie inhoudelijk weinig waarde heeft als je alleen losse ids terugstuurt. Door te populaten:

- zie je meteen welke gebruiker het is
- zie je meteen voor welke race de registratie geldt
- blijft gevoelige info zoals het wachtwoord verborgen

### Waarom registrations ownership-controles gebruiken

Registraties zijn gekoppeld aan een specifieke gebruiker. Daarom is alleen `authMiddleware` niet genoeg: de route moet ook controleren of de registratie effectief van de ingelogde gebruiker is.

De regels zijn:

- gewone users zien alleen hun eigen registraties
- gewone users mogen alleen voor zichzelf registraties maken
- gewone users mogen alleen hun eigen registraties lezen, aanpassen en verwijderen
- admins mogen alle registraties beheren

### Mogelijke verdedigingsvraag hierover

Vraag: "Waarom is registraties beheren minder streng beveiligd dan users beheren?"

Sterk antwoord:

Registraties zijn niet minder streng beveiligd. Ze gebruiken een andere autorisatieregel: ownership. Een gewone gebruiker heeft toegang tot zijn eigen registraties, maar niet tot die van andere gebruikers. Een admin heeft globale beheerrechten. Zo blijft de API bruikbaar voor gewone users zonder dat zij data van anderen kunnen aanpassen.

## Waarom Mongoose-modellen zo zijn opgebouwd

## User-model

Het user-model bevat:

- `name`
- `email`
- `password`
- `role`
- `createdAt`

### Waarom `email` uniek is

Twee accounts met hetzelfde e-mailadres zouden onlogisch zijn in een authenticatiesysteem. Daarom heb ik `unique: true` gebruikt. Daarnaast check ik ook expliciet in de route of een gebruiker al bestaat, zodat ik een duidelijkere foutmelding kan geven.

### Waarom `role` een enum is

Met:

```js
enum: ["user", "admin"]
```

beperk ik toegelaten waarden. Zo voorkom ik willekeurige rollen zoals `"superadmin123"` of typfouten in de database.

### Waarom `createdAt` een default heeft

Dat laat toe om automatisch bij te houden wanneer een gebruiker werd aangemaakt, zonder dat de client dat zelf hoeft mee te sturen.

## Team-model

Het team-model is bewust eenvoudig gehouden:

- `name`
- `country`
- `createdAt`

Dit past bij de eenvoud van de resource. Niet elk model moet complex zijn. Een eenvoudig model is beter zolang het voldoet aan de requirements.

## Race-model

Het race-model bevat:

- `name`
- `track`
- `date`
- `team`

### Waarom `team` een `ObjectId` met `ref: "Team"` is

Omdat een race gekoppeld is aan één team. Door Mongoose-referenties te gebruiken:

- kan ik relaties modelleren
- kan ik `populate()` gebruiken
- blijft data genormaliseerd in plaats van teaminformatie overal te dupliceren

## Registration-model

Het registration-model bevat:

- `user`
- `race`
- `position`

### Waarom `position` default `null` heeft

Omdat een inschrijving al kan bestaan voordat de race effectief gereden is. Op het moment van registreren is de eindpositie vaak nog niet gekend. Daarom is `position` optioneel en standaard `null`.

## Waarom ik statuscodes zo gekozen heb

Ik probeer semantisch correcte HTTP-statuscodes te gebruiken.

### `200 OK`

Voor geslaagde leesacties of updates.

### `201 Created`

Voor succesvolle creatie van een resource, bijvoorbeeld:

- register
- user maken
- team maken
- race maken
- registration maken

### `400 Bad Request`

Voor ongeldige input:

- foute validatie
- ongeldige ObjectId
- dubbele gebruiker
- fout wachtwoord of ongeldige login-input

### `401 Unauthorized`

Voor ontbrekende of ongeldige authenticatie:

- geen token
- ongeldig token
- vervallen token

### `403 Forbidden`

Voor te weinig rechten:

- gewone gebruiker probeert admin-functionaliteit te gebruiken
- gewone gebruiker probeert andere gebruiker op te vragen of aan te passen

### `404 Not Found`

Voor resources die niet bestaan:

- user niet gevonden
- team niet gevonden
- race niet gevonden
- registration niet gevonden

### `500 Internal Server Error`

Voor onverwachte fouten die niet expliciet lokaal werden afgehandeld.

## Waarom ik overal `try/catch` en `next(error)` gebruik

In asynchrone routehandlers kunnen fouten optreden tijdens databankoperaties. Met `try/catch` vang ik die op. Door daarna `next(error)` te gebruiken:

- geef ik de fout door aan de centrale error handler
- houd ik de route zelf proper
- centraliseer ik foutafhandeling

Dat is beter dan in elke route aparte, verschillende foutresponses te schrijven voor onverwachte fouten.

## Waarom de globale error handler meerdere fouttypes herkent

In `middleware/errorHandler.js` worden specifieke gevallen afgehandeld:

- `CastError`
- `ValidationError`
- duplicate key error (`11000`)
- `JsonWebTokenError`
- `TokenExpiredError`

### Waarom is dat nuttig?

Niet elke fout is hetzelfde. Door fouttypes te herkennen, kan ik gepaste responses geven. Zo blijft de API consistenter en gebruiksvriendelijker.

### Waarom de error handler ook logt

De handler logt:

- foutboodschap
- stack
- HTTP-methode
- URL

Dat is handig voor debugging, omdat je meteen context hebt over waar een fout gebeurde.

## Waarom ik comments in de code gebruik

De code bevat op verschillende plaatsen Nederlandstalige comments. In een schoolcontext is dat verdedigbaar omdat:

- ze tonen dat ik bewust de structuur verduidelijk
- ze helpen snel uitleggen wat een blok doet
- ze het project leesbaarder maken tijdens evaluatie

Ik heb ze vooral gebruikt om intentie te verduidelijken, niet om elke lijn letterlijk te beschrijven.

## Waarom ik testen heb toegevoegd

Bestand: `tests/auth.test.js`

Ik heb testen toegevoegd voor authenticatie omdat dit een kritieke laag is. Als registratie of login fout werkt, valt een groot deel van de rest van de API weg.

### Waarom Jest en Supertest?

- Jest: test runner en assertions
- Supertest: laat toe om HTTP-requests te sturen naar mijn Express-app zonder manueel een server op te zetten

### Waarom `MongoMemoryServer`?

Ik wil testen draaien tegen een echte MongoDB-achtige omgeving, maar zonder mijn echte databank te gebruiken. Een in-memory database heeft voordelen:

- snel
- geïsoleerd
- veilig voor testdata
- repeatable

### Waarom `beforeAll`, `beforeEach` en `afterAll`

#### `beforeAll`

Hier zet ik de testomgeving op:

- JWT-secret instellen
- tijdelijke MongoDB starten
- verbinden met Mongoose

#### `beforeEach`

Hier wis ik de users-collectie zodat elke test met een propere toestand start. Dat voorkomt dat testen elkaar beïnvloeden.

#### `afterAll`

Hier sluit ik alles correct af:

- database droppen
- connectie sluiten
- memory server stoppen

Dat voorkomt hanging testprocessen en resource leaks.

### Waarom de auth-tests deze gevallen controleren

Ik test:

- succesvolle registratie
- registratie met ongeldige data
- succesvolle login
- login met fout wachtwoord
- `/me` met geldig token
- `/me` zonder token

Dat dekt zowel happy flow als foutscenario's. Dat is belangrijk, omdat een API niet alleen correcte input moet aankunnen, maar ook correct moet reageren op ongeldige of ontbrekende input.

## Waarom ik een seed-script heb

Bestand: `scripts/seed.js`

Een seed-script is handig om snel demo- of testdata te genereren.

### Waarom eerst de database legen?

Ik gebruik:

```js
await User.deleteMany();
await Team.deleteMany();
await Race.deleteMany();
```

zodat ik elke keer met een voorspelbare startsituatie werk. Zeker bij demo's is dat nuttig, want dan weet ik exact welke data aanwezig is.

### Waarom het admin-account geen expliciete role krijgt in de seed

Dit is een goede kritische vraag. In de seed-data staat:

```js
{ name: "Admin", email: "admin@test.com", password: hashedPassword }
```

Maar in het model is de standaardrol `"user"`. Dat betekent dat deze seeded admin momenteel in feite geen adminrol krijgt. Dat is dus een echte beperking of kleine fout in de seed-data.

Sterk verdedigingsantwoord:

De rol-default werkt correct in het model, maar in de seed-data zou ik voor het admin-account expliciet `role: "admin"` moeten zetten. De rest van de architectuur voor admin-checks is wel correct opgezet, maar de seed-data kan daar nog beter aansluiten.

Dit is juist een goed voorbeeld dat ik mijn eigen project kritisch kan evalueren.

### Waarom races aan willekeurige teams gekoppeld worden

In de seed wordt per race een random team gekozen. Dat is een eenvoudige manier om snel relaties te genereren tussen collecties, zodat `populate()`-functionaliteit meteen zichtbaar en testbaar is.

## Keuzes rond beveiliging

## Waarom wachtwoorden nooit teruggegeven worden

Op meerdere plaatsen gebruik ik:

```js
.select("-password")
```

Dat is essentieel. Zelfs al zijn wachtwoorden gehasht, ze blijven gevoelige data en horen niet in API-responses thuis.

## Waarom ik loginfouten bewust vaag houd

Zoals eerder vermeld geef ik niet prijs of de fout lag aan het e-mailadres of het wachtwoord. Dat beperkt informatielekken.

## Waarom rolcontrole niet enkel op de frontend mag zitten

Een frontend kan altijd gemanipuleerd worden. Daarom gebeurt de echte toegangscontrole op de server. Ook als een gebruiker manueel requests stuurt via Postman of een script, blijft de backend de finale beslisser.

## Waarom validatie op de backend absoluut nodig is

Zelfs als een frontend al validatie doet, mag je daar nooit volledig op vertrouwen. Een gebruiker kan altijd rechtstreeks naar de API sturen. Daarom wordt alles opnieuw gevalideerd op de server.

## Belangrijke patronen die ik bewust volg

## 1. Eerst guard clauses, dan hoofdlogica

Ik gebruik vaak vroege `return`-statements zoals:

- als validatie faalt: stop
- als id ongeldig is: stop
- als resource niet bestaat: stop
- als rechten ontbreken: stop

Waarom is dat goed?

- minder diepe nesting
- duidelijkere flow
- sneller zichtbaar welke voorwaarden nodig zijn

## 2. Eerst controleren, dan uitvoeren

Ik probeer risicovolle of dure acties pas uit te voeren nadat de noodzakelijke voorwaarden bevestigd zijn.

Voorbeelden:

- eerst check op bestaande user, dan pas hashen
- eerst auth, dan pas admin-check
- eerst validatie, dan pas database-update

## 3. Centrale herbruikbaarheid

Middleware, validation en models zijn herbruikbare lagen. Daardoor moet ik wijzigingen maar op één plaats doen als regels veranderen.

## Bewuste beperkingen en mogelijke verbeteringen

Tijdens een verdediging is het sterk als ik niet alleen mijn keuzes verdedig, maar ook kan tonen dat ik de limieten van mijn oplossing begrijp.

## Mogelijke verbeteringen

### 1. Meer ownership-regels bij registraties

Nu mag elke ingelogde gebruiker registraties beheren. In een volgende versie zou ik kunnen afdwingen dat gewone gebruikers enkel hun eigen registraties mogen beheren.

### 2. Bestaande referenties expliciet controleren

Bij races en registraties controleer ik of ids geldig zijn, maar niet altijd of de gelinkte documenten echt bestaan. Dat kan verbeterd worden.

### 3. Meer testdekking

Momenteel ligt de testfocus op auth. Een uitbreiding zou zijn:

- user-routes testen
- admin-permissions testen
- team/race/registration CRUD testen
- foutscenario's uitgebreider testen

### 4. Seed-script verbeteren

Het admin-account moet expliciet de rol `admin` krijgen.

### 5. Consistentie in dependencies

In `package.json` staan zowel `bcrypt` als `bcryptjs`. In de code wordt `bcryptjs` gebruikt. In een opgeschoonde versie zou ik enkel de dependency behouden die ik effectief gebruik.

Dit is opnieuw iets dat ik eerlijk kan benoemen als technische verfijning.

## Mogelijke vragen tijdens de verdediging met sterke antwoordrichting

## Vraag: Waarom staat validatie niet rechtstreeks in elke route uitgeschreven?

Antwoordrichting:

Omdat ik validatie wilde centraliseren. Zo blijven routes leesbaar en zijn validatieregels herbruikbaar. Als de regels veranderen, moet ik ze maar op één plaats aanpassen.

## Vraag: Waarom gebruik je middleware?

Antwoordrichting:

Omdat authenticatie en autorisatie in meerdere routes terugkomen. Middleware voorkomt duplicatie en maakt de requestflow modulair.

## Vraag: Waarom komt `authMiddleware` voor `adminMiddleware`?

Antwoordrichting:

Omdat ik eerst moet weten wie de gebruiker is voor ik kan bepalen of die admin is. `adminMiddleware` hangt af van `req.user`, en dat wordt net door `authMiddleware` gezet.

## Vraag: Waarom eerst input controleren en daarna pas database-opvraging doen?

Antwoordrichting:

Omdat foute input anders onnodige queries veroorzaakt. Het is efficiënter en veiliger om fouten zo vroeg mogelijk af te vangen.

## Vraag: Waarom een globale error handler als je lokaal ook al fouten opvangt?

Antwoordrichting:

Lokaal handel ik voorspelbare businessfouten af, zoals invalid input of not found. De globale error handler vangt onverwachte technische fouten centraal op en zorgt voor consistente responses.

## Vraag: Waarom gebruik je JWT en geen sessies?

Antwoordrichting:

Omdat dit een API-project is en JWT goed past bij stateless communicatie. De server moet geen sessiestate bewaren en de client kan zichzelf authenticeren via een token in de header.

## Vraag: Waarom hash je wachtwoorden en waarom met bcrypt?

Antwoordrichting:

Wachtwoorden mogen nooit in plain text opgeslagen worden. `bcrypt` is geschikt voor wachtwoorden omdat het hashing bewust vertraagt en salts gebruikt, wat brute-force aanvallen moeilijker maakt.

## Vraag: Waarom gebruik je `populate()`?

Antwoordrichting:

Omdat de client dan niet alleen ids ziet, maar ook de gekoppelde objecten. Dat maakt responses bruikbaarder en toont dat de relaties correct zijn gemodelleerd.

## Vraag: Waarom heb je testen geschreven voor auth?

Antwoordrichting:

Omdat authenticatie een kernonderdeel is van de applicatie. Als login of tokencontrole faalt, werken veel andere beveiligde routes ook niet correct. Daarom was dat de eerste logische plaats om te testen.

## Vraag: Waarom is `runValidators: true` belangrijk bij updates?

Antwoordrichting:

Omdat updates anders soms validatie kunnen omzeilen. Ik wil dat ook bij een update dezelfde datakwaliteit bewaakt blijft.

## Vraag: Waarom geef je bij `/login` geen specifiekere fout zoals "user not found"?

Antwoordrichting:

Dat doe ik bewust niet, om niet prijs te geven welke e-mailadressen bestaan. Zo maak ik account enumeration moeilijker.

## Vraag: Waarom heb je comments gezet?

Antwoordrichting:

Omdat ik de leesbaarheid van mijn project wilde verhogen en omdat comments in een schoolproject helpen om intenties en keuzes sneller duidelijk te maken bij evaluatie.

## Vraag: Wat zou je nog verbeteren als je meer tijd had?

Antwoordrichting:

Ik zou strengere ownership-regels toevoegen, meer testdekking voorzien, referentiële controles uitbreiden, het seed-script verfijnen en enkele technische details opschonen zoals dubbele dependencies.

## Eerlijke eindreflectie

De belangrijkste sterkte van dit project is dat het niet zomaar losse CRUD-endpoints zijn. Ik heb geprobeerd bewust structuur aan te brengen:

- scheiding tussen app-opbouw en serverstart
- aparte middleware voor auth en admin
- aparte validatielaag
- relaties via Mongoose
- centrale error handling
- geautomatiseerde auth-tests

Tegelijk zie ik ook verbeterpunten, en dat is normaal. Een goed project is niet alleen code die werkt, maar ook code waarvan je de keuzes kunt uitleggen en de limieten kunt benoemen. Voor de verdediging is dat een grote troef: ik kan niet alleen zeggen wat mijn code doet, maar ook waarom ik het zo ontworpen heb en hoe ik het verder zou verbeteren.




# Uitleg databankstructuur

## Gebruiken we embedding of referencing?

In dit project gebruiken we **referencing**.

Dat zie je in de Mongoose-schema's:

- In `models/registration.js` verwijst `user` met een `ObjectId` naar `User`.
- In `models/registration.js` verwijst `race` met een `ObjectId` naar `Race`.
- In `models/race.js` verwijst `team` met een `ObjectId` naar `Team`.

Daarnaast gebruiken de routes `populate()` om die gekoppelde gegevens op te halen. Dat is typisch voor **referencing**.

## Waarom gebruiken we referencing?

We gebruiken referencing omdat de gegevens in dit project **sterk met elkaar verbonden zijn**, maar wel **aparte entiteiten** blijven:

- Een **user** bestaat los van een registratie.
- Een **race** bestaat los van een registratie.
- Een **team** bestaat los van een race.

Als we embedding zouden gebruiken, dan zouden we bijvoorbeeld volledige user- of racegegevens in een registratie opslaan. Dat zou in dit project minder handig zijn.

## Waarom is referencing hier beter?

### 1. Minder dubbele data

Een user kan aan meerdere races gekoppeld zijn via registraties. Als we embedding gebruikten, zou dezelfde user-informatie telkens opnieuw in elke registratie staan. Met referencing slaan we enkel het ID op.

### 2. Gemakkelijker updaten

Als de gegevens van een user, race of team veranderen, moeten we dat maar op één plaats aanpassen. Bij embedding zou dezelfde info op meerdere plaatsen kunnen staan, wat fouten en inconsistente data kan geven.

### 3. Logisch voor relaties tussen collecties

Dit project werkt eigenlijk met relaties:

- `Registration` koppelt een `User` aan een `Race`
- `Race` kan gekoppeld zijn aan een `Team`

Dat soort structuur past beter bij referencing dan bij embedding.

### 4. `populate()` maakt het praktisch

Hoewel we enkel ID's opslaan, kunnen we met `populate()` toch eenvoudig de volledige gekoppelde gegevens ophalen wanneer nodig. Zo combineren we een nette databankstructuur met gebruiksgemak in de API.

## Korte uitleg om mondeling te zeggen

"In dit project gebruiken we referencing in MongoDB. We slaan dus geen volledige geneste objecten op, maar wel verwijzingen met ObjectId's naar andere collecties. Dat is hier handig omdat users, races, teams en registraties aparte entiteiten zijn die met elkaar verbonden zijn. Zo vermijden we dubbele data, kunnen we gegevens makkelijker updaten en blijft de databankstructuur overzichtelijk."

## Besluit

Voor dit project is **referencing de beste keuze**, omdat we verschillende aparte collecties hebben die met elkaar verbonden zijn. Embedding zou hier sneller zorgen voor dubbele data en moeilijker onderhoud.
