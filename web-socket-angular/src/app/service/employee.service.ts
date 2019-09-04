import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //Kapcsolódunk a web-socket json szerverhez:
  socketEndpoint: string = "ws://localhost:8080";
  connection: WebSocket;
  isConnected$: BehaviorSubject<boolean> = new BehaviorSubject(false); // A Subject az egy observable
  isData$: BehaviorSubject<any> = new BehaviorSubject([]); // Arról fogja értesíteni a komponenseket, hogy változtak az employee adatok
  // A Subject-nél nem jelent meg az employee lista az Employees oldalo
  // A BehaviorSubject-tel kiküszöböltük ezt a jelenséget

  constructor() {
    // Amikor meghívjuk ezt a service-t, az első dolga az lesz, hogy létrehozza a web-socket kapcsolatot a konstruktorában
    // megadottak miatt:
    this.connection = new WebSocket(this.socketEndpoint);
    //Figyelni fogjuk a bejövő üzeneteket az onmessage metódussal. Csak rámutatunk az onMessage metódusra, hogy 
    // ha üzenet érkezik, akkor majd azt indítsa el, most nem hívtuk még meg a ()-ekkel.

    // Azt figyeljük, hogy mikor jön létre a kapcsolat. Amikor létrejön, akkor meghívjuk a this.onOpen() metódust:
    this.connection.onopen = () => this.onOpen();
    this.connection.onmessage = ev => this.onMessage(ev);
  }

  onOpen(): void {
    this.isConnected$.next(true);
    // Ezzel az observable-lel és a next-tel mindenkit értesítünk arról, hogy a kapcsolódás megtörtént (addig nem tudnak semmit csinálni).
    // Csak ezután szabad meghívni a read-et, a kapcsolódás előtt nem, mert hiba lesz.
  }

  // Üzenet érkezik  aszervertől:
  onMessage(ev: MessageEvent) {
    console.log('A teljes message: ', ev);
    // A message-ből csak a data kulcs érdekel minket:
    console.log('A message-ből csak a data: ', ev.data);
    // A message azt fogja jelenteni, hogy változott a json adatbázis. Parsoljuk a json stringet.
    let message = JSON.parse(ev.data);
    // Értesítjük az isData$-ra feliratkozottakat:
    this.isData$.next(message.data);
  }

  read(path: string) {
    this.connection.send(JSON.stringify({ type: 'read', path: 'employee' }));
  }

  // Új employee létrehozása:
  // A kapott input adatokat a kliens elküldi a szervernek json stringként, kiegészítő információkkal
  // (Józsi definiálta a programjában a type-ot és a path-t, amivel megadjuk a metódust, és hogy melyik tömböt érinti a kérés)
  create(data: any): void {
    this.connection.send(JSON.stringify({ type: 'create', path: 'employee', data: data }));
  }
}
