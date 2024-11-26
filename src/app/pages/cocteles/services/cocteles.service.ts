import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cocteles } from '../interfaces/cocteles';

@Injectable({
  providedIn: 'root'
})
export class CoctelService {
  coctel:string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='
  coctelSearch:string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
  coctelId:string = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
  constructor(
    private http:HttpClient
  ) { }

  getCocteles():Observable<Cocteles>{
    return this.http.get<Cocteles>(`${this.coctel}a`)
  }

  getPaginacionCoctel(letra:string = 'a'):Observable<Cocteles>{
    return this.http.get<Cocteles>(`${this.coctel}${letra}`)
  }

  getCoctelEncontrado(cocTermino:string):Observable<Cocteles>{
    return this.http.get<Cocteles>(`${this.coctelSearch}${cocTermino}`)
  }

  getCoctelId(cocId:number):Observable<Cocteles>{
    return this.http.get<Cocteles>(`${this.coctelId}${cocId}`)
  }

}