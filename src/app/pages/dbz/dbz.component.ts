import { Component, OnInit } from '@angular/core';
import { DbzService } from './services/dbz.service';
import {Dbz} from './interfaces/dbz';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { CardComponent } from "./card/card.component";
import { SearchComponent } from './search/search.component';
@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [PaginacionComponent, CardComponent, SearchComponent],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css'
})
export class DbzComponent implements OnInit {
  dbzPersonajes: Dbz | undefined
  constructor(
    private _svrDrgonbal: DbzService
  ) { }

  ngOnInit(): void {
    this._svrDrgonbal.getPersonajes().subscribe(perDbz => {
      perDbz.items.forEach(personaje => {
        this._svrDrgonbal.getPersonaje(Number(personaje.id)).subscribe(perE => {
          personaje.data = perE
          this._svrDrgonbal.nextUrl = perDbz.links.next
          this._svrDrgonbal.lastUrl = perDbz.links.previous
        })
      })
      this.dbzPersonajes = perDbz
    })
  }

  setNewPersonaje(newPersonaje: Dbz): void {
    this.dbzPersonajes = newPersonaje
    
  }

  searchPersonaje(termino: string): void {
    if (termino) {
      let numero = Number(termino);
      if (!isNaN(numero)) {
        this._svrDrgonbal.getPersonaje(numero).subscribe(personaje => {
          this.dbzPersonajes = {
            items: [{
              id: personaje.id,
              name: personaje.name,
              ki: personaje.ki,
              maxKi: personaje.maxKi,
              race: personaje.race,
              gender: null,  // Asignar gender si está disponible
              description: personaje.description,
              image: personaje.image,
              affiliation: null,  // Asignar affiliation si está disponible
              deletedAt: null,
              data: personaje
            }],
            meta: {
              totalItems: 1,
              itemCount: 1,
              itemsPerPage: 10,
              totalPages: 1,
              currentPage: 1
            },
            links: {
              first: 'url_to_first_page',
              previous: '',
              next: '',
              last: 'url_to_last_page'
            }
          };
          this._svrDrgonbal.lastUrl = null;
          this._svrDrgonbal.nextUrl = null;
        });
      } else {
        // Si el término no es un número, buscar por nombre
        let url = 'https://dragonball-api.com/api/characters/';
        let personajeEncontrado = false;
        const buscarPorNombre = () => {
          this._svrDrgonbal.getPersonajes(url).subscribe(personajesAll => {
            personajesAll.items.forEach(rePersonaje => {
              if (rePersonaje.name.toLowerCase() == termino.toLowerCase()) {
                personajeEncontrado = true;
                this._svrDrgonbal.getPersonaje(Number(rePersonaje.id)).subscribe(personaje => {
                  this.dbzPersonajes = {
                    items: [{
                      id: personaje.id,
                      name: personaje.name,
                      ki: personaje.ki,
                      maxKi: personaje.maxKi,
                      race: personaje.race,
                      gender:  null,
                      description: personaje.description,
                      image: personaje.image,
                      affiliation: null,
                      deletedAt: null,
                      data: personaje
                    }],
                    meta: {
                      totalItems: 1,
                      itemCount: 1,
                      itemsPerPage: 10,
                      totalPages: 1,
                      currentPage: 1
                    },
                    links: {
                      first: 'url_to_first_page',
                      previous: '',
                      next: '',
                      last: 'url_to_last_page'
                    }
                  };
                  this._svrDrgonbal.lastUrl = null;
                  this._svrDrgonbal.nextUrl = null;
                });
              }
            });

            // Si no se ha encontrado el personaje, continuar con la siguiente página
            if (!personajeEncontrado && personajesAll.links.next) {
              url = personajesAll.links.next;
              buscarPorNombre();  // Llamar de nuevo la función para buscar en la siguiente página
            }
          });
        };

        buscarPorNombre();  // Iniciar la búsqueda
      }
    } else {
      // Si no se proporciona un término, volver al estado inicial
      this.ngOnInit();
    }
  }
}