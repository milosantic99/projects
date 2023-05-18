# Bertus - Igrannonica

## Dev grana

### Iz ove grane izvlacite nove grane i u nju mergujte kad zavrstite neki deo

### Server portovi

	10047 - Frontend
	10046 - Backend
	10048 - Python FastApi
	
### Promena sa lokala na server

#### Za promene ispod zakomentarisati trenutnu verziju i otkomentarisati onu koja je bila pod komentarom  

Backend  

	U klasi Hosts/HostUrl promeniti Frontend i FastApi url
	U fajlu launchSettings promeniti applicationUrl
	U fajlu appSettings promeniti lokaciju baze

Frontend  

	Promeniti host url u klasi koje se nalazi u  ->  src/host

FastApi  

	Promeniti backendUrl, host i port u fajlu definitions.py


### Uputstvo za pokretanje aplikacije.

#### Potrebno je imati instalirano sledece:

    Angular: 13.2.5  
    Node: 16.14.0  
    Package Manager: npm 8.3.1  
    .NET: 6.0  
    Python: 3.10  
    MySql: 8.0  
    Python biblioteke: request, pandas, numpy, sklearn, tensorflow, keras, json, venv, os, uvicorn, pydantic, fastapi, typing  


#### Frontend

Potrebno je otvoriti frontend iz terninala i pokrenuti sledece komande  

    npm install
    ng serve -o

#### Backend

Potrebno je otvoriti 'Bertus-Igrannonica.sln' koji se nalazi u folderu Backend i pokrenuti program. Nakon toga se otvaraju konzola i swagger tab u  browseru koji ne smeju da se zatvore zato sto pri zatvaranju jednog i ovaj drugi prestaje da radi.  

#### Python

Za pokretanje python projekta potrebno je pokrenuti sledecu komandu.  

    python -m uvicorn test:app

#### MySql
  
Potrebno je pristupiti localhost/phpmyadmin (koristeci XAMPP-a na primer). Nakon toga je potrebno kreirati bazu koja se zove 'bertusdb_test'.  
Nakon toga je potrebno importovati 'user_table.sql' fajl koji se nalazi u folderu 'Backend\SqlQueries'.   


### Pokretanje na serveru

Frontend  

	nohup python3 server.py &

Backend  

	export ASPNETCORE_URLS="http://147.91.204.115:10046"
	dotnet Bertus-Igrannonica.dll

FastApi  

	nohup python3 test.py &