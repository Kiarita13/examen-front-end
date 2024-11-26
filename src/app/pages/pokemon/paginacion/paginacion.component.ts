import { Pokemon, Pokemons } from './../interfaces/pokemons';
import { Component, Output, EventEmitter } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'pokemon-paginacion',
  standalone: true,
  imports: [NgClass],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {

  @Output() public eventNewPokemons = new EventEmitter<Pokemons>();


  constructor(
    private srvPokemon: PokemonService
  ){}

  get nextUrl():string|null{
    return this.srvPokemon.nextUrl;
  }

  get previousUrl():string|null{
    return this.srvPokemon.previousUrl;
  }

  loadPokemons(url:string) {
    this.srvPokemon.getPokemon(url).subscribe((pokemonsAll)=>{
      pokemonsAll.results.forEach((pokemon)=>{
        this.srvPokemon.getpokemon(pokemon.name).subscribe((pokemonData)=>{
          pokemon.data = pokemonData;
          this.srvPokemon.nextUrl = pokemonsAll.next;
          this.srvPokemon.previousUrl = pokemonsAll.previous;
          this.eventNewPokemons.emit(pokemonsAll);
        });
      });
    }
  );
  }
}
