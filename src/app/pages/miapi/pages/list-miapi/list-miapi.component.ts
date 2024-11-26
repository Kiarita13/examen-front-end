import { Component, OnInit, ViewChild } from '@angular/core';
import { ViajesService } from './services/viajes.service';
import { viajes } from './interface/viajes';
import { ListaViajesComponent } from './lista-viajes/lista-viajes.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'miapi-list-miapi',
  standalone: true,
  imports: [ListaViajesComponent, ModalComponent],
  templateUrl: './list-miapi.component.html',
  styleUrl: './list-miapi.component.css'
})
export class ListMiapiComponent implements OnInit{
  viajes:viajes | undefined
  constructor(private _srvViajes:ViajesService){}

  @ViewChild(ModalComponent) private modal!:ModalComponent
  ngOnInit(): void {
    this._srvViajes.getAllviajes().subscribe(viaje => {
      this.viajes = viaje
    })
  }

  openModal(){
    if(this.modal){
      this.modal.open();
    }
  }
}
