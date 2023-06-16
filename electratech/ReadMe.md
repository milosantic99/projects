**Pristupni link ka figmi** <br /> 
https://www.figma.com/file/gHRN2r2eXZ2qlO1V8IWVjq/Design?node-id=0%3A1&t=GJMlhrU0YGyPU3tA-1

**Pristupni link ka aplikaciji** <br />
http://softeng.pmf.kg.ac.rs:10025/login

**DSO**
email: electra@gmail.com
pass: Electra123

**DISPEČER**
email: dispecer@gmail.com
pass: Dispecer123

**PROSUMER**
email: prosumer1@gmail.com
pass: Prosumer123

**Priprema za deploy:**

**_SERVER:_**

**ssh electratech@softeng.pmf.kg.ac.rs** prijava na server.
potrebno je uneti sifru nakon unosa ove komande (nakon toga ukoliko neko zeli da promeni sifru to se radi komandom **passwd**)

Nakon toga kreirati dva fodlera jedan za frontend i drugi za backend i to komandom **mkdir frontend** i **mkdir backend**.
U folderu frontend kreirati dist folder u koji se smestaju fajlovi iz izbildovanog frontend-a. Komanda za kreiranje foldera je **mkdir dist**.

**_FRONT:_**

U konzoli ukucati ng build kako bi spremili angular aplikaciju za kacenje na server.
U slucaju da dodje do greske pri budzetu povecati maximum budget za build u angular.json fajlu.

**_BACK:_**

Pre bildovanja aplikacije odabrati release u drop meniju.
Zatim kliknuti na build u select meniju i odabrati publish.
Otvara se prozor u kome birate kako cete cuvati izbildovanu aplikaciju. Tu izabrati folder.
Pre samog publisovanja podesiti opcije (show all settings):
**Deployment mode: Self-contained (u slucaju da na serveru nema odgovarajuci .net)**
**Target Runtime: Linux-x64**
**Databases: stiklirati "Use this connection string"**
Nakon odabira ovih opcija kliknuti na save. Pa zatim na publish.

**Deploy na server:**

**_FRONT:_**

Otovriti konzolu(cmd) u folder gde se nalazi izbildovani frontend. Folder se zove dist zatim uci u frontend i tu pokrenuti konzolu(cmd).
Zatim pokrenuti komandu **scp -r * electratech@softeng.pmf.kg.ac.rs:/home/electratech/frontend/dist** koja kopira podatke iz trenutnog foldera na server. (* - kopira sve fajlove, -r - ide korz rekurzivno kroz ostale foldere i kopira podatke iz njih na server)

**_BACK:_**

Otovriti konzolu(cmd) u folder gde se nalazi izbildovani backend. Folder se zove bin unutar backend folder-a zatim uci u Release pa u .net7.0 i na kraju u Publish i tu pokrenuti konzolu(cmd).
Zatim pokrenuti komandu **scp -r * electratech@softeng.pmf.kg.ac.rs:/home/electratech/backend** koja kopira podatke iz trenutnog foldera na server. (* - kopira sve fajlove, -r - ide korz rekurzivno kroz ostale foldere i kopira podatke iz njih na server)

**_BAZA:_**

Otovriti konzolu(cmd) u folder gde se nalazi backend i tu pokrenuti konzolu(cmd).
Zatim pokrenuti komandu **scp -r ./WattAppDB.db electratech@softeng.pmf.kg.ac.rs:/home/electratech/backend** koja kopira podatke iz trenutnog foldera na server. (./WattAppDB - ime fajla koji zelimo da okacimo na server)

**Pokretanje aplikacije na serveru:**

**_FRONT:_**

cd frontend/ komanda koja nam otvara folder u koji smo smestili frontend aplikacije

Pokrenuti komandu **npm install express** koja instalira sve potrebne dodatke za Angular.
Pokrenuti komandu **nohup node index.js &** ova komanda pokrece front aplikacije i omogucava nam dalje koriscenje terminala. (nohup - ne gasi aplikaciju kad izadjem, & - nam zapravo omogucava dalje koriscenje terminala)
cat nohup.out - u konzoli ispisuje da li je doslo do greske ili nije

**_BACK:_**

Ovu komandu pokrecemo samo ako je prvi put kacen backend.exe fajl na server **chmod +x backend**
Pokrenuti komandu **nohup ./backend &** koja zapravo pokrece backend aplikacije i ogomucava nam dalje koriscenje terminala. (nohup - ne gasi aplikaciju kad izadjem, & - nam zapravo omogucava dalje koriscenje terminala))
