# Stacc code challenge 2021 - Gunnar Fimreite Kleiven

## Oppgavebeskrivelse
Her kan beskrive hvilke oppgave(r) du har valgt å løse.
> Bekriv prosjektet ditt kort.

## Hvordan kjøre prosjektet

For å kjøre prosjektet, så trenger du å bruke to terminaler, en for "frontend" og en for "backend".  

### Frontend
Opne prosjekted, og naviger inn i "frontend mappen".    
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
Det skal automatisk opne seg ein fane i nettleseren. Dersom det ikke gjør det, opne en nettleser og gå til 
http://localhost:3000/

### Backend
Prosjektet er avhenging av flere Python dependencies. Det er anbefalt å lage et Python virtual environment. 
For å lage et virtual environment i Python, opne en ny terminal (ulik den du kjører "frontend" i), 
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
Noen spesielle valg du ønsker å beskrive/forsvare?
> Eventuellt andre kommentarer / utfordringer?