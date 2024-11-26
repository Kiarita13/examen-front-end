import { ModalComponent } from './../../cocteles/modal/modal.component';
import { Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Cocteles } from '../interfaces/cocteles';

@Component({
  selector: 'cocteles-card',
  standalone: true,
  imports: [NgFor, NgIf, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges {
  @Input() public cocteles:Cocteles| undefined
  loadingImg:boolean = false
  @ViewChild(ModalComponent) public modal!:ModalComponent

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['cocteles']){
        this.loadingImg = false
      }
  }

  openModal(cocteles: Partial<Cocteles['drinks'][number]>){
    if(this.modal){
      this.modal.open(cocteles)
    }
  }
}