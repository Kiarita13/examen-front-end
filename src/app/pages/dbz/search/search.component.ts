import {Component, Output, EventEmitter} from "@angular/core";


@Component({
  selector: 'dbz-search',
  standalone: true,
  imports: [],
  template: `
    <div class="col-12">
      <div class="input-group mb-3">
        <input
        #txtSearch
          type="text"
          class="form-control"
          placeholder="Escribe el nombre del personaje"
          aria-label="Escribe el nombre del personaje"
          (keydown.enter)="searchDbz(txtSearch.value)"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-outline-secondary"
          type="button"
          (click)="searchDbz(txtSearch.value)"
          id="button-addon2"
        >
        <i class="bi bi-search"></i>
        </button>
      </div>
    </div>
  `,
  styleUrl: './styles.css',
})
export class SearchComponent {

    @Output() public eventSearch = new EventEmitter<string>();
    searchDbz(termino: string|number):void {
         const termSearch=termino.toString().trim();
//        if(termSearch.length === 0){
//            return;
        //}

        this.eventSearch.emit(termSearch);
    }
}