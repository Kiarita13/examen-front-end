import { Component, Input, ViewChild } from '@angular/core';
import { Viaje, viajes } from '../interface/viajes';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ViajesService } from '../services/viajes.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-lista-viajes',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, EditComponent],
  templateUrl: './lista-viajes.component.html',
  styleUrl: './lista-viajes.component.css'
})
export class ListaViajesComponent {
  @Input() viaje:viajes | undefined

  @ViewChild(EditComponent) public modal!:EditComponent
  constructor(private _srvViajes:ViajesService){}
  
  openmodal(viaj:Viaje){
    if(this.modal){
      this.modal.open(viaj)
    }
  }

  eliminarEjemplo(id:String){
    this._srvViajes.deleteviajes(id).subscribe({
      next:(nest) => {
        console.log('eliminado elemento')
        window.location.reload();
      },

      error: (error) => {
        console.log(`error a la hora de eliminar elemento ${error}`)
      }
    })
  }
}
