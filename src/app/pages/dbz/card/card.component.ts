import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { Dbz, personajeDbz } from '../interfaces/dbz';


@Component({
  selector: 'dbz-card',
  standalone: true,
  imports: [NgIf, NgFor, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges{
  @Input() public dbzAll: Dbz|undefined;
  @ViewChild(ModalComponent) public modal!:ModalComponent;


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['dbzAll']){
       console.log('dbzAll', this.dbzAll);
    }
  }

  openModal(dbz: personajeDbz):void{
    if(this.modal){
      this.modal.open(dbz);
    }
  }
}
