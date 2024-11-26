
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dbz, personajeDbz } from '../interfaces/dbz';


@Injectable({
  providedIn: 'root'
})
export class DbzService {
  private dbzUrlApi: string = 'https://dragonball-api.com/api/characters'
  private next:string|null = null
  private last:string|null = null
  constructor(
    private http:HttpClient
  ) { }

  getPersonajes(url:string = this.dbzUrlApi):Observable<Dbz>{
    return this.http.get<Dbz>(url)
  }

  getPersonaje(id:number):Observable<personajeDbz>{
    return this.http.get<personajeDbz>(`${this.dbzUrlApi}/${id}`)
  }

  set nextUrl(url:string|null){
    this.next = url
  }

  set lastUrl(url:string|null){
    this.last = url
  }

  get nextUrl():string|null{
    return this.next
  }

  get lastUrl():string|null{
    return this.last
  }
  
}