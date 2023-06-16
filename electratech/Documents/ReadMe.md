**Pristupni link ka figmi** <br /> 
https://www.figma.com/file/gHRN2r2eXZ2qlO1V8IWVjq/Design?node-id=0%3A1&t=GJMlhrU0YGyPU3tA-1

### Uputstvo za pokretanje aplikacije.

#### Potrebno je imati instalirano sledece:

Angular: 15.2.1 <br>
Node: 18.14.2 <br>
Package Manager: 9.5.0 <br>
.NET: 7 <br>
Sqlite: 3 <br>
Python: 3.11.1 <br>
<br>
Python biblioteke: flask, requests

#### Frontend

Potrebno je otvoriti frontend iz terminala i pokrenuti sledece komande:

npm install <br>
ng serve -o

#### Backend

Potrebno je otvoriti 'backend.sln' koji se nalazi u folderu backend. Pre svega potrebno je u package manager-u ukucati komandu update-database. Zatim pokrenuti program i pri pokretanju programa pokrecu se konzola i swagger tab u browser-u koji ne smeju da se ugase jer se gasi i program.

#### Simulator

Za pokretanje python-a potrebno je otvoriti konzolu i u njoj ukucati sledecu komandu:

flask --app .\simulator.py run <br>

Klikom na dugme generate 50 users se generisu prosumer-i zatim generate 100 devices for users nakon toga generate records i na kraju start simulation.
