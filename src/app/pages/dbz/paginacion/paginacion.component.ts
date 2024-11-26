import { DbzService } from './../services/dbz.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { Dbz } from '../interfaces/dbz';

@Component({
  selector: 'dbz-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {

  @Output() public eventNewDbz = new EventEmitter<Dbz>();


  constructor(
    private srvDbz: DbzService
  ){}

  get nextUrl():string|null{
    return this.srvDbz.nextUrl;
  }

  get previousUrl():string|null{
    return this.srvDbz.lastUrl;
  }

  loadPokemons(url:string) {
    this.srvDbz.getPersonajes(url).subscribe((dbzAll)=>{
      dbzAll.items.forEach((dbz)=>{
        this.srvDbz.getPersonaje(dbz.id).subscribe((dbzData)=>{
          dbz.data = dbzData;
          this.srvDbz.nextUrl = dbzAll.links.next;
          this.srvDbz.lastUrl = dbzAll.links.previous;
          this.eventNewDbz.emit(dbzAll);
        });
      });
    }
  );
  }
}
