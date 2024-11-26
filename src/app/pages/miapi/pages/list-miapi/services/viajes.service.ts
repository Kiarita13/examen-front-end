import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Viaje, viajes } from '../interface/viajes';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  urlViajes = 'http://localhost:3000/api/viajes'
  constructor(private http:HttpClient) { }

  getAllviajes():Observable<viajes>{
    return this.http.get<viajes>(`${this.urlViajes}`)
  }

  putViaje(id:String, elemnto:Viaje):Observable<Viaje>{
    return this.http.put<Viaje>(`${this.urlViajes}/${id}`, elemnto)
  }

  postViaje(elemnto:Viaje):Observable<Viaje>{
    return this.http.post<Viaje>(`${this.urlViajes}`, elemnto)
  }


  deleteviajes(id:String){
    return this.http.delete(`${this.urlViajes}/${id}`)
  }
}
