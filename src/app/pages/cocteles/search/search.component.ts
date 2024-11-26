import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cocteles-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './stiles.css'
})
export class SearchComponent {
  @Output() eventEmitTermino = new EventEmitter<string>();

  getTermin(termino:string){
    this.eventEmitTermino.emit(termino)
  }
}