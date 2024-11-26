import { CoctelService } from './../services/cocteles.service';
import { Cocteles } from './../interfaces/cocteles';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cocteles-paginacion',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
  @Output() public eventNewCocteles = new EventEmitter<Cocteles>();
  abecedario = ['a',  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  constructor(
    private srvCocteles:CoctelService
  ){}

  letraClickeada:string = ''

  cogerLetra(letra:string){
    this.letraClickeada = letra
    console.log(letra)
  }

  siguientePagina(letraSiguiente:string){
    this.srvCocteles.getPaginacionCoctel(letraSiguiente).subscribe(coctel =>{
      this.eventNewCocteles.emit(coctel)
    })
  }

}