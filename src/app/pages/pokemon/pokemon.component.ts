
import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { Pokemons} from './interfaces/pokemons';
import { PokemonService } from './services/pokemon.service';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CardComponent, PaginacionComponent, SearchComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})

export class PokemonComponent implements OnInit{
  pokemons: Pokemons|undefined;


  constructor(
    private srvPokemon: PokemonService
  ){ }

  
  ngOnInit(): void {
    this.srvPokemon.getPokemon().subscribe((pokemonsAll)=>{
      pokemonsAll.results.forEach((pokemon)=>{
        this.srvPokemon.getpokemon(pokemon.name).subscribe((pokemonData)=>{
          pokemon.data = pokemonData;
          this.srvPokemon.nextUrl = pokemonsAll.next;
          this.srvPokemon.previousUrl = pokemonsAll.previous;
        });
      });
      this.pokemons = pokemonsAll;
      console.log(this.pokemons);
    }
  );
  }

  setNewPokemon(pokemonsNews: Pokemons):void{
    this.pokemons = pokemonsNews;
  }

  searchPokemon(termino: string):void{
    if(termino){
      this.srvPokemon.getpokemon(termino).subscribe((pokemon)=>{
        this.pokemons ={
          count: 1,
          next: '',
          previous: null,
          results:[
            {
              name: pokemon.name,
              url:'',
              data: pokemon
          }
        ]
        };
        this.srvPokemon.nextUrl = null;
        this.srvPokemon.previousUrl = null;
      });
    }else{
      this.ngOnInit();
    }

  }

}
