# Stacc code challenge 2021 - Gunnar Fimreite Kleiven

## Oppgavebeskrivelse
Oppgaven jeg har valgt er en blanding av oppgave a) og b). Prosjektet mitt er både en enkel webapp som lar brukeren 
utføre en KYC-sjekk av én person, i tillegg til at den bruken en backend som er mitt eget lille API for å gjøre
spørringer til som returnerer treff på enkeltpersoner og selskap.
Videre, så gjorde jeg også et forsøk på å laste opp begge deler til Heroku, men uten at jeg denne gangen helt fikk til 
all konfigureringen (som har ført til at frontend web-appen ikke vises skikkelig der). Men, backend API'et fungerer 
fortsatt som et "standalone" API uten å trenge frontendet knyttet opp til det. 

### Frontend
Frontend er en simpel "single page" web applikasjon, der en bruker kan søke på en person (ved å bruke navn) eller en 
organisasjon/firma (ved å søke med organisasjonsnummer). Web appen er laget med React og Javascript, og komponentene
er hentet fra React biblioteket Material UI https://mui.com/.  
Webapplikasjonen skal også inneholde en del visuelle tilbakemeldinger til brukeren, i forhold til søkene som blir 
gjort. 

### Backend API
Backend API'et fungerer ved å ta imot HTTP forespørsler, og sender så selv forespørsler videre til Stacc sitt Stacc
KYC API, som ble gitt i oppgaven.  
API'et er laget ved bruk av Python og Flask (https://flask.palletsprojects.com/en/2.0.x/), og det videre HTTP forespørslene er gjort ved bruk av biblioteket
Requests (https://docs.python-requests.org/en/latest/) 

## Hvordan kjøre prosjektet

For å kjøre prosjektet, så trenger du å bruke to terminaler, en for "frontend" og en for "backend". Du trenger også
ha Python/pip og Node.js/npm installert:  
Node.js: https://nodejs.org/en/
Python: https://www.python.org/downloads/ 


### Frontend
Åpne prosjekted, og naviger inn i "frontend mappen".    
```
cd frontend
```  
Første gang må du laste ned dependencies ved å kjøre
```
npm install
```
og deretter starte web-applikasjonen ved å kjøre
```
npm start
```
Det skal automatisk åpne seg ein fane i nettleseren. Dersom det ikke gjør det, åpne en nettleser og gå til 
http://localhost:3000/

### Backend
Prosjektet er avhenging av flere Python dependencies. Det er anbefalt å lage et Python virtual environment. 
For å lage et virtual environment i Python, åpne en ny terminal (ulik den du kjører "frontend" i), 
og kjør kommandoen:
```
python3 -m venv .venv
```  
Der siste argumentet er navnet, og kan endres på.  
For å aktivere det, kjør på Windows
```
.venv\Scripts\activate.bat
```  
På Unix eller MacOs, kjør:
```
source .venv/bin/activate
```
Deretter kan du laste ned dependencies sånn:
```
pip install -r requirements.txt
```
For å kjøre backend API'et, og naviger deg inn i "backend" mappen.
```
cd backend
```
Og start programmet med kommandoen
```
flask run
```

## Kommentarer
### Problem med deployment
En litt stor utfordring jeg hadde var å prøve å deploye prosjektet som frontend&backend til Heroku. Jeg hadde gjort det 
på et prosjekt før (med litt annen tech stack), så tanken var at det kom til å gå fort og knirkefritt å sette det 
opp denne gangen også. Men, det gikk dessverre ikke så bra, da jeg ikke fikk fikset frontenden til å vises skikkelig der. 
Det førte også dessverre til litt bortkastet tid til å prøve å fikse mange småfeil som dukket opp, og som ikke ble noe
skikkelig ut av til slutt heller.  
Et annet litt viktig punkt som det førte til også, var at det ødelagte flyten i commits jeg hadde i repoet mitt. Så i 
"midten" av historien av commits, så kommer det veldig mange, korte commits som ikke oppfyller en god standard for
bruk av versjonskontroll. Jeg hadde satt opp Heroku til å følge med på commits fra master branchen på Github, så det ble
mange små, dårlige endringer der. Derfor, dersom dere kommer til å se gjennom historien for commits for å sjekke 
bruk av arbeidsmetodikk, så vennligst se vekk ifra eit sett med dårlige commits og meldinger på lørdagen.  
  
Videre, så førte det også til en eventuelt litt rar mappestruktur. Tanken var å dele strukturen i en "frontend" og en 
"backend" mappe, men f.eks endte requirements.txt (tilhørende backend) med å bli liggende i root mappen. 

### Frontend design
Jeg brukte ikkje så veldig mye tid på å "style" web interfaces. Komponentene som ble brukt ble valgt for å få ein grei 
framvisning av funksjonaliteten, og kunne definitivt ha blitt gjort finere. 



