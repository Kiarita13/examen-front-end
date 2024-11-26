import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Viaje } from '../interface/viajes';
import { ViajesService } from '../services/viajes.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  private bootstrapmodal:any
  @ViewChild('modalElement') public modal!:ElementRef
  constructor(@Inject(PLATFORM_ID) private plataformId: object,
  private _srvViaje:ViajesService){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapmodal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open() {
    
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapmodal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }


  editarViaje(
    destino: string, 
    paisSalida: string, 
    descripcion: string, 
    fechaInicio: string, 
    fechaFin: string, 
    precio: string, 
    tipo: string
  ) {
    const newViaje: Viaje = {
      destino: String(destino),
      paisSalida: String(paisSalida),
      descripcion: String(descripcion),
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
      precio: Number(precio),
      tipo: String(tipo)
    };
  
    this._srvViaje.postViaje(newViaje).subscribe({
      next: (response) => {
        console.log('Viaje editado con éxito');
        this.closeModal();
        window.location.reload(); 
      },
      error: (error) => {
        console.log(`Error al intentar actualizar el viaje: ${error.message}`);
        console.log('Respuesta del servidor:', error);
      }
    });
  }
}
