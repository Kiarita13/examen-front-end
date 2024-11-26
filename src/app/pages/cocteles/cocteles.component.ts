import { Component, OnInit } from '@angular/core';
import { Cocteles } from './interfaces/cocteles';
import { CoctelService } from './services/cocteles.service';
import { CardComponent } from "./card/card.component";
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';


@Component({
  selector: 'app-cocteles',
  standalone: true,
  imports: [CardComponent, PaginacionComponent, SearchComponent],
  templateUrl: './cocteles.component.html',
  styleUrl: './cocteles.component.css',
})
export class CoctelesComponent implements OnInit {
  coctelAll: Cocteles | undefined;

  constructor(private _srvCocteles: CoctelService) { }

  ngOnInit(): void {
    this._srvCocteles.getPaginacionCoctel().subscribe(
      (cocteles) => {
        if (!cocteles) {
          console.log('no hay cocteles');
        } else {
          this.coctelAll = cocteles;
        }
      },
      (error) => {
        console.error('Error al obtener cocteles: ', error);
      }
    );
  }

  setNewCocteles(newCocteles: Cocteles): void {
    this.coctelAll = newCocteles
  }

  searchCoctel(termin: string) {
    if (termin) {
      let numero = Number(termin)
      if(!isNaN(numero)){
        this._srvCocteles.getCoctelId(numero).subscribe(coctel =>{
          this.coctelAll = coctel
        })
      }else{
        this._srvCocteles.getCoctelEncontrado(termin).subscribe(coctel => {
          this.coctelAll = coctel
        })
      }
      
    } else {
      this.ngOnInit()
    }
  }

}