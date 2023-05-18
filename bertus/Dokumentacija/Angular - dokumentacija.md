# Angular docs

Angular je popularna web development platforma koju je razvio Google. Njegova namena je efektno i sofisticirano kreiranje
jednostranicnih aplikacija.  

---

## Instalacija Angular-a
Pre same instalacije Angular-a, najpre je potrebno instalirati Node.Js koji znacajno olaksava koriscenje samog Angular-a, i to sa [nodejs.org](https://nodejs.org/en/).

Da bismo zapoceli instalaciju Angular framework-a, najpre je potrebno otvoriti command prompt, zatim ukucati:  

    npm install -g @angular/cli  
Nakon uspesne instalacije, mozemo kreirati nasu prvu Angular aplikaciju, unosenjem sledece komande:  

    ng new ime-aplikacije  

Gde je "ime-aplikacije" ime foldera u kojem ce aplikacija biti smestena. Nakon ove komande, Angular aplikacija ce biti kreirana u TypeScript-u, kao i neophodne komponente.  
Nakon kompletiranja instalacije, dobra je praksa proveriti da li aplikacija radi, sto mozemo uraditi na sledeci nacin:  

    cd ime-aplikacije
    ng serve
Nakon uspesog pokretanja aplikacije, potrebno je u pretrazivacu ukucati sledecu adresu:  

    http://localhost:4200
Nakon cega ce se prikazati podrazumevani Angular pocetna strana.  

---

## Angular aplikacije: Neophodni elementi
Ovaj odeljak objasnjava kljucne ideje Angular framework-a, koji su neophodni za efikasno dizajniranje i pravljenje aplikacija  
Otvaranje Angular koda u Visual Codu moze se lako izvristi unosenjem komande 
    code .
*podrazumevano je da u samom command prompt-u izvrsimo navigaciju gde se nalazi sama aplikacija

### Komponente

Komponente su osnovni delovi od kojeg se pravi aplikacija  
Komponenta sadrzi:

    TypseScript klasu sa @component() dekoratorm
    vec unapred otkucan HTML sablon

U nastavku mozete videti primer jednostavne Angular komponente:  

    import { Component } from '@angular/core';
    @Component({
      selector: 'hello-world',
      template: `
        <h2>Hello World</h2>
        <p>This is my first component!</p>
      `
    })
    export class HelloWorldComponent {
      // Kod unutar ove klase upravlja ponasanjem komponente.
    }

Ako zelimo da pristupimo ovoj komponenti da bi kasnije mogli da je koristimo, to radimo na sledeci nacin:  

    <hello-world></hello-world> 

Nakon renderovanja ta komponenta izgleda ovako:  

    <hello-world>
            <h2>Hello World</h2>
            <p>This is my first component!</p>
    </hello-world>

Komponente Angulara same po sebi nude jaku enkapsulaciju i intuitivan nacin koriscenja strukture aplikacije.  
Komponente su takodje sklone jedinicnom testiranju sto moze dosta popraviti citkost koda.  

### Templejtovi

Svaka komponenta sadrzi HTML sablon koji odredjuje kako ce se ta komponenta renderovati.  
Ovakvi sabloni se definisu u jednoj liniji ili putem do fajla.  
Angular dopunjuje HTML dodatnom sintaksom koja nam omogucava unosenje vrednosti iz nase komponente dinamickim putem.  
Angular automatski azurira renderovani DOM (Document object model) kada se stanje komponente promeni.  
Jedna od upotreba ovog svojstva je dinamicki unos teksta:  

    <p>{{ message }}</p>

Vrednost "message" promenljive proizilazi iz klase komponente:  

    import { Component } from '@angular/core';

    @Component ({
    selector: 'hello-world-interpolation',
    templateUrl: './hello-world-interpolation.component.html'
    })
    export class HelloWorldInterpolationComponent {
        message = 'Hello, World!';
    }

Kada aplikacija ucita komponentu i templejt, korisnik vidi sledece:

    <p>Hello, World!</p>

Angular takodje podrzava vezivanje svojstava, radi lakseg postavljanja vrednosti i atributa HTML elmenata.  

    <p
    [id]="sayHelloId"
    [style.color]="fontColor">
    You can set my color in the component!
    </p>

Angular pruza mogucnost deklarisanja event listener-a koji reaguju na korisnicku interakciju sa aplikacijom, kao sto su klik misa,  
pritisnuto dugme, pokretanje misa i druge.  

    <button
    type="button"
    [disabled]="canClick"
    (click)="sayMessage()">
    Trigger alert message
    </button>

Sledeci primer pokazuje poziv metode, definisanoj u komponenti klase:  

    sayMessage() {
    alert(this.message);
    }

Kao dodatnu funkcionalnost templejta mozemo koristiti [direktive](https://angular.io/guide/built-in-directives).  
Najpopularnije direktive u Angular-u su `*ngIf` i `*ngFor`.  
Sledeci primer pokazuje koriscenje `*ngIf` direktive:  
TypeScript: 

    import { Component } from '@angular/core';

    @Component({
    selector: 'hello-world-ngif',
    templateUrl: './hello-world-ngif.component.html'
    })
    export class HelloWorldNgIfComponent {
    message = "I'm read only!";
    canEdit = false;

    onEditClick() {
        this.canEdit = !this.canEdit;
        if (this.canEdit) {
        this.message = 'You can edit me!';
        } else {
        this.message = "I'm read only!";
        }
    }
    }

HTML:  

    <h2>Hello World: ngIf!</h2>

    <button type="button" (click)="onEditClick()">Make text editable!</button>

    <div *ngIf="canEdit; else noEdit">
        <p>You can edit the following paragraph.</p>
    </div>

    <ng-template #noEdit>
        <p>The following paragraph is read only. Try clicking the button!</p>
    </ng-template>

    <p [contentEditable]="canEdit">{{ message }}</p>
