import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Viaje } from '../../interface/viajes';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ViajesService } from '../../services/viajes.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Input() viaje:Viaje = {
    destino: '',
    paisSalida: '',
    descripcion: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    precio: 0,
    tipo: ''
  }

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

  open(ejemplo: Viaje) {
    this.viaje = ejemplo;
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
    tipo: string, 
    id: string
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
  
    console.log(this.viaje._id); 
    this._srvViaje.putViaje(id, newViaje).subscribe({
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
